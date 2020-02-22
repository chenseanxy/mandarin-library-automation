import os

port = os.environ.get("FLASK_TEST_PORT")
server = os.environ.get("FLASK_TEST_SERVER")

if port == None:
    port = 5000

if server == None:
    server = "localhost"

base_url = f"http://{server}:{port}/api/"
