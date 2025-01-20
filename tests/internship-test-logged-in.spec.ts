import { expect, test } from "@playwright/test";

//NOTE:
/**
 In front of you there are 3 Playwright automated tests. Your job is to run these 3 tests, review their output in the console and debug it.
 Each test contains up to 3 different mistakes, these range from syntax issues to logical. Your job is correct these so that all 3 test scenarios pass.
 Fixing a mistake and re-running the test will either show the next mistake in the specific scenario or pass the test.
 Pro tip, run your tests in Headed mode to see what's happening in live action https://playwright.dev/docs/running-tests#run-tests-in-headed-mode.
 Also, it might be a good idea to run each test individually, but that's up to you. If you feel confident enough to run all 3 in parallel, go for it.
 */

test("Navigate to valamar.com & validate page title", async ({ page }) => {
  const valamarURL = "https://valamar.com";
  await page.goto(valamarURL, { waitUntil: "domcontentloaded" });
  await expect(page).toHaveTitle(
    "Valamar Holiday Hotels & Resorts in Croatia and Austria",
    { timeout: 60000 }
  );
});

test("Navigate to valamar.com & click on Log in button", async ({ page }) => {
  const valamarURL = "https://valamar.com";
  await page.goto(valamarURL, { waitUntil: "domcontentloaded" });
  await page.locator('button[id="azureb2c-login"]').click({ timeout: 30000 });
  await page
    .locator('button[class="btn-vlm-primary w-full mt-6 app-button"]')
    .click();
  await expect(page).toHaveTitle("Sign up or sign in", { timeout: 60000 });
});

async function fetchData(url: string): Promise<Response> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    throw error;
  }
}

test("Validate ALL page URLs & Network response", async ({}) => {
  const urls = [
    "https://valamar.com",
    "https://www.rtl.hr/",
    "https://www.moemax.hr/",
    "https://optika-anda.com/",
    "https://www.suncanihvar.com/hr",
  ];

  console.log(`Total URLs to validate: ${urls.length}`);

  for (const url of urls) {
    console.log(`Validating URL: ${url}`);
    expect(url, "URL does NOT have the proper structure!").toContain(
      "https://"
    );

    const response = await fetchData(url);
    console.log(`Response status for ${url}: ${response.status}`);

    const statusCode = response.status;
    expect(statusCode, `Unexpected status code for ${url}!`).toBe(200);
  }
});

