from backend.tests.utils import base_url
import requests
from requests.compat import urljoin

def test_not_logged_in():
    url = urljoin(base_url, "login")
    resp = requests.get(url)

    assert resp.status_code == 401
    assert "error" in resp.json().keys()

def test_admin_login():
    url = urljoin(base_url, "login")
    headers = {"username": "admin", "password": "pass"}
    resp = requests.post(url, headers=headers)

    assert resp.status_code == 200
    assert "session-id" in resp.cookies.keys()

    cookies = {"session-id": resp.cookies["session-id"]}
    resp = requests.get(url, cookies=cookies)
    assert resp.status_code == 200
    
    sess = resp.json()
    user = sess["user"]

    assert user["username"] == "admin"
    assert user["role"] == "admin"

def test_admin_logout():
    url = urljoin(base_url, "login")
    headers = {"username": "admin", "password": "pass"}
    resp = requests.post(url, headers=headers)  # Login
    assert resp.status_code == 200
    assert "session-id" in resp.cookies.keys()

    cookies = {"session-id": resp.cookies["session-id"]}
    resp = requests.delete(url, cookies=cookies)    # Logout
    assert resp.status_code == 204
    
    resp = requests.get(url, cookies=cookies)   # Test logged in
    assert resp.status_code == 401
    assert "error" in resp.json().keys()
