import useAuthRedirect from '../hooks/useAuthRedirect';

const Home = () => {
    useAuthRedirect();

    return (
        <div className="container mt-5">
            <h1>Home Page</h1>
            <p>Welcome to your dashboard!</p>
        </div>
    );
};

export default Home;
