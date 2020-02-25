from flask_sqlalchemy import SQLAlchemy

import os

db = SQLAlchemy()

def uri() -> str:
    database_uri = os.environ.get("FLASK_DB_URI")

    if database_uri == None:
        # Using in-memory database for dev environment
        database_uri = 'sqlite:///'
    
    return database_uri

