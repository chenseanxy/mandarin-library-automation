from flask import Flask
from flask_restful import Api

from backend.resources.version import Version

app = Flask(__name__)
api = Api(app)

api.add_resource(Version, '/version')
