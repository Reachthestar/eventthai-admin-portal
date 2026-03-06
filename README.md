# Event Thai Admin Portal

An administration portal for Event Thai, built with Next.js and the App Router. This application is designed to manage users, events, and other internal administrative tasks with a seamless, multilingual user interface supporting both English and Thai.

## 🚀 Tech Stack

This project is built using modern web development technologies to ensure performance, maintainability, and a great developer experience.

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI & Styling**:
  - [React 19](https://react.dev/)
  - [Tailwind CSS v4](https://tailwindcss.com/)
  - [Radix UI](https://www.radix-ui.com/) (Accessible headless components)
  - [Lucide React](https://lucide.dev/) (Icons)
- **State Management & Data Fetching**:
  - [Zustand](https://zustand-demo.pmnd.rs/) (Fast, scalable client-side state)
  - [TanStack Query (React Query)](https://tanstack.com/query/latest) (Server state management)
  - [Axios](https://axios-http.com/) (HTTP client)
- **Forms & Validation**:
  - [React Hook Form](https://react-hook-form.com/)
  - [Zod](https://zod.dev/) (Schema validation)
- **Internationalization (i18n)**:
  - [next-intl](https://next-intl-docs.vercel.app/)
- **Testing**:
  - [Playwright](https://playwright.dev/) (End-to-End Testing)
- **Deployment**:
  - Ready for [Cloudflare Pages](https://pages.cloudflare.com/) (`@cloudflare/next-on-pages`)

## 🛠 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed along with `pnpm`, which is the recommended package manager for this project.

### Installation

Clone the repository and install the dependencies:

```bash
pnpm install
```

### Running the Development Server

Start the development server:

```bash
pnpm dev
# or: npm run dev / yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Building for Production

To create an optimized production build:

```bash
pnpm build
```

To run the built application locally:

```bash
pnpm start
```

## 🧪 Testing

This project uses **Playwright** for end-to-end testing to ensure system reliability across browser environments.

To run the Playwright test suite, use the following commands:

```bash
# Run all tests in headless mode (perfect for CI)
npx playwright test
# or
pnpm exec playwright test

# Run tests interactively with the UI explorer
npx playwright test --ui

# Run tests in a specific browser only (e.g., chromium)
npx playwright test --project=chromium

# Generate and view the HTML test report
npx playwright show-report
```

## 📁 Project Structure Highlights

- **`src/app/`**: Next.js App Router structure, including `[locale]` for localized routes.
- **`src/components/`**: Reusable React components grouped by feature and UI primitives.
- **`messages/`**: Translation files (`en.json`, `th.json`) for internationalization content.
- **`src/stores/`**: Global state definitions using Zustand (e.g., authentication flow).
- **`src/i18n/`**: Setup for routing and Next-Intl configuration.
- **`src/lib/`**: Core utilities, standardized axios fetching instances, and helper functions.
