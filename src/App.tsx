import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Editor from "./pages/Editor";
import CreateBusiness from "./pages/CreateBusiness"; // New CreateBusiness page
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Route */}
                <Route path="/" element={<Landing />} />
                
                {/* Protected Routes */}
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/editor/:id"
                    element={
                        <ProtectedRoute>
                            <Editor />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/create"
                    element={
                        <ProtectedRoute>
                            <CreateBusiness />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
