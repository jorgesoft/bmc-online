import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebaseConfig"; // Import Firebase config
import { addDoc, collection } from "firebase/firestore";
import Navbar from "../components/Navbar";

const CreateBusiness: React.FC = () => {
  const [businessName, setBusinessName] = useState("");
  const [businessHypothesis, setBusinessHypothesis] = useState("");
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!businessName) {
      alert("Business name is required!");
      return;
    }

    try {
      const newBusiness = {
        businessName,
        businessHypothesis,
        keyPartnerships: "",
        keyActivities: "",
        keyResources: "",
        valuePropositions: "",
        customerRelationships: "",
        channels: "",
        customerSegments: "",
        costStructure: "",
        revenueStreams: "",
        userId: auth.currentUser?.uid, // Associate business with current user
        createdAt: new Date().toISOString(), // Optional timestamp
      };

      // Save to Firestore
      await addDoc(collection(db, "businessModels"), newBusiness);

      // Redirect to home
      navigate("/home");
    } catch (error) {
      console.error("Error creating business model:", error);
      alert("Failed to create business model. Please try again.");
    }
  };

  return (
    <>
    <Navbar /> 
    <div className="container mt-4">
      <h2>Create New Business Model</h2>
      <div className="mb-3">
        <label htmlFor="businessName" className="form-label">
          Business Name
        </label>
        <input
          type="text"
          className="form-control"
          id="businessName"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="businessHypothesis" className="form-label">
          Business Hypothesis (doesn't need to be accurate)
        </label>
        <textarea
          className="form-control"
          id="businessHypothesis"
          rows={3}
          value={businessHypothesis}
          onChange={(e) => setBusinessHypothesis(e.target.value)}
        ></textarea>
      </div>
      <button className="btn btn-primary" onClick={handleSave}>
        Save
      </button>
    </div>
    </>
  );
};

export default CreateBusiness;
