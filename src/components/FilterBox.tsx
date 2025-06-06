import { useState } from 'react';
import { Button } from './Button';
import { CheckboxList } from './CheckboxList';
import styles from './FilterBox.module.scss';
import { SearchInput } from './SearchInput';
import { useDebounce } from '../hooks/useDebounce';
import { useFetch } from '../hooks/useFetch';
import { decodeHtmlEntities } from '../utils/decodeHtmlEntities';

export const FilterBox = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 600);

  const fetchItems = async () => {
    const res = await fetch('/items.json');
    if (!res.ok) throw new Error('Failed to fetch items');

    return res.json();
  };

  const { data, isLoading, isError } = useFetch('items', fetchItems);

  const items = (data?.data || []).map((item: string) =>
    decodeHtmlEntities(item)
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Productgroep</h1>
      <SearchInput value={search} onSearch={setSearch} />
      <CheckboxList
        isError={isError}
        isLoading={isLoading}
        items={items}
        search={debouncedSearch}
      />
      <Button />
    </div>
  );
};
