import styles from './HeistCardSkeleton.module.css'

export default function HeistCardSkeleton() {
  return (
    <div className={styles.card} aria-hidden="true">
      <div className={styles.header}>
        <div className={`${styles.shimmer} ${styles.title}`} data-testid="skeleton-title" />
        <div className={`${styles.shimmer} ${styles.badge}`} data-testid="skeleton-badge" />
      </div>
      <div className={styles.description}>
        <div className={`${styles.shimmer} ${styles.line100}`} data-testid="skeleton-line" />
        <div className={`${styles.shimmer} ${styles.line90}`} data-testid="skeleton-line" />
        <div className={`${styles.shimmer} ${styles.line70}`} data-testid="skeleton-line" />
      </div>
      <div className={styles.meta}>
        <div className={`${styles.shimmer} ${styles.assignee}`} data-testid="skeleton-assignee" />
        <div className={`${styles.shimmer} ${styles.deadline}`} data-testid="skeleton-deadline" />
      </div>
    </div>
  )
}
