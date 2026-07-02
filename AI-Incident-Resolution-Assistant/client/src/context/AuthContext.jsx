import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        checkSession();

    }, []);

    async function checkSession() {

        try {

            const response = await api.get("/check_session");

            setUser(response.data);

        }

        catch {

            setUser(null);

        }

        finally {

            setLoading(false);

        }

    }

    async function login(email, password) {

        const response = await api.post("/login", {

            email,

            password

        });

        setUser(response.data);

    }

    async function register(name, email, password) {

        const response = await api.post("/signup", {

            name,

            email,

            password

        });

        setUser(response.data);

    }

    async function logout() {

        await api.delete("/logout");

        setUser(null);

    }

    return (

        <AuthContext.Provider

            value={{

                user,

                loading,

                login,

                register,

                logout,

                checkSession

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}