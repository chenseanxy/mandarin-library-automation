from flask_restful import Resource, reqparse, abort

from backend.database import db
from backend.models.session import Session
from backend.models.user import User
from backend.resources.utils import error

def authenticated(f):
    def wrapper(*args, **kwargs):
        parser = reqparse.RequestParser()
        parser.add_argument('session-id', location='cookies')

        try: 
            req = kwargs["testing_request"]
        except KeyError:
            req = None

        parsed_args = parser.parse_args(req)

        sess_id = parsed_args["session-id"]
        
        if sess_id == None:
            return error("Not authorized", 401)

        try:
            sess = Session.get_by_id(sess_id)
        except ValueError:
            return error("Not authorized", 401)
        except Exception as e:
            return error(str(e), 400)
        
        kwargs["session"] = sess

        return f(*args, **kwargs)
        
    return wrapper

class LoginAPI(Resource):

    @authenticated
    def get(self, **kwargs):
        return kwargs["session"].json(), 200

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("username", required=True, location='headers', help="Username is required") 
        parser.add_argument("password", required=True, location='headers', help="Password is required")
        args = parser.parse_args()
        
        username = args["username"]
        password = args["password"]

        try:
            user = User.get_by_username(username)
            if not user.check_password(password):
                raise ValueError
        except ValueError:
            return error("Username and/or password is incorrect.", 401)
        
        sess = Session.new_session(username)
        db.session.add(sess)
        db.session.commit()

        header = {"Set-Cookie": f"session-id={sess.id}"}
        
        return sess.json(), 200, header

    @authenticated
    def delete(self, **kwargs):
        sess = kwargs["session"]
        db.session.delete(sess)
        db.session.commit()
        return {}, 204
