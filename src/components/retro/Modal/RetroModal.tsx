import React from "react";
import "../../../styles/retro/RetroModal.css"; 

type Props = {
  onClose: () => void;
  onSelect: (path: string) => void;
};

const RetroModal: React.FC<Props> = ({ onClose, onSelect }) => {
  return (
    <div className="retro-modal-backdrop">
      <div className="retro-modal">
        <h2>Select a Project</h2>
        <button onClick={() => onSelect("/retroTrivia")}>Quizcade</button>
        <button onClick={() => {}}>???</button>
        <button onClick={() => {}}>???</button>
        <span className="close-btn" onClick={onClose}>X</span>
      </div>
    </div>
  );
};

export default RetroModal;
