import { NavLink, useNavigate } from "react-router-dom";
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

                    🤖 AI Incident
                    <br />
                    Resolution Assistant

                </h2>

                {

                    user && (

                        <div className="user-card">

                            <div className="avatar">

                                {user.name.charAt(0).toUpperCase()}

                            </div>

                            <div>

                                <p className="welcome">

                                    Welcome

                                </p>

                                <strong>

                                    {user.name}

                                </strong>

                            </div>

                        </div>

                    )

                }

                <nav>

                    <NavLink

                        to="/dashboard"

                        className={({ isActive }) =>

                            isActive ? "active-link" : ""

                        }

                    >

                        📊 Dashboard

                    </NavLink>

                    <NavLink

                        to="/incidents/new"

                        className={({ isActive }) =>

                            isActive ? "active-link" : ""

                        }

                    >

                        ➕ Create Incident

                    </NavLink>

                    <NavLink

                        to="/profile"

                        className={({ isActive }) =>

                            isActive ? "active-link" : ""

                        }

                    >

                        👤 My Profile

                    </NavLink>

                </nav>

            </div>

            <button

                className="logout-btn"

                onClick={handleLogout}

            >

                🚪 Logout

            </button>

        </aside>

    );

}