from flask_restful import Resource

from backend.database import db

class Version(Resource):
    def get(self):
        versions = VersionModel.query.all()
        ver = versions[-1].version
        return {
            "version": "0.0.1", 
            "numOfVersions": len(versions)
        }

class VersionModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    version = db.Column(db.String(10))
    

