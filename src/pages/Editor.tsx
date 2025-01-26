import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import yaml from "js-yaml";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Ensure dropdowns work
import EditorNavbar from "../components/EditorNavbar";
import HypothesisOffcanvas from "../components/HypothesisOffcanvas";
import NotesOffCanvas from "../components/NotesOffCanvas";
import "./Editor.css";

const Editor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [businessModel, setBusinessModel] = useState({
    businessName: "",
    keyPartnerships: "",
    keyActivities: "",
    keyResources: "",
    valuePropositions: "",
    customerRelationships: "",
    channels: "",
    customerSegments: "",
    costStructure: "",
    revenueStreams: "",
    businessHypothesis: "",
    keyAssumptions: "",
    notes: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusinessModel = async () => {
      try {
        if (!id) return;
        const docRef = doc(db, "businessModels", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBusinessModel(docSnap.data() as typeof businessModel);
        } else {
          alert("Business model not found!");
          navigate("/home");
        }
      } catch (error) {
        console.error("Error fetching business model:", error);
        alert("Failed to load business model.");
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessModel();
  }, [id, navigate]);

  const handleSave = async () => {
    try {
      if (!id) {
        alert("Invalid ID. Cannot save.");
        return;
      }

      const docRef = doc(db, "businessModels", id);
      await updateDoc(docRef, { ...businessModel });
      alert("Business model saved successfully!");
    } catch (error) {
      console.error("Error saving business model:", error);
      alert("Failed to save business model.");
    }
  };

  const handleLoad = async (file: File) => {
    try {
      const text = await file.text();
      const data = yaml.load(text);
      if (typeof data === "object") {
        setBusinessModel({ ...(data as typeof businessModel) });
        alert("YAML loaded successfully!");
      } else {
        throw new Error("Invalid YAML structure");
      }
    } catch (error) {
      console.error("Error loading YAML:", error);
      alert("Failed to load YAML.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <EditorNavbar
        businessName={businessModel.businessName}
        setBusinessName={(name) =>
          setBusinessModel({ ...businessModel, businessName: name })
        }
        businessModel={businessModel}
        onSave={handleSave}
        onLoad={handleLoad}
      />

      <HypothesisOffcanvas
        businessHypothesis={businessModel.businessHypothesis}
        keyAssumptions={businessModel.keyAssumptions}
        setBusinessHypothesis={(value) =>
          setBusinessModel({ ...businessModel, businessHypothesis: value })
        }
        setKeyAssumptions={(value) =>
          setBusinessModel({ ...businessModel, keyAssumptions: value })
        }
      />

      <NotesOffCanvas
        notes={businessModel.notes}
        setNotes={(value) => setBusinessModel({ ...businessModel, notes: value })}
        onSave={handleSave}
      />

      <div className="canvas-container">
        <div id="key-partnerships" className="canvas-section">
          <div className="canvas-title">
            <i className="bi bi-link"></i> Key Partnerships
          </div>
          <textarea
            value={businessModel.keyPartnerships}
            onChange={(e) =>
              setBusinessModel({ ...businessModel, keyPartnerships: e.target.value })
            }
          ></textarea>
        </div>
        <div id="key-activities" className="canvas-section">
          <div className="canvas-title">
            <i className="bi bi-lightning"></i> Key Activities
          </div>
          <textarea
            value={businessModel.keyActivities}
            onChange={(e) =>
              setBusinessModel({ ...businessModel, keyActivities: e.target.value })
            }
          ></textarea>
        </div>
        <div id="key-resources" className="canvas-section">
          <div className="canvas-title">
            <i className="bi bi-box"></i> Key Resources
          </div>
          <textarea
            value={businessModel.keyResources}
            onChange={(e) =>
              setBusinessModel({ ...businessModel, keyResources: e.target.value })
            }
          ></textarea>
        </div>
        <div id="value-propositions" className="canvas-section">
          <div className="canvas-title">
            <i className="bi bi-gift"></i> Value Propositions
          </div>
          <textarea
            value={businessModel.valuePropositions}
            onChange={(e) =>
              setBusinessModel({ ...businessModel, valuePropositions: e.target.value })
            }
          ></textarea>
        </div>
        <div id="customer-relationships" className="canvas-section">
          <div className="canvas-title">
            <i className="bi bi-heart"></i> Customer Relationships
          </div>
          <textarea
            value={businessModel.customerRelationships}
            onChange={(e) =>
              setBusinessModel({
                ...businessModel,
                customerRelationships: e.target.value,
              })
            }
          ></textarea>
        </div>
        <div id="channels" className="canvas-section">
          <div className="canvas-title">
            <i className="bi bi-truck"></i> Channels
          </div>
          <textarea
            value={businessModel.channels}
            onChange={(e) =>
              setBusinessModel({ ...businessModel, channels: e.target.value })
            }
          ></textarea>
        </div>
        <div id="customer-segments" className="canvas-section">
          <div className="canvas-title">
            <i className="bi bi-people"></i> Customer Segments
          </div>
          <textarea
            value={businessModel.customerSegments}
            onChange={(e) =>
              setBusinessModel({ ...businessModel, customerSegments: e.target.value })
            }
          ></textarea>
        </div>
        <div id="cost-structure" className="canvas-section">
          <div className="canvas-title">
            <i className="bi bi-cash-stack"></i> Cost Structure
          </div>
          <textarea
            value={businessModel.costStructure}
            onChange={(e) =>
              setBusinessModel({ ...businessModel, costStructure: e.target.value })
            }
          ></textarea>
        </div>
        <div id="revenue-streams" className="canvas-section">
          <div className="canvas-title">
            <i className="bi bi-graph-up-arrow"></i> Revenue Streams
          </div>
          <textarea
            value={businessModel.revenueStreams}
            onChange={(e) =>
              setBusinessModel({ ...businessModel, revenueStreams: e.target.value })
            }
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Editor;
