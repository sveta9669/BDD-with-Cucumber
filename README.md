# BDD with Cucumber + Playwright

End-to-end UI test suite built with **Cucumber** (BDD) and **Playwright** (browser automation).

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Cucumber.js](https://cucumber.io/) | BDD framework — feature files & step definitions |
| [Playwright](https://playwright.dev/) | Browser automation |
| [Node.js](https://nodejs.org/) | Runtime |
| [GitHub Actions](https://github.com/features/actions) | CI/CD |

---

## Project Structure

```
BDD/
├── features/
│   ├── ui.feature                   # UI-1: Page title
│   ├── ui2_hero_heading.feature     # UI-2: Hero heading
│   ├── ui3_get_started.feature      # UI-3: Get Started navigation
│   ├── ui4_navbar_links.feature     # UI-4: Navbar links
│   └── ui5_search.feature           # UI-5: Search bar
├── tests/
│   └── step_definitions/
│       └── stepdefs.js              # All hooks + step definitions
├── .github/
│   └── workflows/
│       └── playwright.yml           # CI pipeline
├── cucumber.json                    # Cucumber configuration
└── package.json                     # Scripts & dependencies
```

---

## Setup

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium
```

---

## Running Tests

### Run all tests
```bash
npm run cucumber
```

### Run by tag

| Command | Tag | Scenarios |
|---|---|---|
| `npm run test:ui` | `@ui` | All 5 UI tests |
| `npm run test:smoke` | `@smoke` | UI-1, UI-2, UI-4 (critical checks) |
| `npm run test:navigation` | `@navigation` | UI-3, UI-5 (click & navigate) |

---

## Test Scenarios

| # | Feature | Tag | What it checks |
|---|---|---|---|
| UI-1 | Check page title | `@smoke @title` | Page title contains "Playwright" |
| UI-2 | Hero heading | `@smoke @heading` | Homepage h1 tagline is visible |
| UI-3 | Get Started navigation | `@navigation @get-started` | Button click lands on `/docs/intro` |
| UI-4 | Navbar links | `@smoke @navbar` | Docs & API links visible in nav |
| UI-5 | Search bar | `@navigation @search` | Search input appears after clicking Search |

---

## How It Works

All step definitions live in a **single file** (`tests/step_definitions/stepdefs.js`).  
Browser and page are managed with plain module-level variables — no custom World class needed:

```js
let browser, page;

BeforeAll(async () => { browser = await chromium.launch({ headless: true }); });
AfterAll(async () => { await browser.close(); });
Before(async () => { page = await (await browser.newContext()).newPage(); });
After(async () => { await page.close(); });
```

Each scenario gets a **fresh page** via the `Before` hook, and the browser is shared across the entire test run for speed.

---

## CI/CD

Tests run automatically on every **push** and **pull request** to `main`/`master` via GitHub Actions.

The pipeline:
1. Checks out the code
2. Installs Node.js dependencies
3. Installs Chromium via Playwright
4. Runs `npm run test:ui` (all `@ui` tagged tests)
5. Uploads the test report as an artifact
