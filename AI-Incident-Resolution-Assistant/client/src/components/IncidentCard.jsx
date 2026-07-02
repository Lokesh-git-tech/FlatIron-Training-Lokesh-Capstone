import { Link } from "react-router-dom";

import "../styles/incident.css";

export default function IncidentCard({ incident }) {

    const priorityClass = incident.priority.toLowerCase();

    return (

        <div className="incident-card">

            <div className="incident-header">

                <h2>{incident.title}</h2>

                <span className={`badge ${priorityClass}`}>

                    {incident.priority}

                </span>

            </div>

            <p>

                <strong>Status:</strong>{" "}

                <span
                    className={
                        incident.status === "Resolved"
                            ? "status-resolved"
                            : "status-open"
                    }
                >
                    {incident.status}
                </span>

            </p>

            <p>

                <strong>Category:</strong>{" "}

                {incident.category}

            </p>

            <p>

                <strong>Created:</strong>{" "}

                {new Date(
                    incident.created_at
                ).toLocaleDateString()}

            </p>

            <Link

                to={`/incidents/${incident.id}`}

                className="view-link"

            >

                View Details →

            </Link>

        </div>

    );

}