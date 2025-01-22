import React from "react";

interface HypothesisOffcanvasProps {
  businessHypothesis: string;
  keyAssumptions: string;
  setBusinessHypothesis: (value: string) => void;
  setKeyAssumptions: (value: string) => void;
}

const HypothesisOffcanvas: React.FC<HypothesisOffcanvasProps> = ({
  businessHypothesis,
  keyAssumptions,
  setBusinessHypothesis,
  setKeyAssumptions,
}) => {
  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex={-1}
      id="offcanvasSidebar"
      aria-labelledby="offcanvasSidebarLabel"
    >
      <div className="offcanvas-header">
        <h5 id="offcanvasSidebarLabel">Hypothesis & Assumptions</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <div className="mb-3">
          <i className="bi bi-lightbulb"></i>
          <strong>
            <label htmlFor="business-hypothesis" className="form-label">
              Business Hypothesis
            </label>
          </strong>
          <textarea
            id="business-hypothesis"
            className="form-control"
            rows={3}
            value={businessHypothesis}
            onChange={(e) => setBusinessHypothesis(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <i className="bi bi-list-task"></i>
          <strong>
            <label htmlFor="key-assumptions" className="form-label">
              Key Assumptions
            </label>
          </strong>
          <textarea
            id="key-assumptions"
            className="form-control"
            rows={3}
            value={keyAssumptions}
            onChange={(e) => setKeyAssumptions(e.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default HypothesisOffcanvas;
