# Hongda Backend And Database TODO

## Completed Checks

- [x] `POST /api/auth/register` writes a new user into MySQL `users`
- [x] `POST /api/auth/login` creates the `hongda_session` cookie
- [x] `GET /api/auth/me` returns the logged-in user from the session cookie
- [x] `POST /api/auth/logout` clears the session cookie

## Next Tasks

1. Protect `/account` and related member pages with the real session.
   - [x] Redirect unauthenticated users to `/login`
   - [x] Preserve the original target path so login can return users to the requested page

2. Show real login state in the navbar.
   - [x] Replace the fixed login button when a user is signed in
   - [x] Add a logout action wired to `/api/auth/logout`

3. Build real member profile backend functions.
   - [x] Create an API to update `name`, `birthday`, `phone`, and `gender`
   - [x] Replace static member settings content with database-backed React UI

4. Add password recovery and reset flow.
   - [x] Create reset token storage in MySQL
   - [x] Add forgot-password and reset-password APIs
   - [x] Enforce token expiry and one-time use

5. Add role-aware admin authentication and authorization.
   - [x] Separate member and admin entry rules
   - [x] Restrict admin pages and admin APIs by `role`

6. Add core business models to Prisma and MySQL.
   - [x] `Course`
   - [x] `Order`
   - [x] `Article`
   - [x] `Quiz`
   - [x] Supporting relation tables as needed

7. Replace static member and course pages with database-backed pages.
   - [x] Account dashboard
   - [x] Purchased courses
   - [x] Orders
   - [x] Quiz history

8. Add local seed data and setup helpers.
   - [x] Admin seed account
   - [x] Demo member account
   - [x] Sample courses, articles, and orders

9. Clean up corrupted text content and response copy.
   - [x] Fix mojibake in auth pages and API messages
   - [x] Normalize Traditional Chinese copy across the main React routes

10. Add automated checks for auth and database flows.
   - [x] API integration tests for register/login/logout
   - [x] Validation tests for duplicate email and bad credentials
