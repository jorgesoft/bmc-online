import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebaseConfig";
import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
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

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this business model?")) {
      return;
    }

    try {
      const docRef = doc(db, "businessModels", id);
      await deleteDoc(docRef);

      // Remove the deleted model from the state
      setBusinessModels((prevModels) => prevModels.filter((model) => model.id !== id));

      alert("Business model deleted successfully.");
    } catch (error) {
      console.error("Error deleting business model:", error);
      alert("Failed to delete business model.");
    }
  };

  const handleCreateNew = () => {
    if (businessModels.length >= 5) {
      alert("You can only create up to 5 canvases.");
      return;
    }
    navigate("/create");
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
          onClick={handleCreateNew} // Call the new function to check limit
        >
          Create New Business
        </button>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Business Name</th>
                <th scope="col">Hypothesis</th>
                <th scope="col" style={{ width: "100px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {businessModels.length === 0 ? (
                <tr>
                  <td colSpan={3}>No business models found. Create a new one!</td>
                </tr>
              ) : (
                businessModels.map((business) => (
                  <tr key={business.id}>
                    <td>
                      <button
                        className="btn btn-link text-decoration-none p-0"
                        onClick={() => navigate(`/editor/${business.id}`)}
                      >
                        {business.businessName}
                      </button>
                    </td>
                    <td
                      className="text-truncate"
                      style={{ maxWidth: "300px" }}
                      title={business.businessHypothesis || "No hypothesis provided."}
                    >
                      {business.businessHypothesis || "No hypothesis provided."}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(business.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
