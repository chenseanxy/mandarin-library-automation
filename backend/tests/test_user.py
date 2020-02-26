from backend.tests.utils import base_url
import requests
from requests.compat import urljoin

def test_default_users():
    url = urljoin(base_url, "user")
    resp = requests.get(url).json()
    usernames = [u["username"] for u in resp]
    assert "admin" in usernames
    assert "lib" in usernames
    assert "reader" in usernames

def test_create_user():
    url = urljoin(base_url, "user")
    resp = requests.post(url, 
        data={"username": "a", "password": "pass"},
    )
    data = resp.json()
    assert data["username"] == "a"
    assert resp.status_code == 201
    assert data["id"] != None

    url = f"{url}/{data['id']}"
    resp = requests.get(url)
    data = resp.json()
    assert resp.status_code == 200
    assert data["username"] == "a"
