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

export default LoadMore;
