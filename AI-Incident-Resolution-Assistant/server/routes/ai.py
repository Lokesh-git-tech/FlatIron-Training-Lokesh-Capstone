from flask import Blueprint, jsonify, request

from models import db
from models import Incident
from models import AIRecommendation

from routes.auth_utils import login_required

from rag.rag_service import RAGService

ai_bp = Blueprint("ai", __name__)

rag = RAGService()


@ai_bp.route("/incidents/<int:id>/ai", methods=["POST"])
@login_required
def generate_ai(current_user, id):

    incident = Incident.query.filter_by(
        id=id,
        user_id=current_user.id
    ).first()

    if not incident:

        return jsonify({
            "error": "Incident not found."
        }), 404

    data = request.get_json()

    if not data:

        return jsonify({
            "error": "Request body is required."
        }), 400

    question = data.get("question")

    if not question:

        return jsonify({
            "error": "Question is required."
        }), 400

    try:

        result = rag.generate_resolution(
            incident,
            question
        )

        recommendation = AIRecommendation(

            question=question,

            response_json=result["response"],

            sources_json=result["sources"],

            model_used=result["model"],

            incident=incident

        )

        db.session.add(recommendation)

        db.session.commit()

        return jsonify(
            recommendation.to_dict()
        ), 201

    except Exception as e:

        db.session.rollback()

        return jsonify({

            "error": "Failed to generate AI response.",

            "details": str(e)

        }), 500