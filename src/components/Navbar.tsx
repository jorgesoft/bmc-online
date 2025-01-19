import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate('/'); // Redirect to landing page after logout
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="/home">Business Model Canvas Online</a>
                <button
                    className="btn btn-secondary ms-auto"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
