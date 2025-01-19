import useAuthRedirect from '../hooks/useAuthRedirect';

const Editor = () => {
    useAuthRedirect();

    return (
        <div className="container mt-5">
            <h1>Business Model Canvas Editor</h1>
        </div>
    );
};

export default Editor;
