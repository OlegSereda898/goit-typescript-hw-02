import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <div className={css.load}>
      <button className={css.button} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
