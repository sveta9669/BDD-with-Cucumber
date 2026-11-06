const { Given, When, Then, BeforeAll, AfterAll, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium, expect } = require('@playwright/test');

setDefaultTimeout(30 * 1000); 

// ─── Browser & page — plain module-level variables ────────────────────────────
let browser, page;

BeforeAll(async () => {
    browser = await chromium.launch({ headless: true });
});

AfterAll(async () => {
    await browser.close();
});

Before(async () => {
    const context = await browser.newContext();
    page = await context.newPage();
});

After(async () => {
    await page.close();
});

// ─── UI-1: Page title ─────────────────────────────────────────────────────────

Given('I am on the Playwright main page', async () => {
    await page.goto('https://playwright.dev/');
});

Then('I should see {string} in the page title', async (expectedTitle) => {
    await expect(page).toHaveTitle(new RegExp(expectedTitle));
});

// ─── UI-2: Hero Heading ───────────────────────────────────────────────────────

Then('I should see the heading {string}', async (headingText) => {
    await expect(page.getByRole('heading', { name: headingText, exact: false })).toBeVisible();
});

// ─── UI-3: Get Started Navigation ────────────────────────────────────────────

When('I click the {string} button', async (buttonText) => {
    await page.getByRole('link', { name: buttonText, exact: true }).first().click();
});

Then('the URL should contain {string}', async (urlPart) => {
    await expect(page).toHaveURL(new RegExp(urlPart));
});

// ─── UI-4: Navbar Links ───────────────────────────────────────────────────────

Then('I should see a navbar link with text {string}', async (linkText) => {
    await expect(
        page.getByRole('navigation').getByRole('link', { name: linkText, exact: true }).first()
    ).toBeVisible();
});

// ─── UI-5: Search ─────────────────────────────────────────────────────────────

When('I click the search button', async () => {
    await page.getByRole('button', { name: 'Search' }).click();
});

Then('a search input should be visible', async () => {
    await expect(page.getByRole('searchbox')).toBeVisible();
});
