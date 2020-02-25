from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from backend.resources.generators.version import VersionGenerator

def create_db(app: Flask, db: SQLAlchemy):

    app.app_context().push()
    db.create_all()

    generators = [
        # Put your generators here, 
        # and please leave a "," behind
        VersionGenerator,
    ]

    max_initial_table_length = 20000

    for gen in generators:
        for idx, row in enumerate(gen):
            if(idx > max_initial_table_length):
                break
            db.session.add(row)

    db.session.commit()
