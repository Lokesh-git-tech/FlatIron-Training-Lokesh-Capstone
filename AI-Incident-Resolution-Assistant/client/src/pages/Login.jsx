import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();

        setError("");

        try {

            await login(email, password);

            navigate("/dashboard");

        }

        catch (err) {

            setError(

                err.response?.data?.error ||

                "Login failed."

            );

        }

    }

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh"
            }}
        >

            <div
                style={{
                    width: "420px",
                    background: "white",
                    padding: "40px",
                    borderRadius: "12px",
                    boxShadow: "var(--shadow)"
                }}
            >

                <h1
                    style={{
                        textAlign: "center",
                        marginBottom: "10px"
                    }}
                >
                    AI Incident Resolution Assistant
                </h1>

                <p
                    style={{
                        textAlign: "center",
                        color: "var(--text-light)",
                        marginBottom: "30px"
                    }}
                >
                    Sign in to continue
                </p>

                {error && (

                    <div
                        style={{
                            background: "#FEE2E2",
                            color: "#991B1B",
                            padding: "10px",
                            marginBottom: "20px",
                            borderRadius: "8px"
                        }}
                    >
                        {error}
                    </div>

                )}

                <form onSubmit={handleSubmit}>

                    <label>Email</label>

                    <input

                        type="email"

                        value={email}

                        onChange={(e) => setEmail(e.target.value)}

                        required

                        style={inputStyle}

                    />

                    <label>Password</label>

                    <input

                        type="password"

                        value={password}

                        onChange={(e) => setPassword(e.target.value)}

                        required

                        style={inputStyle}

                    />

                    <button
                        type="submit"
                        style={buttonStyle}
                    >
                        Login
                    </button>

                </form>

                <p
                    style={{
                        textAlign: "center",
                        marginTop: "20px"
                    }}
                >

                    Don't have an account?

                    <Link
                        to="/register"
                        style={{
                            color: "var(--primary)",
                            marginLeft: "5px"
                        }}
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>

    );

}

const inputStyle = {

    width: "100%",

    padding: "12px",

    marginTop: "8px",

    marginBottom: "20px",

    border: "1px solid var(--border)",

    borderRadius: "8px"

};

const buttonStyle = {

    width: "100%",

    background: "var(--primary)",

    color: "white",

    padding: "12px",

    borderRadius: "8px",

    fontSize: "16px"

};