from flask import Flask, Blueprint
from flask_restful import Api

from backend.resources.version import Version

app = Flask(__name__)
blueprint = Blueprint('api', __name__, url_prefix='/api')
api = Api(blueprint)

api.add_resource(Version, '/version')

app.register_blueprint(blueprint)