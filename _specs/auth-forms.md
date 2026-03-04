# Spec for Authentication Forms

branch: claude/feature/auth-forms
figma_component (if used): N/A

## Summary

Add functional login and signup forms to the `/login` and `/signup` pages. Each form includes email and password fields, a toggle to show/hide the password, and a submit button. On submission, form data is logged to the console (no real auth yet). Users can easily navigate between the two forms via a link.

## Functional Requirements

- The `/login` page renders a login form with:
  - An email input field (type email)
  - A password input field (type password) with a show/hide toggle icon
  - A "Log In" submit button
  - A link to the `/signup` page ("Don't have an account? Sign up")
- The `/signup` page renders a signup form with:
  - An email input field (type email)
  - A password input field (type password) with a show/hide toggle icon
  - A "Sign Up" submit button
  - A link to the `/login` page ("Already have an account? Log in")
- The password field toggles between `type="password"` and `type="text"` when the show/hide icon is clicked
- On form submission, the form values (email and password) are logged to the browser console
- Default form submission is prevented (no page reload)
- Both forms use the existing global CSS classes and theme colours

## Figma Design Reference (only if referenced)

N/A

## Possible Edge Cases

- User submits with empty fields — form should still log (browser validation optional)
- Password toggle icon should be accessible (keyboard focusable, aria-label)
- Rapid toggling of password visibility should not break the field value
- Navigating between login and signup should not retain field values

## Acceptance Criteria

- [ ] `/login` page renders a form with email, password, and submit button
- [ ] `/signup` page renders a form with email, password, and submit button
- [ ] Password field has a functional show/hide toggle icon
- [ ] Submitting either form logs `{ email, password }` to the console
- [ ] Page does not reload on form submission
- [ ] Each page has a working link to the other auth page

## Open Questions

- Should the show/hide icon use an existing icon library (e.g. lucide-react) or a custom SVG?
- Should we add any client-side validation (e.g. email format, password length) at this stage?
- Should both forms live as shared components or remain as page-level JSX for now?

## Testing Guidelines

Create a test file(s) in the `./tests` folder for the new feature, and create meaningful tests for the following cases, without going too heavy:

- Login form renders email field, password field, and submit button
- Signup form renders email field, password field, and submit button
- Clicking the show/hide toggle changes the password input type
- Submitting the login form calls console.log with the entered values
- Submitting the signup form calls console.log with the entered values
- The link from login to signup is present and points to `/signup`
- The link from signup to login is present and points to `/login`
