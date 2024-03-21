// PLEASE run tests ONE browser at a time to avoid collisions!
import { test, expect } from "../fixtures/tasktrain-fixture";

// Using cookies from general-auth.json to login with account 'qa-account@ttexternship.com'
test.use({storageState: "./general-auth.json"});

// Test HOOKS
test.beforeEach(async ({ page, signInPage }) => {
    // Go to TaskTrain main page as an authenticated user and close tour window
    await signInPage.authenticatedUserLogin();
});
test.afterEach(async ({ page, organizationSettings }) => {
    // Reset display name to original test account name after test runs
    await organizationSettings.resetDisplayName( `${process.env.TEST_FIRST}`,`${process.env.TEST_LAST}`);
});

// TESTS BEGIN
test.describe("Feature: Account Update Display Name", () => {
  test.describe("Scenario: Update Display Name", () => {
    test("Change display name to Arthur Dent", async ({ page, navOrganization, organizationSettings }) => {
      // Click on Organization Settings button
      await navOrganization.manageOrganizationButton.click();
      // Change Display Name to 'Arthur Dent'
      await organizationSettings.updateDisplayName("Arthur Dent");
      // Assert Display Name has been changed to Arthur Dent
      await expect(organizationSettings.displayNameInput).toHaveValue("Arthur Dent");
    });
  });
});