from backend.database import db

class VersionModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    version = db.Column(db.String(10))