import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const LoginComponent = ({ onError }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Google Sign-In Error:", err);
      onError("Google Sign-In failed. Please try again.");
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (activeTab === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      console.error("Authentication Error:", err);
      onError(
        activeTab === "login"
          ? "Login failed. Please check your credentials."
          : "Registration failed. Please try again."
      );
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMessage("Password reset email sent. Check your inbox.");
    } catch (err) {
      console.error("Password Reset Error:", err);
      setResetMessage("Failed to send password reset email. Please try again.");
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-center mb-4">
          <button
            className={`btn ${activeTab === "login" ? "btn-primary" : "btn-light"} mx-2`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`btn ${activeTab === "register" ? "btn-primary" : "btn-light"} mx-2`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        {!showReset ? (
          <>
            <p className="text-center">Sign in with:</p>
            <div className="d-flex justify-content-center mb-3">
              <button className="btn btn-outline-danger" onClick={handleGoogleSignIn}>
                <i className="bi bi-google"></i> Continue with Google
              </button>
            </div>
            <p className="text-center">or:</p>
            <form onSubmit={handleAuth}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email or username
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {activeTab === "login" && (
                <div className="d-flex justify-content-between mb-3">
                  <div>
                    <input type="checkbox" id="rememberMe" />
                    <label htmlFor="rememberMe" className="ms-2">
                      Remember me
                    </label>
                  </div>
                  <button
                    type="button"
                    className="btn btn-link p-0 text-decoration-none"
                    onClick={() => setShowReset(true)}
                  >
                    Forgot password?
                  </button>
                </div>
              )}
              <button type="submit" className="btn btn-primary w-100">
                {activeTab === "login" ? "Sign In" : "Sign Up"}
              </button>
            </form>
          </>
        ) : (
          <>
            <h5 className="text-center mb-4">Reset Password</h5>
            <form onSubmit={handlePasswordReset}>
              <div className="mb-3">
                <label htmlFor="resetEmail" className="form-label">
                  Enter your email
                </label>
                <input
                  type="email"
                  id="resetEmail"
                  className="form-control"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Send Reset Email
              </button>
            </form>
            <button
              type="button"
              className="btn btn-link mt-3 text-decoration-none"
              onClick={() => setShowReset(false)}
            >
              Back to Login
            </button>
            {resetMessage && <p className="text-success mt-3">{resetMessage}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default LoginComponent;
