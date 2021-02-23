import styles from '../styles/components/CompletedChallenges.module.css';

export function CompletedChallenges() {
  return (
    <div className={styles.compChallenContainer}>
      <span>Desafios completos</span>
      <span>4</span>
    </div>
  );
}