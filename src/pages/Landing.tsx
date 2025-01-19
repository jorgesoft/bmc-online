import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const Landing = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [error, setError] = useState('');

    // Redirect authenticated users to /home
    useEffect(() => {
        if (user) {
            navigate('/home');
        }
    }, [user, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            navigate('/home');
        } catch (err: any) {
            setError('Login failed. Please check your credentials.');
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            navigate('/home');
        } catch (err: any) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="container text-center mt-5">
            <h1>Welcome to Business Model Canvas Online</h1>
            <div className="row mt-4">
                {/* Login Section */}
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Login</h2>
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="loginEmail" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        id="loginEmail"
                                        className="form-control"
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="loginPassword" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        id="loginPassword"
                                        className="form-control"
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                {error && <p className="text-danger">{error}</p>}
                                <button type="submit" className="btn btn-primary w-100">Login</button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Register Section */}
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Register</h2>
                            <form onSubmit={handleRegister}>
                                <div className="mb-3">
                                    <label htmlFor="registerEmail" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        id="registerEmail"
                                        className="form-control"
                                        value={registerEmail}
                                        onChange={(e) => setRegisterEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="registerPassword" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        id="registerPassword"
                                        className="form-control"
                                        value={registerPassword}
                                        onChange={(e) => setRegisterPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                {error && <p className="text-danger">{error}</p>}
                                <button type="submit" className="btn btn-success w-100">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
