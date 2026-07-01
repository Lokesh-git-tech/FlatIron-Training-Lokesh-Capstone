from datetime import datetime

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)

db = SQLAlchemy()


class User(db.Model):

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100), nullable=False)

    email = db.Column(db.String(120), unique=True, nullable=False)

    password_hash = db.Column(db.String(255), nullable=False)

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    incidents = db.relationship(
        "Incident",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    @hybrid_property
    def password(self):
        raise AttributeError("Password cannot be viewed.")

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def authenticate(self, password):
        return check_password_hash(
            self.password_hash,
            password
        )

    @validates("email")
    def validate_email(self, key, value):
        return value.lower()

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email
        }


class Incident(db.Model):

    __tablename__ = "incidents"

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(
        db.String(200),
        nullable=False
    )

    description = db.Column(db.Text)

    priority = db.Column(db.String(20))

    status = db.Column(
        db.String(20),
        default="Open"
    )

    category = db.Column(db.String(100))

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id")
    )

    user = db.relationship(
        "User",
        back_populates="incidents"
    )

    recommendations = db.relationship(
        "AIRecommendation",
        back_populates="incident",
        cascade="all, delete-orphan"
    )

    def to_dict(self):

        return {

            "id": self.id,

            "title": self.title,

            "description": self.description,

            "priority": self.priority,

            "status": self.status,

            "category": self.category,

            "created_at": self.created_at,

            "updated_at": self.updated_at

        }


class AIRecommendation(db.Model):

    __tablename__ = "recommendations"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    question = db.Column(
        db.Text,
        nullable=False
    )

    response_json = db.Column(
        db.JSON,
        nullable=False
    )

    sources_json = db.Column(
        db.JSON,
        nullable=False
    )

    model_used = db.Column(
        db.String(100),
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    incident_id = db.Column(
        db.Integer,
        db.ForeignKey("incidents.id"),
        nullable=False
    )

    incident = db.relationship(
        "Incident",
        back_populates="recommendations"
    )

    def to_dict(self):

        return {

            "id": self.id,

            "question": self.question,

            "response": self.response_json,

            "sources": self.sources_json,

            "model": self.model_used,

            "created_at": self.created_at

        }