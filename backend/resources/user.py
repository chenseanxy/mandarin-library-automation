from flask_restful import Resource, reqparse

from backend.database import db
from backend.resources.utils import error
from backend.models.user import User

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
        
        return user.json()

