import { Link } from "react-router-dom";

import "../styles/incident.css";

export default function IncidentCard({ incident }) {

    const priorityClass = (incident.priority || "Medium").toLowerCase();

    const statusClass =
        incident.status === "Resolved"
            ? "status-resolved"
            : "status-open";

    return (

        <div className="incident-card">

            <div className="incident-header">

                <div>

                    <h2>{incident.title}</h2>

                    <p className="incident-category">

                        {incident.category}

                    </p>

                </div>

                <span className={`badge ${priorityClass}`}>

                    {incident.priority}

                </span>

            </div>

            <div className="incident-meta">

                <p>

                    <strong>Status:</strong>{" "}

                    <span className={statusClass}>

                        {incident.status}

                    </span>

                </p>

                <p>

                    <strong>Created:</strong>{" "}

                    {

                        incident.created_at

                            ? new Date(
                                  incident.created_at
                              ).toLocaleDateString()

                            : "N/A"

                    }

                </p>

            </div>

            <p className="incident-description">

                {

                    incident.description
                        ? incident.description.substring(0, 120) +
                          (incident.description.length > 120 ? "..." : "")
                        : "No description available."

                }

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