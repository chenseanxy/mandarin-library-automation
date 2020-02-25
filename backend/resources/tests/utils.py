from backend.resources.generators.create_db import create_db
import pytest

@pytest.fixture(scope="session")
def setup():
    print("setting up")
    from backend.app import app, db
    create_db(app, db)

