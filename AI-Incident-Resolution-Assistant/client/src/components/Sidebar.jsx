import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "../styles/layout.css";

export default function Sidebar() {

    const { logout, user } = useAuth();

    const navigate = useNavigate();

    async function handleLogout() {

        await logout();

        navigate("/login");

    }

    return (

        <aside className="sidebar">

            <div>

                <h2 className="logo">

                    AI Incident
                    <br />
                    Resolution Assistant

                </h2>

                {user && (

                    <p
                        style={{
                            marginBottom: "30px",
                            color: "#CBD5E1"
                        }}
                    >
                        Welcome,
                        <br />
                        <strong>{user.name}</strong>
                    </p>

                )}

                <nav>

                    <Link to="/dashboard">
                        Dashboard
                    </Link>

                    <Link to="/incidents/new">
                        Create Incident
                    </Link>

                    <Link to="/profile">
                        Profile
                    </Link>

                </nav>

            </div>

            <button
                className="logout-btn"
                onClick={handleLogout}
            >
                Logout
            </button>

        </aside>

    );

}