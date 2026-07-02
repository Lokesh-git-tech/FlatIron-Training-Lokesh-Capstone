import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";

import { createIncident } from "../api/api";

import "../styles/components.css";

export default function CreateIncident() {

    const navigate = useNavigate();

    const [form, setForm] = useState({

        title: "",

        category: "",

        priority: "Medium",

        description: ""

    });

    const [error, setError] = useState("");

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

            await createIncident(form);

            navigate("/dashboard");

        }

        catch (err) {

            setError(

                err.response?.data?.error ||

                "Unable to create incident."

            );

        }

    }

    return (

        <Layout>

            <PageHeader

                title="Create Incident"

                subtitle="Create a new IT support incident."

            />

            <div className="card">

                {error && (

                    <p style={{color:"red"}}>

                        {error}

                    </p>

                )}

                <form onSubmit={handleSubmit}>

                    <label>Title</label>

                    <input

                        name="title"

                        value={form.title}

                        onChange={handleChange}

                        required

                    />

                    <br /><br />

                    <label>Category</label>

                    <input

                        name="category"

                        value={form.category}

                        onChange={handleChange}

                        required

                    />

                    <br /><br />

                    <label>Priority</label>

                    <select

                        name="priority"

                        value={form.priority}

                        onChange={handleChange}

                    >

                        <option>Low</option>

                        <option>Medium</option>

                        <option>High</option>

                    </select>

                    <br /><br />

                    <label>Description</label>

                    <textarea

                        rows="6"

                        name="description"

                        value={form.description}

                        onChange={handleChange}

                        required

                    />

                    <br /><br />

                    <button

                        className="primary-btn"

                        type="submit"

                    >

                        Create Incident

                    </button>

                </form>

            </div>

        </Layout>

    );

}