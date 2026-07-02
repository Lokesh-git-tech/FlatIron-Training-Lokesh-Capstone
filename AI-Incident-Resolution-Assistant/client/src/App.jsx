import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateIncident from "./pages/CreateIncident";
import EditIncident from "./pages/EditIncident";
import IncidentDetails from "./pages/IncidentDetails";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/incidents/new"
                element={
                    <ProtectedRoute>
                        <CreateIncident />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/incidents/:id"
                element={
                    <ProtectedRoute>
                        <IncidentDetails />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/incidents/:id/edit"
                element={
                    <ProtectedRoute>
                        <EditIncident />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            <Route
                path="*"
                element={<Navigate to="/dashboard" replace />}
            />

        </Routes>

    );

}

export default App;