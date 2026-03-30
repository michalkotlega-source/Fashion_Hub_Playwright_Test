# FashionHub Playwright Tests

This repository contains Playwright tests for the FashionHub demo site.
The main test file is `tests/FashionHubTests.spec.ts`, and the reusable page actions are in `playwright-helper/fashion_helper.ts`.

## What is configured

- `playwright.config.ts` includes cross-browser configuration:
  - `chromium`
  - `firefox`
  - `webkit`
- retries up to 3 times for failed tests
- video is saved only for failed tests (`retain-on-failure`)
- shared `baseURL` loaded from `playwright-helper/env_loader.ts`

## Key files

- `tests/FashionHubTests.spec.ts` - main FashionHub login test
- `playwright-helper/fashion_helper.ts` - helper with `goToPage` and `login` actions
- `playwright-helper/env_loader.ts` - environment loader and URL config
- `config/env.json` - environment data and login credentials

## Environment configuration

The default environment is loaded from `config/env.json`.
Available `ENV` values:

- `local`
- `staging`
- `production`

Example `config/env.json`:

```json
{
  "env": "production",
  "baseUrls": {
    "local": "http://localhost:4000/fashionhub/",
    "staging": "https://staging-env/fashionhub/",
    "production": "https://pocketaces2.github.io/fashionhub/"
  },
  "credentials": {
    "username": "demouser",
    "password": "fashion123"
  }
}
```

## Running tests

1. Install dependencies:

```bash
npm install
npx playwright install
```

2. Run all tests:

```bash
npx playwright test
```

3. Run only the FashionHub login test:

```bash
npx playwright test tests/FashionHubTests.spec.ts
```

4. Run a specific browser project:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Set the environment before running

Windows PowerShell:

```powershell
$env:ENV = 'staging'
npx playwright test
```

Git Bash / Linux:

```bash
ENV=staging npx playwright test
```

## What `tests/FashionHubTests.spec.ts` verifies

- opens the FashionHub page
- clicks the `Account` button
- fills login data from `config/env.json`
- verifies the welcome message is visible

## Notes

- Video is retained only for failed tests.
- Test configuration uses 3 retries for more stable execution.
