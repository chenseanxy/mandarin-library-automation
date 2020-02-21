from backend.resources.version import Version

def test_version():
    api = Version()
    responce = api.get()

    assert "version" in responce.keys()
