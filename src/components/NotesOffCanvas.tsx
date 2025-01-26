import React from "react";

interface NotesOffcanvasProps {
  notes: string;
  setNotes: (value: string) => void;
  
onSave: () => void; // Function to trigger saving to Firebase
}

const NotesOffcanvas: React.FC<NotesOffcanvasProps> = ({
  notes,
  setNotes,
}) => {
  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex={-1}
      id="offcanvasNotes"
      aria-labelledby="offcanvasNotesLabel"
    >
      <div className="offcanvas-header">
        <h5 id="offcanvasNotesLabel">Notes</h5>
        <button
          
type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <textarea
          className="form-control"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
    </div>
  );
};

export default NotesOffcanvas;
