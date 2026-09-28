# Pactap Admin Panel — Playwright Automation Framework

Playwright + TypeScript automation framework for the Pactap Admin Panel.
Focused scope: admin operations to activate freshly-signed-up supplier/buyer
profiles.

## Folder structure
## Setup

```bash
npm install
npx playwright install chromium
```

Then create `src/config/.env.stage` from `src/config/.env.example` and fill in:
- `ADMIN_EMAIL` — admin test account on stage
- `ADMIN_PASSWORD` — admin password

## Running tests

```bash
# All tests
npm test

# With browser visible
npm run test:headed

# Smoke tests only
npm run test:smoke

# Specific module
npm run test:login
npm run test:users

# UI mode (interactive debugging)
npm run test:ui
```

## Cross-framework usage

Once Phase 2 ships, the buyer/supplier frameworks can import and call
admin actions (e.g., to activate a freshly-signed-up account in their own
smoke tests). See `src/pages/users/users.page.ts` for the public API.