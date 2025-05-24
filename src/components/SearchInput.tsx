import styles from './SearchInput.module.scss';

type SearchInputProps = {
  value: string;
  onSearch: (value: string) => void;
};

export const SearchInput = ({ value, onSearch }: SearchInputProps) => {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Zoek op ..."
        autoFocus
        value={value}
        onChange={(e) => onSearch(e.target.value)}
      />
      <span className={styles.iconContainer}>
        <img
          src="/images/search.svg"
          alt=""
          aria-hidden
          className={styles.icon}
        />
      </span>
    </div>
  );
};
