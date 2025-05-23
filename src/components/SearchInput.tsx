import styles from './SearchInput.module.scss';

export const SearchInput = () => {
  return (
    <div className={styles.searchContainer}>
      <input type="text" placeholder="Zoek op ..." autoFocus />
      <button type="submit" className={styles.iconButton} aria-label="Zoek">
        <img src="/images/search.svg" alt="" className={styles.icon} />
      </button>
    </div>
  );
};
