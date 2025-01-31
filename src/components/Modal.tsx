import React, {ReactNode} from "react";

interface ModalProps {
    children: ReactNode;
    onClose: () => void;
}

export default function Modal({ children: React.ReactNode, onClose }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <button onClick={onClose}>Close</button>
                {children}
            </div>
        </div>
    );
}
