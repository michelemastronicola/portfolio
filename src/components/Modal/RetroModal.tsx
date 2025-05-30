import React from "react";
import "../../styles/RetroModal.css"; 

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
        <button onClick={() => onSelect("/theme2")}>???</button>
        <button onClick={() => onSelect("/theme3")}>???</button>
        <span className="close-btn" onClick={onClose}>X</span>
      </div>
    </div>
  );
};

export default RetroModal;
