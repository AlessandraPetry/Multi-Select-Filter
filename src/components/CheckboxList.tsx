import { useState } from 'react';
import clsx from 'clsx';
import { useQuery } from '@tanstack/react-query';

import styles from './CheckboxList.module.scss';

type CheckboxListProps = {
  search: string;
};

const fetchItems = async () => {
  const res = await fetch('/items.json');
  if (!res.ok) throw new Error('Failed to fetch items');
  return res.json();
};

export const CheckboxList = ({ search }: CheckboxListProps) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

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
    data.data.filter((item: string) => !checkedItems.includes(item)),
    search
  );
  const filteredCheckedItems = filterListBySearch(checkedItems, search);

  const toggleChecked = (item: string) => {
    setCheckedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <div className={styles.checkboxListContainer}>
      {filteredCheckedItems.map((item: string, index: number) => (
        <label
          key={item}
          htmlFor={`${index.toString()} - ${item}`}
          className={clsx(styles.checkboxItem, styles.checked)}
        >
          <input
            id={`${index.toString()} - ${item}`}
            type="checkbox"
            className={styles.checkboxInput}
            checked
            onChange={() => toggleChecked(item)}
          />
          {item}
        </label>
      ))}

      {filteredItems.map((item: string, index: number) => (
        <label
          key={item}
          htmlFor={`${index.toString()} - ${item}`}
          className={clsx(styles.checkboxItem, {
            [styles.checked]: checkedItems.includes(item),
          })}
        >
          <input
            id={`${index.toString()} - ${item}`}
            type="checkbox"
            className={styles.checkboxInput}
            onChange={() => toggleChecked(item)}
          />
          {item}
        </label>
      ))}
    </div>
  );
};
