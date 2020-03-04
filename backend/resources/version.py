from flask_restful import Resource

from backend.models.version import VersionModel

class Version(Resource):
    def get(self):
        versions = VersionModel.query.all()
        ver = versions[-1].version
        return {
            "version": "0.0.1", 
            "numOfVersions": len(versions)
        }


    

