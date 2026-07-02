import { Link, useNavigate } from "react-router-dom";

import { deleteIncident } from "../api/api";

import "../styles/components.css";

export default function IncidentActions({ incidentId }) {

    const navigate = useNavigate();

    async function handleDelete() {

        const confirmed = window.confirm(
            "Delete this incident?"
        );

        if (!confirmed) {

            return;

        }

        try {

            await deleteIncident(incidentId);

            navigate("/dashboard");

        }

        catch (error) {

            console.error(error);

            alert("Unable to delete incident.");

        }

    }

    return (

        <div className="form-actions">

            <Link

                to={`/incidents/${incidentId}/edit`}

                className="secondary-btn"

            >

                Edit Incident

            </Link>

            <button

                onClick={handleDelete}

                className="danger-btn"

            >

                Delete Incident

            </button>

        </div>

    );

}