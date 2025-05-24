import { Button } from './Button';
import { CheckboxList } from './CheckboxList';
import styles from './FilterBox.module.scss';
import { SearchInput } from './SearchInput';

export const FilterBox = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Productgroep</h1>
      <SearchInput />
      <CheckboxList />
      <Button />
    </div>
  );
};
