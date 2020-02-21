from backend.tests.utils import base_url
import requests
from requests.compat import urljoin

def test_version_get():
    url = urljoin(base_url, "version")
    resp = requests.get(url).json()
    assert "version" in resp.keys()
    assert len(resp["version"]) > 0
