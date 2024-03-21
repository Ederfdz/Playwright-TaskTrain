import { test, expect } from "../fixtures/tasktrain-fixture";

// Using cookies from general-auth.json to login with account 'qa-account@ttexternship.com'
test.use({storageState: "./general-auth.json"});

// TEST HOOKS
test.beforeEach(async ({ page, signInPage }) => {
  // Go to TaskTrain main page as an authenticated user and close tour window
  await signInPage.authenticatedUserLogin();
});

//TESTS BEGIN
test.describe("Feature: Session-Sign-Out-User", () => {
  test.describe("Scenario: Sign Out", () => {
    test("User signs out and redirected to sign in page", async ({ page, navUserMenu, signInPage }) => {
      // User hovers over user profile menu on the main screen
      await navUserMenu.navUserMenu.hover();
      // user clicks sign out button
      await navUserMenu.signOutButton.click();
      // Assert user is redirected to sign-in page
      await expect(signInPage.signInHeader).toBeVisible();
    });
  });
});
