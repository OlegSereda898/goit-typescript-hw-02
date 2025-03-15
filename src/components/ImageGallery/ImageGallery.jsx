import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

function ImageGallery({ images, onImageClick }) {
  if (images.length === 0) {
    return <p>No images to display</p>;
  }

  return (
    <ul className={css.list}>
      {images.map((image) => (
        <li className={css.item} key={image.id}>
          <div>
            <ImageCard image={image} onClick={() => onImageClick(image)} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ImageGallery;
