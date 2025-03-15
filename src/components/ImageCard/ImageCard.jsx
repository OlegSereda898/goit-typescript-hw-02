import css from "./ImageCard.module.css";

function ImageCard({ image, onClick }) {
  return (
    <div onClick={onClick}>
      <img
        className={css.img}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </div>
  );
}

export default ImageCard;
