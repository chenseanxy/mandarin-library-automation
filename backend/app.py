from flask import Flask, Blueprint
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

from backend.database import db
from backend.models.generators.create_db import create_db

from backend.config import db_uri, stage, create_db_on_startup

from backend.resources.version import Version
from backend.resources.user import UserRootAPI, UserAPI

app = Flask(__name__)

# DB
app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)

# API
blueprint = Blueprint('api', __name__, url_prefix='/api')
api = Api(blueprint)

# Add api paths here
api.add_resource(Version, '/version')
api.add_resource(UserRootAPI, '/user')
api.add_resource(UserAPI, '/user/<string:id>')

app.register_blueprint(blueprint)


if __name__ == "__main__":

    if create_db_on_startup == "TRUE":
        create_db(app, db)

    if stage == "dev":
        app.run(host="0.0.0.0", debug=True, use_reloader=True)
    
    app.run(host="0.0.0.0")
