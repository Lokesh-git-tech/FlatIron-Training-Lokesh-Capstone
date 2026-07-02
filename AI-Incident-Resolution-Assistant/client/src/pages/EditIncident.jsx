import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";

import {
    getIncident,
    updateIncident
} from "../api/api";

import "../styles/components.css";

export default function EditIncident() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [form, setForm] = useState({

        title: "",

        category: "",

        priority: "Medium",

        description: ""

    });

    useEffect(() => {

        loadIncident();

    }, []);

    async function loadIncident() {

        try {

            const response = await getIncident(id);

            setForm({

                title: response.data.title,

                category: response.data.category,

                priority: response.data.priority,

                description: response.data.description

            });

        }

        catch (err) {

            setError(

                "Unable to load incident."

            );

        }

        finally {

            setLoading(false);

        }

    }

    function handleChange(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        setError("");

        try {

            await updateIncident(

                id,

                form

            );

            navigate(`/incidents/${id}`);

        }

        catch (err) {

            setError(

                err.response?.data?.error ||

                "Unable to update incident."

            );

        }

    }

    if (loading) {

        return (

            <Layout>

                <h2>

                    Loading...

                </h2>

            </Layout>

        );

    }

    return (

        <Layout>

            <PageHeader

                title="Edit Incident"

                subtitle="Update incident details."

            />

            <div className="card">

                {

                    error &&

                    <div className="error-message">

                        {error}

                    </div>

                }

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>

                            Title

                        </label>

                        <input

                            name="title"

                            value={form.title}

                            onChange={handleChange}

                            required

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Category

                        </label>

                        <input

                            name="category"

                            value={form.category}

                            onChange={handleChange}

                            required

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Priority

                        </label>

                        <select

                            name="priority"

                            value={form.priority}

                            onChange={handleChange}

                        >

                            <option>

                                Low

                            </option>

                            <option>

                                Medium

                            </option>

                            <option>

                                High

                            </option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>

                            Description

                        </label>

                        <textarea

                            rows="6"

                            name="description"

                            value={form.description}

                            onChange={handleChange}

                            required

                        />

                    </div>

                    <div className="form-actions">

                        <button

                            className="primary-btn"

                            type="submit"

                        >

                            Update Incident

                        </button>

                    </div>

                </form>

            </div>

        </Layout>

    );

}