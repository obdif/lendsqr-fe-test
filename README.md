# Lendsqr Frontend Engineer Assessment

A frontend implementation of the Lendsqr Admin Console built as part of the Lendsqr engineering assessment. The app replicates core admin dashboard functionality including user management, filtering, and detailed user profiles.

**Live URL:** https://adekunle-blessing-lendsqr-fe-test.netlify.app/login  
**Repo:** https://github.com/obdif/lendsqr-fe-test

---

## Pages

- **Login** — accepts any email and password combination and redirects to the dashboard. No real authentication is applied; the form validates that both fields are filled before proceeding.
- **Dashboard (Users)** — displays 500 users fetched from a mock API, with pagination, column-level filtering, a skeleton loader while data loads, and a live user count above the table.
- **User Details** — shows full profile information for a selected user including personal info, education and employment, socials, and guarantors. User data is passed via React Router state and persisted in `localStorage` so the detail page survives a refresh.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React + Vite | UI framework and build tool |
| TypeScript | Language |
| SCSS Modules | Component-scoped styling |
| React Router v6 | Client-side routing |
| date-fns | Date formatting |
| lucide-react | Icons |
| Vitest + React Testing Library | Unit testing |
| Netlify | Hosting |

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/obdif/lendsqr-fe-test.git
cd lendsqr-fe-test

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npx vitest

# Build for production
npm run build
```

---

## Project Structure

```
src/
├── components/
│   ├── Layout.tsx          # Shared sidebar + topbar wrapper
│   ├── FilterPanel.tsx     # Inline filter popover with active state
│   └── SkeletonLoader.tsx  # Shimmer skeleton for the users page
├── mocks/
│   └── users.json          # 500-record mock user dataset
├── pages/
│   ├── Login.tsx
│   ├── Users.tsx
│   └── UserDetails.tsx
├── services/
│   └── user.service.ts     # Fetches and casts mock user data
├── styles/
│   ├── _variables.scss
│   ├── Layout.module.scss
│   ├── Login.module.scss
│   ├── Users.module.scss
│   ├── UserDetails.module.scss
│   ├── FilterPanel.module.scss
│   └── SkeletonLoader.module.scss
├── tests/
│   ├── setup.ts
│   ├── mockData.ts
│   └── filter.test.ts
└── types/
    └── user.ts             # All TypeScript interfaces
```

---

## Key Implementation Decisions

**Mock API with local JSON**  
The assessment called for mocking APIs using tools like mocky.io or json-generator.com. I opted to generate a 500-record dataset and serve it locally from `src/mocks/users.json`. This avoids network dependency during assessment review and keeps the data consistent across environments.

**User detail persistence**  
User data is passed to the detail page using React Router's `navigate` state (`navigate('/users/:id', { state: { user } })`), which avoids an unnecessary re-fetch. A copy is also written to `localStorage` so the page can recover the user if the state is lost on a hard refresh.

**Filtering**  
Filtering runs entirely on the client against the loaded dataset. The filter popover appears inline below each column header (matching the Figma design), closes on outside click, and shows an active indicator when filters are applied. All six fields — organization, username, email, phone, date joined, and status — can be combined in a single filter pass.

**Skeleton loader**  
Rather than a plain loading spinner or text, the users page renders a shimmer skeleton that mirrors the actual layout — four stat cards and ten table rows — while data is being fetched. The skeleton is a standalone component (`SkeletonLoader.tsx`) with its own SCSS module so it can be adjusted independently.

**User count**  
A count sits above the table at all times showing either "Showing all 500 users" or "Showing X of 500 users" when filters are active, giving the user immediate feedback on their filter results.

**Icons**  
Some icons in the Figma design are not available in lucide-react. In each case the closest semantic equivalent was used — the icon may look slightly different but communicates the same action or state.

---

## Tests

Tests cover the core filter logic with both positive and negative scenarios.

```bash
npx vitest
```

```
✓ src/tests/filter.test.ts (4 tests)
  ✓ returns only Active users when status is Active
  ✓ filters by username case-insensitively
  ✓ returns empty array when no user matches the filter
  ✓ returns all users when no filters are applied
```

---

## Notes

- The login page accepts **any email and password** — entering valid-looking credentials and submitting will redirect to the dashboard. There is no backend or auth logic.
- The app is fully responsive across mobile, tablet, and desktop breakpoints.