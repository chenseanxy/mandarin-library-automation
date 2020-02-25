from backend.resources.version import Version
from backend.resources.tests.utils import setup

def test_version(setup):

    api = Version()
    responce = api.get()

    assert "version" in responce.keys()

def test_num_of_versions(setup):

    api = Version()
    responce = api.get()

    assert responce["numOfVersions"] == 1
