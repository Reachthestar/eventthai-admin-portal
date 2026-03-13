# ARCHITECTURE

## Project Structure

```bash
eventthai-admin-portal/
├── messages/                       # Internationalization (i18n) translation files
│   ├── en.json                     # English localization payloads
│   └── th.json                     # Thai localization payloads
│
├── public/                         # Static assets (images, fonts, favicons) served at `/`
│
├── src/                            # Main Application Source Code
│   ├── app/                        # Next.js App Router (Pages, Layouts, Routing)
│   │   ├── [locale]/               # Dynamic route segment handling i18n
│   │   │   ├── layout.tsx          # Root layout for language routing
│   │   │   ├── page.tsx            # Dashboard / Home page showing the user table
│   │   │   ├── login/              # Authentication Login Route
│   │   │   │   └── page.tsx        # Login view form
│   │   │   └── register/           # Authentication Registration Route
│   │   │       └── page.tsx        # Registration view form
│   │   └── globals.css             # Global stylesheet Tailwind v4
│   │
│   ├── components/                 # Reusable React Components
│   │   ├── ui/                     # Base UI building blocks (shadcn/ui components)
│   │   │   └── button.tsx, input.tsx, dialog.tsx, table.tsx, sidebar.tsx, etc.
│   │   ├── skeletons/              # Loading placeholder components
│   │   │   └── user-table-skeleton.tsx # Skeleton loader specifically for the user table
│   │   ├── edit-user-modal.tsx     # Modal form for editing user details
│   │   ├── delete-user-modal.tsx   # Modal confirmation for deleting users
│   │   ├── header.tsx              # Global navigation header component
│   │   ├── theme-provider.tsx      # Next-themes provider for dark/light mode
│   │   └── user-table.tsx          # Core feature component for displaying user data grid
│   │
│   ├── hooks/                      # Custom React Hooks
│   │   ├── apis/                   # React Query hooks bridging Axios API calls
│   │   │   ├── use-auth.tsx        # API hooks for login/register functions
│   │   │   └── use-users.ts        # API hooks for CRUD operations on users
│   │   ├── use-debounce.ts         # Utility hook for delaying rapid state changes for search
│   │   ├── use-mobile.ts           # Media query hook to detect mobile viewport sizes
│   │   └── use-toast.ts            # Hook to trigger toast notifications across the app
│   │
│   ├── i18n/                       # next-intl configuration and routing strategy
│   │   ├── config.ts               # Defines supported locales (en, th)
│   │   ├── navigation.ts           # Configures routing hooks (Link, useRouter) for i18n
│   │   └── request.ts              # Intercepts server requests to supply the correct messages
│   │
│   ├── lib/                        # Utility Functions and Library Configurations
│   │   ├── axios.ts                # Axios instance setup with interceptors & auth headers
│   │   ├── cookies.ts              # Helper functions for saving/reading auth tokens in cookies
│   │   └── utils.ts                # Generic utilities (e.g., tailwind-merge `cn` function)
│   │
│   ├── providers/                  # Global React Context Providers
│   │   └── query-provider.tsx      # Wrapper for React Query Client Provider
│   │
│   ├── schemas/                    # Zod Validation Schemas ensuring type safety
│   │   ├── edit-user-validation.ts # Zod schema for the edit user form
│   │   ├── login-schema.ts         # Zod schema for the login form
│   │   └── register-schema.ts      # Zod schema for the registration form
│   │
│   ├── stores/                     # Zustand Global State Management
│   │   └── auth-store.ts           # Manages global auth session & user context data
│   │
│   ├── tests/                      # E2E test files
│   │   └── test-login.spec.ts      # Playwright E2E test for user login flow testing
│   │
│   └── types/                      # Global TypeScript interface and type declarations
│       ├── auth.ts                 # Type definitions of auth API responses and user states
│       ├── pagination.ts           # Type definitions for API pagination metadata
│       └── users.ts                # Type definitions for User entity parameters
│
├── package.json                    # Project dependencies, scripts, and metadata
├── middleware.ts                   # Next.js Middleware handling i18n routing and Auth
├── next.config.ts                  # Next.js configuration and plugins (like next-intl)
├── eslint.config.mjs               # ESLint rules and config for code quality
├── playwright.config.ts            # Configuration for Playwright E2E tests
└── tailwind.config.* / postcss     # Styling tooling configuration (PostCSS + Tailwind)
```

## Future Improvements

```bash
src/
├── components/         # Stores only Global/Generic UI (e.g., shadcn/ui, layout)
│   ├── ui/
│   └── header.tsx
├── features/           # Separated by domain
│   └── users/          # User management feature
│       ├── components/ # Components specific to this feature
│       │   ├── user-table.tsx
│       │   ├── edit-user-modal.tsx
│       ├── api/        # Moved use-users.ts here
│       └── types.ts    # Moved types/users.ts here

```