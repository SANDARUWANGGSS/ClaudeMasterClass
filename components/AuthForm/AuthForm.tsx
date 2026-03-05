"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import styles from "./AuthForm.module.css"

interface AuthFormProps {
  mode: "login" | "signup"
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const isLogin = mode === "login"

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log({ email, password })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className="form-title">
        {isLogin ? "Log in to Your Account" : "Sign Up for an Account"}
      </h1>

      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="password">Password</label>
        <div className={styles.passwordWrapper}>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className={styles.toggleBtn}
            aria-label="Toggle password visibility"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <button type="submit" className={styles.submitBtn}>
        {isLogin ? "Log In" : "Sign Up"}
      </button>

      <p className={styles.switchLink}>
        {isLogin ? (
          <>
            Don&apos;t have an account?{" "}
            <Link href="/signup">Sign up &rarr;</Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login">Log in &rarr;</Link>
          </>
        )}
      </p>
    </form>
  )
}
