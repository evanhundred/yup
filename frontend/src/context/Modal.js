import { createContext, useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
};

export const ShowPhotoModal = ({ onClose, children }) => {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="show-biz-photo-modal">
      <div id="modal-background" onClick={onClose} />
      <div id="show-biz-photo-modal-content">{children}</div>
    </div>,
    modalNode
  );
};
