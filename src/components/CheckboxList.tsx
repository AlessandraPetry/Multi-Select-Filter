import styles from './CheckboxList.module.scss';
import { CheckboxItem } from './CheckboxItem';

import { useSelectedList } from '../hooks/useSelectedList';
import { useFilteredList } from '../hooks/useFilteredList';

type CheckboxListProps = {
  isError: boolean;
  isLoading: boolean;
  items: string[];
  search: string;
};

export const CheckboxList = ({
  isError,
  isLoading,
  items,
  search,
}: CheckboxListProps) => {
  const { selectedItems, toggleSelectedItem } = useSelectedList();

  const filteredItems = useFilteredList(
    items.filter((item: string) => !selectedItems.includes(item)),
    search
  );
  const filteredCheckedItems = useFilteredList(selectedItems, search);

  if (isLoading) {
    return (
      <div className={styles.checkboxListContainer}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className={styles.skeletonItem}></div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.checkboxListContainer}>
        <p className={styles.errorMessage}>Failed to load items.</p>
      </div>
    );
  }

  return (
    <div className={styles.checkboxListContainer}>
      {filteredCheckedItems.map((item: string) => (
        <CheckboxItem
          key={item}
          checked
          id={item}
          label={item}
          onChange={() => toggleSelectedItem(item)}
        />
      ))}

      {filteredItems.map((item: string) => (
        <CheckboxItem
          key={item}
          id={item}
          label={item}
          onChange={() => toggleSelectedItem(item)}
        />
      ))}
    </div>
  );
};
