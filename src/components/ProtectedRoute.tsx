import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebaseConfig';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        // Optionally render a loading spinner
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (!user) {
        // Redirect to the landing page if not authenticated
        return <Navigate to="/" replace />;
    }

    // Render the protected component if authenticated
    return <>{children}</>;
};

export default ProtectedRoute;
