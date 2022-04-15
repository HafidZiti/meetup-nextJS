import PropTypes from "prop-types";
import styles from "./LoadMore.module.css";

function LoadMore({ onClick, isLoading }) {
  return (
    <div className={styles.btnContainer}>
      {!isLoading ? (
        <button className={styles.btn} onClick={onClick}>
          Load more
        </button>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

LoadMore.propTypes = {
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default LoadMore;
