
def error(msg:str, code=400) -> (dict, int):
    '''Error Logging'''
    if type(msg) != str:
        msg = str(msg)
    print(msg)
    return {"error": msg}, code