import "../styles/incident.css";

export default function IncidentSummary({ incident }) {

    const priorityClass = incident.priority.toLowerCase();

    const createdDate = new Date(
        incident.created_at
    ).toLocaleString();

    return (

        <div className="incident-summary">

            <div className="incident-header">

                <div>

                    <h2>

                        {incident.title}

                    </h2>

                    <p
                        style={{
                            color: "#64748B",
                            marginTop: "8px"
                        }}
                    >

                        📂 {incident.category}

                    </p>

                </div>

                <span className={`badge ${priorityClass}`}>

                    {incident.priority}

                </span>

            </div>

            <div className="summary-grid">

                <div className="summary-item">

                    <h4>

                        🟢 Status

                    </h4>

                    <p>

                        {incident.status}

                    </p>

                </div>

                <div className="summary-item">

                    <h4>

                        📅 Created

                    </h4>

                    <p>

                        {createdDate}

                    </p>

                </div>

                <div className="summary-item">

                    <h4>

                        📂 Category

                    </h4>

                    <p>

                        {incident.category}

                    </p>

                </div>

            </div>

            <div
                style={{
                    marginTop: "30px"
                }}
            >

                <h3
                    style={{
                        marginBottom: "15px"
                    }}
                >

                    📝 Description

                </h3>

                <div className="summary-item">

                    <p
                        style={{
                            fontWeight: "400",
                            lineHeight: "1.8"
                        }}
                    >

                        {incident.description}

                    </p>

                </div>

            </div>

        </div>

    );

}