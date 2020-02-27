from backend.resources.session import authenticated
from backend.models.session import Session
from backend.test_utils import setup
from datetime import datetime, timedelta
import flask

def test_auth_success(setup, mocker):
    username = "admin"
    role = "admin"
    sess = Session.new_session("admin")

    setup.session.add(sess)
    setup.session.commit()

    request = mocker.patch.object(flask, "request")
    request.cookies = {"session-id":sess.id}
    
    def inner_func(username, role, sessid, **kwargs):
        sess = kwargs["session"]
        assert sess.user.username == username
        assert sess.user.role == role
        assert sess.id == sessid
    
    wrapped_func = authenticated(inner_func)
    wrapped_func(username, role, sess.id, 
        testing_request=request
    )
    
def test_auth_faliure(setup, mocker):
    username = "admin"
    role = "admin"
    expire = datetime.now() + timedelta(hours=-3)
    sess = Session.new_session("admin", expire)

    setup.session.add(sess)
    setup.session.commit()

    request = mocker.patch.object(flask, "request")
    request.cookies = {"session-id":sess.id}
    
    def inner_func(**kwargs):
        assert not 1 == 1  #This inner func should not be called

    wrapped_func = authenticated(inner_func)
    resp, code = wrapped_func(username, role, sess.id, 
        testing_request=request
    )

    assert "error" in resp.keys()
    assert code == 401
    