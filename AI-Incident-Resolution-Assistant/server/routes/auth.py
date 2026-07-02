from flask import Blueprint, request, jsonify, session

from models import db, User

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/signup", methods=["POST"])
def signup():

    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({
            "error": "Name, email and password are required."
        }), 400

    existing_user = User.query.filter_by(
        email=email.lower()
    ).first()

    if existing_user:
        return jsonify({
            "error": "Email already exists."
        }), 409

    new_user = User(
        name=name,
        email=email.lower()
    )

    new_user.password = password

    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.id

    print("=" * 60)
    print("SIGNUP SESSION")
    print(dict(session))
    print("=" * 60)

    return jsonify({
        "id": new_user.id,
        "name": new_user.name,
        "email": new_user.email
    }), 201


@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({
            "error": "Email and password are required."
        }), 400

    user = User.query.filter_by(
        email=email.lower()
    ).first()

    if user and user.authenticate(password):

        session["user_id"] = user.id

        print("=" * 60)
        print("LOGIN SESSION CREATED")
        print(dict(session))
        print("=" * 60)

        return jsonify({
            "id": user.id,
            "name": user.name,
            "email": user.email
        }), 200

    return jsonify({
        "error": "Invalid email or password."
    }), 401


@auth_bp.route("/check_session", methods=["GET"])
def check_session():

    print("=" * 60)
    print("CHECK SESSION")
    print(dict(session))
    print("=" * 60)

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

    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email
    }), 200


@auth_bp.route("/logout", methods=["DELETE"])
def logout():

    print("=" * 60)
    print("LOGOUT SESSION")
    print(dict(session))
    print("=" * 60)

    session.pop("user_id", None)

    return jsonify({
        "message": "Logged out successfully."
    }), 200