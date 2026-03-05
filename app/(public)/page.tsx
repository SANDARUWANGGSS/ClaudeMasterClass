// this page should be used only as a splash page to decide where a user should be navigated to
// when logged in --> to /heists
// when not logged in --> to /login

import Link from "next/link"
import { Clock8, Target, Shield, Trophy } from "lucide-react"
import styles from "./page.module.css"

export default function Home() {
  return (
    <div className={styles.root}>
      <div className={styles.grid} />
      <div className={styles.spotlight} />
      <div className={styles.vignette} />
      <div className={styles.scanlines} />

      <div className={styles.container}>

        <header className={styles.hero}>
          <div className={styles.badge}>Operative Recruitment</div>
          <h1 className={styles.title}>
            P<Clock8 className={styles.clockIcon} strokeWidth={2.75} />cket Heist
          </h1>
          <p className={styles.tagline}>Steal the show. Leave no fingerprints.</p>
          <div className={styles.divider} />
        </header>

        <div className={styles.missions}>
          <div className={styles.missionCard}>
            <Target size={22} className={styles.missionIcon} />
            <h3>Daily Missions</h3>
            <p>
              Swipe a stapler, reroute a coffee order, plant a rubber duck on the
              CEO&apos;s chair. Fresh ops every day.
            </p>
          </div>
          <div className={styles.missionCard}>
            <Shield size={22} className={styles.missionIcon} />
            <h3>Covert Rankings</h3>
            <p>
              Complete missions without getting caught. Rise from Intern to
              Mastermind — the most cunning agent wins.
            </p>
          </div>
          <div className={styles.missionCard}>
            <Trophy size={22} className={styles.missionIcon} />
            <h3>Classified Badges</h3>
            <p>
              Unlock achievements only the boldest operatives can earn. Prove
              you leave no trace.
            </p>
          </div>
        </div>

        <div className={styles.cta}>
          <Link href="/signup" className={styles.registerBtn}>
            Accept Your First Mission
          </Link>
          <p className={styles.loginPrompt}>
            Already an operative?{" "}
            <Link href="/login" className={styles.loginLink}>Sign in</Link>
          </p>
        </div>

      </div>
    </div>
  )
}
