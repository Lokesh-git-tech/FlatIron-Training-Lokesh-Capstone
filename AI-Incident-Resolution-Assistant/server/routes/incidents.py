from flask import Blueprint, jsonify, request

from models import db, Incident
from routes.auth_utils import login_required

incident_bp = Blueprint("incidents", __name__)


@incident_bp.route("/incidents", methods=["GET"])
@login_required
def get_incidents(current_user):

    incidents = Incident.query.filter_by(
        user_id=current_user.id
    ).order_by(
        Incident.created_at.desc()
    ).all()

    return jsonify(
        [incident.to_dict() for incident in incidents]
    ), 200


@incident_bp.route("/incidents/<int:id>", methods=["GET"])
@login_required
def get_incident(current_user, id):

    incident = Incident.query.filter_by(
        id=id,
        user_id=current_user.id
    ).first()

    if not incident:
        return jsonify({
            "error": "Incident not found."
        }), 404

    return jsonify(
        incident.to_dict()
    ), 200


@incident_bp.route("/incidents", methods=["POST"])
@login_required
def create_incident(current_user):

    data = request.get_json()

    title = data.get("title")
    description = data.get("description")
    priority = data.get("priority")
    category = data.get("category")

    if not title:
        return jsonify({
            "error": "Title is required."
        }), 400

    incident = Incident(
        title=title,
        description=description,
        priority=priority,
        category=category,
        status="Open",
        user=current_user
    )

    db.session.add(incident)
    db.session.commit()

    return jsonify(
        incident.to_dict()
    ), 201


@incident_bp.route("/incidents/<int:id>", methods=["PATCH"])
@login_required
def update_incident(current_user, id):

    incident = Incident.query.filter_by(
        id=id,
        user_id=current_user.id
    ).first()

    if not incident:
        return jsonify({
            "error": "Incident not found."
        }), 404

    data = request.get_json()

    if "title" in data:
        incident.title = data["title"]

    if "description" in data:
        incident.description = data["description"]

    if "priority" in data:
        incident.priority = data["priority"]

    if "status" in data:
        incident.status = data["status"]

    if "category" in data:
        incident.category = data["category"]

    db.session.commit()

    return jsonify(
        incident.to_dict()
    ), 200


@incident_bp.route("/incidents/<int:id>", methods=["DELETE"])
@login_required
def delete_incident(current_user, id):

    incident = Incident.query.filter_by(
        id=id,
        user_id=current_user.id
    ).first()

    if not incident:
        return jsonify({
            "error": "Incident not found."
        }), 404

    db.session.delete(incident)
    db.session.commit()

    return jsonify({
        "message": "Incident deleted successfully."
    }), 200