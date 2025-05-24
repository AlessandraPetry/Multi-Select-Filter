import clsx from 'clsx';
import styles from './CheckboxItem.module.scss';

type CheckboxItemProps = {
  checked?: boolean;
  id: string;
  label: string;
  onChange: (label: string) => void;
};

export const CheckboxItem = ({
  checked = false,
  id,
  label,
  onChange,
}: CheckboxItemProps) => {
  return (
    <label
      htmlFor={id}
      className={clsx(styles.checkboxItem, checked && styles.checked)}
    >
      <input
        id={id}
        type="checkbox"
        className={styles.checkboxInput}
        checked={checked}
        onChange={() => onChange(label)}
      />
      {label}
    </label>
  );
};
