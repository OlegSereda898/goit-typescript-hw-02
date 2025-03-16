import css from "./ImageCard.module.css";
import { ImageType } from "../App/App.types";

interface ImageCardProps {
  image: ImageType;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  return (
    <div className={css.content} onClick={onClick}>
      <img
        className={css.img}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </div>
  );
};

export default ImageCard;
