import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../components/Layout";
import Loading from "../components/Loading";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import IncidentCard from "../components/IncidentCard";

import { getIncidents } from "../api/api";

import "../styles/dashboard.css";
import "../styles/components.css";

export default function Dashboard() {

    const [incidents, setIncidents] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadIncidents();

    }, []);

    async function loadIncidents() {

        try {

            const response = await getIncidents();

            setIncidents(response.data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return <Loading />;

    }

    const openIncidents = incidents.filter(

        incident => incident.status === "Open"

    ).length;

    const highPriority = incidents.filter(

        incident => incident.priority === "High"

    ).length;

    const resolvedIncidents = incidents.filter(

        incident => incident.status === "Resolved"

    ).length;

    return (

        <Layout>

            <PageHeader

                title="Dashboard"

                subtitle="Manage incidents and resolve issues using AI."

            />

            <div
                style={{
                    marginBottom: "30px"
                }}
            >

                <Link
                    to="/incidents/new"
                    className="primary-btn"
                >
                    + New Incident
                </Link>

            </div>

            <div className="stats">

                <StatCard

                    title="Open Incidents"

                    value={openIncidents}

                />

                <StatCard

                    title="High Priority"

                    value={highPriority}

                />

                <StatCard

                    title="Resolved"

                    value={resolvedIncidents}

                />

            </div>

            <h2
                style={{
                    marginTop: "40px",
                    marginBottom: "20px"
                }}
            >
                Recent Incidents
            </h2>

            {

                incidents.length === 0 ? (

                    <div className="card">

                        <p>

                            No incidents found.

                        </p>

                    </div>

                ) : (

                    <div
                        style={{
                            display: "grid",
                            gap: "20px"
                        }}
                    >

                        {

                            incidents.map(

                                incident => (

                                    <IncidentCard

                                        key={incident.id}

                                        incident={incident}

                                    />

                                )

                            )

                        }

                    </div>

                )

            }

        </Layout>

    );

}