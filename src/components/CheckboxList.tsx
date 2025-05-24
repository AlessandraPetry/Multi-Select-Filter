import { useQuery } from '@tanstack/react-query';

import styles from './CheckboxList.module.scss';
import { CheckboxItem } from './CheckboxItem';

import { useSelectedList } from '../hooks/useSelectedList';

type CheckboxListProps = {
  search: string;
};

const fetchItems = async () => {
  const res = await fetch('/items.json');
  if (!res.ok) throw new Error('Failed to fetch items');
  return res.json();
};

export const CheckboxList = ({ search }: CheckboxListProps) => {
  const { selectedItems, toggleSelectedItem } = useSelectedList();

  const filterListBySearch = (items: string[], search: string) => {
    return search
      ? items.filter((item) =>
          item.toLowerCase().includes(search.toLowerCase())
        )
      : items;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['items'],
    queryFn: fetchItems,
  });

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

  const filteredItems = filterListBySearch(
    data.data.filter((item: string) => !selectedItems.includes(item)),
    search
  );
  const filteredCheckedItems = filterListBySearch(selectedItems, search);

  return (
    <div className={styles.checkboxListContainer}>
      {filteredCheckedItems.map((item: string, index: number) => {
        const id = `${index.toString()} - ${item}`;
        return (
          <CheckboxItem
            key={id}
            checked
            id={id}
            label={item}
            onChange={() => toggleSelectedItem(item)}
          />
        );
      })}

      {filteredItems.map((item: string, index: number) => {
        const id = `${index.toString()} - ${item}`;
        return (
          <CheckboxItem
            key={id}
            id={id}
            label={item}
            onChange={() => toggleSelectedItem(item)}
          />
        );
      })}
    </div>
  );
};
