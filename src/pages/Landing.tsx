import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import LoginComponent from "../components/LoginComponent";

const Landing = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  return (
    <div className="container text-center mt-5">
      <div className="row">
        {/* Left Section */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <h1>Welcome to Business Model Canvas Online!</h1>
          <ul className="mt-3 text-start" style={{ maxWidth: "400px" }}>
            <li>Visually map your business strategy.</li>
            <li>Identify key elements like value propositions, customer segments, and revenue streams.</li>
            <li>Evaluate and improve your business structure.</li>
          </ul>
          <p className="text-muted mt-4" style={{ fontSize: "0.9rem" }}>
            The Business Model Canvas is licensed by © Strategyzer AG, under CC BY-SA 3.0. This app is an adaptation and is distributed under the same license. 
            For details, see{" "}
            <a
              href="https://creativecommons.org/licenses/by-sa/3.0"
              target="_blank"
              rel="noopener noreferrer"
            >
              this page
            </a>.
          </p>
        </div>

        {/* Right Section */}
        <div className="col-md-6">
          <LoginComponent onError={setError} />
          {error && <p className="text-danger mt-3">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Landing;
