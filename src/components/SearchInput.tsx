import { useState } from 'react';
import styles from './SearchInput.module.scss';

type SearchInputProps = {
  value: string;
  onSearch: (value: string) => void;
};

export const SearchInput = ({ value, onSearch }: SearchInputProps) => {
  const [input, setInput] = useState(value);

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Zoek op ..."
        autoFocus
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearch(input);
          }
        }}
      />
      <button
        type="submit"
        className={styles.iconButton}
        aria-label="Zoek"
        onClick={() => onSearch(input)}
      >
        <img src="/images/search.svg" alt="" className={styles.icon} />
      </button>
    </div>
  );
};
