from backend.resources.user import User
from backend.resources.tests.utils import setup

def test_new_user():
    username = "test-new"
    password = "test-password"
    role = "admin"
    user = User.new_user(username, password, role)
    assert user.username == "test-new"
    assert user.check_password(password)
    assert user.json()["username"] == username
    assert user.role == role

def test_salt():
    a = User.new_user("a", "pass", "reader")
    b = User.new_user("b", "pass", "reader")
    assert a.hash != b.hash
