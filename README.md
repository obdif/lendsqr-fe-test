# Lendsqr Frontend Engineer Assessment

A frontend implementation of the Lendsqr Admin Console built as part of the Lendsqr engineering assessment. The app covers four pages — Login, Dashboard, Users, and User Details — and is fully responsive across mobile, tablet, and desktop.

**Live URL:** https://adekunle-blessing-lendsqr-fe-test.netlify.app/login  
**Repo:** https://github.com/obdif/lendsqr-fe-test

---

## Pages

- **Login** — accepts any email and password combination and redirects to the dashboard. The form validates that both fields are filled before submitting. No backend or auth logic is applied.
- **Dashboard** — a summary overview page built from mock data. The Figma provided only covers the Login, Users, and User Details pages — the Dashboard was identified as one of the intentionally omitted details in the brief and implemented independently. It includes stat cards, a monthly activity chart, loan portfolio breakdown, a recent users table, quick action buttons, and system alerts.
- **Users** — displays 500 users fetched from a mock API with pagination, column-level filtering, a shimmer skeleton loader while data is fetching, and a live user count above the table.
- **User Details** — shows the full profile of a selected user including personal info, education and employment, socials, and guarantors. Data is passed via React Router state and also persisted in `localStorage` so the page survives a hard refresh.

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
│   ├── Layout.tsx              # Shared sidebar + topbar wrapper
│   ├── FilterPanel.tsx         # Inline filter popover with active state
│   └── SkeletonLoader.tsx      # Shimmer skeleton for the users page
├── mocks/
│   ├── users.json              # 500-record mock user dataset
│   └── dashboardData.ts        # Mock data for dashboard stats and charts
├── pages/
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── Users.tsx
│   └── UserDetails.tsx
├── services/
│   └── user.service.ts         # Fetches and casts mock user data
├── styles/
│   ├── _variables.scss
│   ├── Layout.module.scss
│   ├── Login.module.scss
│   ├── Dashboard.module.scss
│   ├── Users.module.scss
│   ├── UserDetails.module.scss
│   ├── FilterPanel.module.scss
│   └── SkeletonLoader.module.scss
├── tests/
│   ├── setup.ts
│   ├── mockData.ts
│   └── filter.test.ts
└── types/
    └── user.ts                 # All TypeScript interfaces
```

---

## Key Implementation Decisions

**Dashboard page**  
The Figma design does not include a Dashboard — it only covers Login, Users, and User Details. However, the assessment brief explicitly lists Dashboard as one of the four required pages. This was treated as one of the intentionally omitted details candidates are expected to identify and address. The dashboard was designed to match the existing visual language of the app using the same colour tokens, card styles, and layout patterns.

**Mock API with local JSON**  
The assessment suggested mocky.io or json-generator.com for mocking APIs. A local JSON file at `src/mocks/users.json` was used instead. External mock services can go down or rate-limit, which would break the app during review — a local file keeps the data consistent and reliable across all environments.

**User detail persistence**  
User data is passed to the detail page via React Router's navigation state (`navigate('/users/:id', { state: { user } })`), which avoids an unnecessary re-fetch. A copy is also written to `localStorage` so the page can recover the user if the state is lost on a hard refresh.

**Filtering**  
Filtering runs entirely on the client against the loaded dataset. The filter popover appears inline below each column header icon, matching the Figma design. It closes on outside click and supports all six fields simultaneously — organization, username, email, phone, date joined, and status.

**Skeleton loader**  
Rather than a plain loading message, the users page renders a shimmer skeleton that mirrors the real layout — four stat cards and ten table rows — while data is being fetched. The skeleton is a standalone component with its own SCSS module.

**User count**  
A count sits above the users table at all times, showing either "Showing all 500 users" or "Showing X of 500 users" when filters are active. This gives immediate feedback on filter results.

**Icons**  
Some icons in the Figma design are not available in lucide-react. The closest semantic equivalent was used in each case — the icon may differ visually but communicates the same action.

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

- The login page accepts **any email and password** — fill in both fields and click Login to access the dashboard. There is no backend or auth logic.
- The app is fully responsive across mobile, tablet, and desktop breakpoints.