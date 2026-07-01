from functools import wraps

from flask import jsonify, session

from models import User


def login_required(func):

    @wraps(func)
    def wrapper(*args, **kwargs):

        user_id = session.get("user_id")

        if not user_id:
            return jsonify({
                "error": "Unauthorized"
            }), 401

        user = User.query.get(user_id)

        if not user:
            return jsonify({
                "error": "User not found."
            }), 404

        return func(user, *args, **kwargs)

    return wrapper