import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";

import "../styles/components.css";

export default function Profile() {

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    async function handleLogout() {

        await logout();

        navigate("/login");

    }

    return (

        <Layout>

            <PageHeader

                title="My Profile"

                subtitle="Manage your account."

            />

            <div className="card">

                <div className="form-group">

                    <label>Name</label>

                    <input

                        value={user?.name || ""}

                        disabled

                    />

                </div>

                <div className="form-group">

                    <label>Email</label>

                    <input

                        value={user?.email || ""}

                        disabled

                    />

                </div>

                <div className="form-actions">

                    <button

                        className="danger-btn"

                        onClick={handleLogout}

                    >

                        Logout

                    </button>

                </div>

            </div>

        </Layout>

    );

}