import { useEffect } from "react";
import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { ImageType } from "../App/App.types";

interface ImageModalProps {
  image: ImageType | null;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!image) return null;

  return (
    <Modal
      isOpen={!!image}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      className="modal-content"
      overlayClassName="modal-overlay"
      closeTimeoutMS={200}
      ariaHideApp={false}
    >
      <div className={css.overlay} onClick={handleOverlayClick}>
        <div className={css.content} onClick={(e) => e.stopPropagation()}>
          <img
            className={css.img}
            src={image.urls.full}
            alt={image.alt_description}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
