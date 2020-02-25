from flask import Flask, Blueprint
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

from backend.database import db, uri
from backend.resources.generators.create_db import create_db

from backend.resources.version import Version

app = Flask(__name__)

# DB
app.config["SQLALCHEMY_DATABASE_URI"] = uri()
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)

# API
blueprint = Blueprint('api', __name__, url_prefix='/api')
api = Api(blueprint)

# Add api paths here
api.add_resource(Version, '/version')

app.register_blueprint(blueprint)


if __name__ == "__main__":

    create_db(app, db)

    app.run(host="0.0.0.0")
