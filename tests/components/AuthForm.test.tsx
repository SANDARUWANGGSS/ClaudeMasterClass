import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"

import AuthForm from "@/components/AuthForm"

describe("AuthForm", () => {
  it("renders login heading in login mode", () => {
    render(<AuthForm mode="login" />)
    expect(
      screen.getByRole("heading", { name: /log in to your account/i })
    ).toBeInTheDocument()
  })

  it("renders signup heading in signup mode", () => {
    render(<AuthForm mode="signup" />)
    expect(
      screen.getByRole("heading", { name: /sign up for an account/i })
    ).toBeInTheDocument()
  })

  it("renders email and password inputs", () => {
    render(<AuthForm mode="login" />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText("Password")).toBeInTheDocument()
  })

  it("shows 'Log In' button in login mode", () => {
    render(<AuthForm mode="login" />)
    expect(screen.getByRole("button", { name: "Log In" })).toBeInTheDocument()
  })

  it("shows 'Sign Up' button in signup mode", () => {
    render(<AuthForm mode="signup" />)
    expect(screen.getByRole("button", { name: "Sign Up" })).toBeInTheDocument()
  })

  it("toggles password visibility when clicking the toggle button", async () => {
    const user = userEvent.setup()
    render(<AuthForm mode="login" />)

    const passwordInput = screen.getByLabelText("Password")
    expect(passwordInput).toHaveAttribute("type", "password")

    await user.click(
      screen.getByRole("button", { name: /toggle password visibility/i })
    )
    expect(passwordInput).toHaveAttribute("type", "text")

    await user.click(
      screen.getByRole("button", { name: /toggle password visibility/i })
    )
    expect(passwordInput).toHaveAttribute("type", "password")
  })

  it("logs email and password on submit", async () => {
    const user = userEvent.setup()
    const spy = vi.spyOn(console, "log").mockImplementation(() => {})

    render(<AuthForm mode="login" />)

    await user.type(screen.getByLabelText(/email/i), "test@example.com")
    await user.type(screen.getByLabelText("Password"), "secret123")
    await user.click(screen.getByRole("button", { name: "Log In" }))

    expect(spy).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "secret123",
    })

    spy.mockRestore()
  })

  it("has a link to /signup in login mode", () => {
    render(<AuthForm mode="login" />)
    const link = screen.getByRole("link", { name: /sign up/i })
    expect(link).toHaveAttribute("href", "/signup")
  })

  it("has a link to /login in signup mode", () => {
    render(<AuthForm mode="signup" />)
    const link = screen.getByRole("link", { name: /log in/i })
    expect(link).toHaveAttribute("href", "/login")
  })
})
