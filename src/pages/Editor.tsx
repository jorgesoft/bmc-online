import useAuthRedirect from '../hooks/useAuthRedirect';
import Navbar from '../components/Navbar';

const Editor = () => {
    useAuthRedirect();

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <h1>Business Model Canvas Editor</h1>
                <p>Edit your canvas details here.</p>
            </div>
        </div>
    );
};

export default Editor;
