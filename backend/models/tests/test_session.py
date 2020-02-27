from backend.models.session import Session
from backend.test_utils import setup

def test_new_session(setup):
    username = "admin"
    session = Session.new_session(username)
    assert session.user.username == username
    assert not session.expired()
