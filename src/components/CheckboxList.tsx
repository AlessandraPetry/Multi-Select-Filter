import { useState } from 'react';
import styles from './CheckboxList.module.scss';
import clsx from 'clsx';

export const CheckboxList = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const options = [
    'Boek',
    'Film/Tv-serie',
    'Muziek',
    'Onbekend',
    'Dagboek',
    'Hoesje voor mobiele telefoon',
    'Kalender',
    'Muziek',
    'Onbekend',
    'Dagboek',
    'Hoesje voor mobiele telefoon',
    'Kalender',
  ];

  const toggleChecked = (item: string) => {
    setCheckedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <div className={styles.checkboxListContainer}>
      {options.map((item, index) => (
        <label
          key={item}
          htmlFor={index.toString()}
          className={clsx(styles.checkboxItem, {
            [styles.checked]: checkedItems.includes(item),
          })}
        >
          <input
            id={index.toString()}
            type="checkbox"
            className={styles.checkboxInput}
            checked={checkedItems.includes(item)}
            onChange={() => toggleChecked(item)}
          />
          {item}
        </label>
      ))}
    </div>
  );
};
