import styles from "../styles/SkeletonLoader.module.scss";

export function SkeletonLoader() {
  return (
    <div className={styles.wrapper}>
      {/* Stat cards skeleton */}
      <div className={styles.statsGrid}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={styles.statCard}>
            <div className={`${styles.shimmer} ${styles.icon}`} />
            <div className={`${styles.shimmer} ${styles.label}`} />
            <div className={`${styles.shimmer} ${styles.value}`} />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className={styles.tableCard}>
        {/* Header */}
        <div className={styles.tableHeader}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`${styles.shimmer} ${styles.headerCell}`} />
          ))}
        </div>

        {/* Rows */}
        {Array.from({ length: 10 }).map((_, rowIdx) => (
          <div
            key={rowIdx}
            className={styles.tableRow}
            style={{ opacity: 1 - rowIdx * 0.07 }}
          >
            {Array.from({ length: 5 }).map((_, colIdx) => (
              <div
                key={colIdx}
                className={`${styles.shimmer} ${styles.cell}`}
              />
            ))}
            <div className={`${styles.shimmer} ${styles.badge}`} />
            <div className={`${styles.shimmer} ${styles.action}`} />
          </div>
        ))}
      </div>
    </div>
  );
}