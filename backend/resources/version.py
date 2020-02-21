from flask_restful import Resource

class Version(Resource):
    def get(self):
        return {"version": "0.0.1"}

