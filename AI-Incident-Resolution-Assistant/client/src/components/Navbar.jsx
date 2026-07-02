import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Navbar() {

    const { user, logout } = useAuth();

    return (

        <nav
            style={{
                background: "white",
                padding: "18px 30px",
                borderRadius: "10px",
                boxShadow: "var(--shadow)",
                marginBottom: "30px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >

            <h2>

                AI Incident Resolution Assistant

            </h2>

            {user && (

                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        alignItems: "center"
                    }}
                >

                    <Link to="/dashboard">

                        Dashboard

                    </Link>

                    <Link to="/profile">

                        Profile

                    </Link>

                    <button
                        onClick={logout}
                    >

                        Logout

                    </button>

                </div>

            )}

        </nav>

    );

}