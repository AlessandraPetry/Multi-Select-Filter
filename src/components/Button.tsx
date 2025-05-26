import styles from './Button.module.scss';

export const Button = () => {
  return (
    <button className={styles.button} onClick={() => alert('Filtering...')}>
      Toepassen
    </button>
  );
};
