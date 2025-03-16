import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { ImageType } from "../App/App.types";

interface ImageGalleryProps {
  images: ImageType[];
  onImageClick: (image: ImageType) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onImageClick,
}) => {
  if (images.length === 0) {
    return <p>No images to display</p>;
  }

  return (
    <ul className={css.list}>
      {images.map((image) => (
        <li className={css.item} key={image.id}>
          <div className={css.content}>
            <ImageCard image={image} onClick={() => onImageClick(image)} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
