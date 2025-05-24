import { useState } from 'react';
import { Button } from './Button';
import { CheckboxList } from './CheckboxList';
import styles from './FilterBox.module.scss';
import { SearchInput } from './SearchInput';

export const FilterBox = () => {
  const [search, setSearch] = useState('');

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Productgroep</h1>
      <SearchInput value={search} onSearch={setSearch} />
      <CheckboxList search={search} />
      <Button />
    </div>
  );
};
