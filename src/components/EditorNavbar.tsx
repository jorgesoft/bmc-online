import React from "react";
import { saveAs } from "file-saver";
import yaml from "js-yaml";
import { useNavigate } from "react-router-dom";

const EditorNavbar: React.FC<{
  businessName: string;
  setBusinessName: (name: string) => void;
  onSave: () => void;
  onLoad: (file: File) => void;
  businessModel: any;
}> = ({ businessName, setBusinessName, onSave, onLoad, businessModel }) => {
  const navigate = useNavigate();

  const handleExport = () => {
    try {
      const yamlData = yaml.dump(businessModel);
      const blob = new Blob([yamlData], { type: "application/x-yaml" });
      saveAs(blob, `${businessName || "business_model"}.yaml`);
    } catch (error) {
      console.error("Error exporting YAML:", error);
      alert("Failed to export YAML.");
    }
  };

  const handleLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) onLoad(file);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container-fluid">
        {/* Home Link */}
        <a
          className="navbar-brand text-primary fw-bold"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/home")}
        >
          Home
        </a>
        <div className="d-flex align-items-center">
          {/* Editable Name */}
          <label className="me-2 fw-bold">Name:</label>
          <input
            type="text"
            className="form-control me-3"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            style={{ width: "200px" }}
          />

          {/* Save Button with Dropdown */}
          <div className="btn-group">
            <button className="btn btn-success" onClick={onSave}>
              Save
            </button>
            <button
              type="button"
              className="btn btn-success dropdown-toggle dropdown-toggle-split"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu">
              <li>
                <label className="dropdown-item" style={{ cursor: "pointer" }}>
                  Load
                  <input
                    type="file"
                    accept=".yaml"
                    style={{ display: "none" }}
                    onChange={handleLoad}
                  />
                </label>
              </li>
              <li>
                <button className="dropdown-item" onClick={handleExport}>
                  Export
                </button>
              </li>
            </ul>
          </div>

          {/* Hypothesis Button */}
          <button
            className="btn btn-primary ms-3"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasSidebar"
            aria-controls="offcanvasSidebar"
          >
            Hypothesis
          </button>
        </div>
      </div>
    </nav>
  );
};

export default EditorNavbar;
