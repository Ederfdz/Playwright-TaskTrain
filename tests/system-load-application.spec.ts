import { test, expect } from "../fixtures/tasktrain-fixture";

// Clear cookies since user authentication not required for tests
test.use({ storageState: { cookies: [], origins: [] } });

//TESTS BEGIN
test.describe("Feature: System-Load Application", () => {
  test.describe("Scenario: Show Start Page", () => {
    test("User browses to application URL and sees sign in page", async ({ page, signInPage }) => {
      //User browses to application url and can see the sign-in page
      await page.goto("https://staging.tasktrain.app/");
      await expect(signInPage.signInHeader).toBeVisible();
    });
  });
});
