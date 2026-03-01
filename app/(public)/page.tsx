// this page should be used only as a splash page to decide where a user should be navigated to
// when logged in --> to /heists
// when not logged in --> to /login

import { Clock8 } from "lucide-react"

export default function Home() {
  return (
    <div className="center-content">
      <div className="page-content">
        <h1>
          P<Clock8 className="logo" strokeWidth={2.75} />cket Heist
        </h1>
        <div>Tiny missions. Big office mischief.</div>
        <p className="intro-text">
          Welcome to Pocket Heist — the ultimate game of sneaky office shenanigans.
          Complete covert missions, outsmart your coworkers, and rise through the ranks
          of the most daring desk agents in the building. Are you ready to pull off the
          perfect heist?
        </p>
        <p className="intro-text">
          Every day brings a new set of challenges: swipe a stapler from the supply
          closet, reroute a colleague&apos;s coffee order, or plant a rubber duck on the
          CEO&apos;s chair. Earn points, unlock badges, and prove you&apos;re the most
          cunning agent in the office.
        </p>
        <p className="intro-text">
          Whether you&apos;re a seasoned prankster or a first-time operative, Pocket Heist
          has a mission for you. Gather your crew, study the floor plan, and remember —
          the best heists leave no trace.
        </p>
      </div>
    </div>
  )
}
