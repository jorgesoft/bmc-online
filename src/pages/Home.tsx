import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebaseConfig"; // Firebase configuration
import { collection, getDocs, query, where } from "firebase/firestore";
import Navbar from "../components/Navbar";

interface BusinessModel {
  id: string;
  businessName: string;
  businessHypothesis: string;
}

const Home: React.FC = () => {
  const [businessModels, setBusinessModels] = useState<BusinessModel[]>([]);
  const navigate = useNavigate();

  const fetchBusinesses = async () => {
    try {
      if (!auth.currentUser) {
        console.error("No authenticated user.");
        return;
      }

      // Query Firestore for businesses belonging to the current user
      const q = query(
        collection(db, "businessModels"),
        where("userId", "==", auth.currentUser.uid)
      );

      const querySnapshot = await getDocs(q);
      const businesses: BusinessModel[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<BusinessModel, "id">),
      }));

      setBusinessModels(businesses);
    } catch (error) {
      console.error("Error fetching business models:", error);
      alert("Failed to load business models.");
    }
  };

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/"); // Redirect to landing page if unauthenticated
    } else {
      fetchBusinesses();
    }
  }, [navigate]);

  return (
    <>
    <Navbar /> 
    <div className="container mt-4">
      <h2>Your Business Models</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/create")}
      >
        Create New Business
      </button>
      <div className="list-group">
        {businessModels.length === 0 ? (
          <p>No business models found. Create a new one!</p>
        ) : (
          businessModels.map((business) => (
            <button
              key={business.id}
              className="list-group-item list-group-item-action"
              onClick={() => navigate(`/editor/${business.id}`)}
            >
              {business.businessName}
            </button>
          ))
        )}
      </div>
    </div>
    </>
  );
};

export default Home;
