import Link from 'next/link'
import type { Heist } from '@/types/firestore'
import styles from './HeistCard.module.css'

interface HeistCardProps {
  heist: Heist
}

export default function HeistCard({ heist }: HeistCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Link href={`/heists/${heist.id}`} className={styles.titleLink}>
          {heist.title}
        </Link>
        {heist.finalStatus && (
          <span
            className={`${styles.badge} ${heist.finalStatus === 'success' ? styles.badgeSuccess : styles.badgeFailure}`}
          >
            {heist.finalStatus}
          </span>
        )}
      </div>
      <p className={styles.description}>{heist.description}</p>
      <div className={styles.meta}>
        <span className={styles.assignee}>
          {heist.assignedToCodename || 'Unassigned'}
        </span>
        <span className={styles.deadline}>
          {new Date(heist.deadline).toLocaleDateString()}
        </span>
      </div>
    </div>
  )
}
