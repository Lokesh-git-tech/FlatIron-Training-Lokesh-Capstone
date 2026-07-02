import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../components/Layout";
import Loading from "../components/Loading";
import PageHeader from "../components/PageHeader";
import IncidentSummary from "../components/IncidentSummary";
import IncidentActions from "../components/IncidentActions";
import AIAssistant from "../components/AIAssistant";

import { getIncident } from "../api/api";

import "../styles/incident.css";

export default function IncidentDetails() {

    const { id } = useParams();

    const [incident, setIncident] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadIncident();

    }, []);

    async function loadIncident() {

        try {

            const response = await getIncident(id);

            setIncident(response.data);

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

    if (!incident) {

        return (

            <Layout>

                <h2>

                    Incident not found.

                </h2>

            </Layout>

        );

    }

    return (

        <Layout>

            <PageHeader

                title={incident.title}

                subtitle="Incident Details"

            />

            <IncidentSummary

                incident={incident}

            />

            <IncidentActions

                incidentId={incident.id}

            />

            <AIAssistant

                incidentId={incident.id}

            />

        </Layout>

    );

}