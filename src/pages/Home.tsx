import useAuthRedirect from '../hooks/useAuthRedirect';
import Navbar from '../components/Navbar';

const Home = () => {
    useAuthRedirect();

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <h1>Welcome to your Dashboard</h1>
                <p>Create and manage your business canvases.</p>
            </div>
        </div>
    );
};

export default Home;
