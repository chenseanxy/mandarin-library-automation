from backend.models.session import Session
from backend.test_utils import setup
from backend.models.user import User

from datetime import datetime, timedelta
import pytest

def test_new_session(setup):
    username = "admin"
    session = Session.new_session(username)
    assert session.user.username == username
    assert not session.expired()

    setup.session.add(session)
    setup.session.commit()

    session = Session.get_by_id(session.id)
    assert session.user.username == username

def test_expired_session(setup):
    username = "admin"
    time = datetime.now() - timedelta(hours=2)
    session = Session.new_session(username, time)
    setup.session.add(session)
    setup.session.commit()

    with pytest.raises(ValueError):
        assert session.get_by_id(session.id)

def test_user_backref(setup):
    username = "lib"
    session = Session.new_session(username)
    setup.session.add(session)
    setup.session.commit()
    
    user = User.get_by_username(username)
    ids = [session.id for session in user.sessions]

    assert session.id in ids

    

