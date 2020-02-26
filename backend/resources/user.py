from flask_restful import Resource, reqparse
from sqlalchemy_utils import UUIDType
import os
import hashlib
from uuid import uuid4, UUID

from backend.database import db
from backend.resources.utils import error

roles = ("admin", "librarian", "reader")


class UserRootAPI(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("username")
    parser.add_argument("password")
    parser.add_argument("role")

    def get(self):
        users = User.query.all()
        resp = [user.json() for user in users]
        return resp

    def post(self):
        args = self.parser.parse_args()

        username = args["username"]
        password = args["password"]
        role = args["role"]

        if role == None:
            role = "reader"

        if username == None or password == None:
            return error("Request must contain username and password.", 400)
        
        if not User.username_available(username):
            return error(f"Username '{username}' has been taken.", 400)

        try:
            user = User.new_user(username, password, role)
            db.session.add(user)
            db.session.commit()
            return user.json(), 201

        except Exception as e:
            return error(str(e), 400)
        
class UserAPI(Resource):
    def get(self, id):
        try:
            user = User.get_by_id(id)
        except AttributeError as e:
            return error(e, 400)
        except ValueError as e:
            return error(e, 404)

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(UUIDType(), primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    hash = db.Column(db.BINARY(256), nullable=False)
    salt = db.Column(db.BINARY(256), nullable=False)
    role = db.Column(db.String(10), nullable=False)

    @staticmethod
    def new_user(username, password, role):
        if not role in roles:
            raise ValueError(f"Invalid role '{role}'")

        hash, salt = User.create_hash(password)
        return User(
            id = uuid4(),
            username = username, 
            hash = hash, 
            salt = salt,
            role = role
        )

    @staticmethod
    def create_hash(password, salt=None):
        if salt == None:
            salt = os.urandom(32)

        hash = hashlib.pbkdf2_hmac(
            'sha256', 
            password.encode('utf-8'), 
            salt, 
            100000
        )
        return hash, salt
    
    @staticmethod
    def username_available(username):
        result = User.query.filter_by(username = username).all()
        return len(result) == 0

    def check_password(self, password):
        input_hash, salt = User.create_hash(password, self.salt)
        return self.hash == input_hash
        
    def json(self):
        return {
            "id": str(self.id),
            "username": self.username,
            "role": self.role
        }
    
    @staticmethod
    def get_by_id(id):
        if type(id) != UUID:
            try:
                id = UUID(id)
            except:
                raise AttributeError("Invalid UUID")

        query = User.query.filter_by(id=id)

        if query.count() == 0:
            raise ValueError(f"User {str(id)} not found.")

        return query.first()