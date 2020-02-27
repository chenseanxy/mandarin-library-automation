from uuid import uuid4, UUID
from sqlalchemy_utils import UUIDType
import os
from base64 import b64encode, b64decode

from backend.database import db
from backend.models.user import User

from datetime import datetime, timedelta

class Session(db.Model):
    __tablename__ = 'session'

    id = db.Column(UUIDType(), primary_key=True)
    uid = db.Column(UUIDType(),db.ForeignKey('user.id'),nullable=False)
    user = db.relationship('User', backref=db.backref('sessions', lazy=True))
    expire = db.Column(db.DateTime(), nullable=False)
    key = db.Column(db.BINARY(256), nullable=False)

    @staticmethod
    def new_session(username, expire=None):
        if expire == None:
            expire = datetime.now() + timedelta(hours=3)
        if type(expire) in (int, float):
            expire = datetime.fromtimestamp(expire)

        user = User.get_by_username(username)
        return Session(
            id=uuid4(),
            user=user,
            expire=expire,
            key=os.urandom(32)
        )
    
    @staticmethod
    def get_by_id(id):
        if type(id) != UUID:
            try:
                id = UUID(id)
            except:
                raise AttributeError("Invalid UUID")

        query = Session.query.filter_by(id=id)

        if query.count() == 0:
            raise ValueError(f"Session {str(id)} not found.")

        session = query.first()

        if session.expired():
            db.session.delete(session)
            db.session.commit()
            raise ValueError(f"Session {str(id)} not found.")
        
        return session

    @staticmethod
    def authenciate_session(id, key):
        if type(key) != bytes:
            try:
                key = b64decode(key)
            except:
                raise AttributeError("Session key format error.")
        
        try:
            sess = Session.get_by_id(id)
        except ValueError:
            return False
        
        return sess.key == key

    def json(self):
        return {
            "id": str(self.id),
            "user": self.user.json(),
            "expire": int(self.expire.timestamp()),
            "key": b64encode(self.key).decode('utf-8')
        }
    
    def expired(self):
        return self.expire < datetime.now()
