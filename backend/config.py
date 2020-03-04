import os

# Using in-memory database for dev environment
db_uri = os.environ.get("FLASK_DB_URI") or "sqlite:///"

# Stages: dev, test, prod, default in dev environment
stage = os.environ.get("FLASK_STAGE") or "dev"

# Create tables & insert values on startup?
# Represented by TRUE / FALSE, not bool.
# Default to "TRUE".
create_db_on_startup = os.environ.get("FLASK_DB_CREATE") or "TRUE"
