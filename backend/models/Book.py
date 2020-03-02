#-*-coding:utf-8-*-
import os
import hashlib
from uuid import uuid4, UUID
from sqlalchemy_utils import UUIDType

from backend.database import db

'''图书类'''
class Book(db.Model) :
    __tablename__ = 'Book'

    bookid = db.Column(UUIDType(), primary_key=True)
    bookname = db.Column(db.String(80), unique=True, nullable=False)
    Isdamaged = db.Column(db.BINARY(1), nullable=False)
    Location = db.Column(db.String(200), nullable=False)
    Price = db.Column(db.double(4, 1), nullable=False)
    Kind = db.Column(db.String(80), nullable=False)
    Fine = db.Column(db.double(4, 1), nullable=False)   # 罚金
    ReturnTime = db.Column(db.Date, nullable=False)  # 归还日期

    @staticmethod
    def new_book(bookname, Isdamaged, Location, Price, Kind, Fine, ReturnTime) -> 'Book':
        return Book(
            bookid=uuid4(),
            bookname=bookname,
            Isdamaged=Isdamaged,
            Location=Location,
            Price=Price,
            Kind=Kind,
            Fine=Fine,
            ReturnTime=ReturnTime
        )

    @staticmethod
    def bookname_available(bookname) -> bool:
        result = Book.query.filter_by(bookname=bookname).all()
        return len(result) == 0
'''   

    def json(self) -> dict:
        return {
            "bookid": str(self.bookid),
            "bookname": self.bookname,
            "Isdamaged": self.Isdamaged,
            "Location" : Location,
        }

    @staticmethod
    def get_by_id(id) -> 'User':
        if type(id) != UUID:
            try:
                id = UUID(id)
            except:
                raise AttributeError("Invalid UUID")

        query = User.query.filter_by(id=id)

        if query.count() == 0:
            raise ValueError(f"User {str(id)} not found.")

        return query.first()

    @staticmethod
    def get_by_username(username) -> 'User':
        query = User.query.filter_by(username=username)

        if query.count() == 0:
            raise ValueError(f"User '{username}' not found.")

        return query.first()
'''
