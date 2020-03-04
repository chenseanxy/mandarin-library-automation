from flask_restful import abort

def error(msg:str, code=400) -> (dict, int):
    '''Error Logging'''
    headers = {}
    if code == 401:
        headers["WWW-Authenticate"] = "Digest"
    if type(msg) != str:
        msg = str(msg)
    print(msg)
    return {"error": msg}, code, headers