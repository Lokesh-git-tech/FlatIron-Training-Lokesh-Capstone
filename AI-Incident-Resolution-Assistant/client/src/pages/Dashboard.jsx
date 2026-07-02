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

            <div className="dashboard-hero">

                <h1>

                    👋 Welcome Back!

                </h1>

                <p>

                    Monitor IT incidents, generate AI-powered resolutions,

                    and resolve issues faster using your local RAG assistant.

                </p>

            </div>

            <PageHeader

                title="Incident Dashboard"

                subtitle="Track, manage and resolve incidents efficiently."

            />

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "30px"
                }}
            >

                <h2>

                    📊 Overview

                </h2>

                <Link

                    to="/incidents/new"

                    className="primary-btn"

                >

                    + New Incident

                </Link>

            </div>

            <div className="stats">

                <StatCard

                    title="🟢 Open Incidents"

                    value={openIncidents}

                />

                <StatCard

                    title="🔴 High Priority"

                    value={highPriority}

                />

                <StatCard

                    title="✅ Resolved"

                    value={resolvedIncidents}

                />

            </div>

            <div className="section-title">

                <h2>

                    📂 Recent Incidents

                </h2>

                <p>

                    Latest tickets created in the system

                </p>

            </div>

            {

                incidents.length === 0 ? (

                    <div className="empty-state">

                        <h3>

                            No incidents found

                        </h3>

                        <p>

                            Create your first incident to begin using

                            the AI Incident Resolution Assistant.

                        </p>

                    </div>

                ) : (

                    <div className="incident-grid">

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