from backend.resources.user import User

users = [
    ("admin", "pass", "admin"),
    ("lib", "pass", "librarian"),
    ("reader", "pass", "reader"),
]

UsersGenerator = (User.new_user(name, pwd, role) for name, pwd, role in users)
