import { test, expect } from "../fixtures/tasktrain-fixture";
import { generateRandomEmail } from "../utility";

// Clear cookies since user authentication not required for tests
test.use({ storageState: { cookies: [], origins: [] } });

// TEST HOOKS
test.beforeEach(async ({ page, signInPage }) => {
    // Go to Sign In Page
    await signInPage.visit();
});

// TESTS BEGIN
test.describe("Feature: User-Request Password Reset", () => {
  test.describe("Scenario: Show Request Password Reset form", () => {
    test("Clicking Forgot Password button on Sign In page redirects user to Forgot Password Reset screen", async ({ page, signInPage, forgotPasswordPage }) => {
        // Click on Forgot Paassword button
        await signInPage.forgotPasswordButton.click();
        // Assert user is redirected to Forgot Password Reset screen
        await page.waitForTimeout(200);
        await expect(page).toHaveURL('https://staging.tasktrain.app/auth/forgot-password');
        // Assert email text input field is visible and Send Reset Link button is disabled
        await expect(forgotPasswordPage.emailField).toBeVisible();
        await expect(forgotPasswordPage.sendResetLink).toBeDisabled();
    });
  });
  test.describe("Scenario: Enable/Disable Send Reset Link Button", () => {
    test("Entering a valid email will enable Send Reset Link button", async ({ page, signInPage, forgotPasswordPage }) => {
        // Click on Forgot Password button to go to Forgot Password Reset screen
        await signInPage.forgotPasswordButton.click();
        // Enter valid email
        await forgotPasswordPage.emailField.click();
        await page.keyboard.type('Trillian@Megadodo.com');
        // Assert Send Reset Link button is enabled
        await expect(forgotPasswordPage.sendResetLink).toBeEnabled();
    });
    test("Entering an invalid email will keep Send Reset Link button disabled", async ({ page, signInPage, forgotPasswordPage }) => {
        // Click on Forgot Password button to go to Forgot Password Reset screen
        await signInPage.forgotPasswordButton.click();
        // Enter invalid email
        await forgotPasswordPage.emailField.click();
        await page.keyboard.type('Trillian.com');
        // Assert Send Reset Link button is disabled
        await expect(forgotPasswordPage.sendResetLink).toBeDisabled();
    });
  });
  test.describe("Scenario: Request Password Reset Success/Failure", () => {
    test("Clicking Send Reset Link button with a registered email results in Success notification ", async ({ page, signInPage, forgotPasswordPage }) => {
        // Click on Forgot Password button to go to Forgot Password Reset screen
        await signInPage.forgotPasswordButton.click();
        // Enter valid email
        await forgotPasswordPage.emailField.click();
        await page.keyboard.type(`${process.env.TEST_EMAIL}`);
        // Click Send Reset Link button
        await forgotPasswordPage.sendResetLink.click();
        // Assert validation message appears
        await expect(page.getByText('Success')).toBeVisible();
    });
    test("Entering an unregistered email will keep Send Reset Link button disabled", async ({ page, signInPage, forgotPasswordPage }) => {
        // Click on Forgot Password button to go to Forgot Password Reset screen
        await signInPage.forgotPasswordButton.click();
        // Generate random email
        const email = await generateRandomEmail();
        // Enter unregistered email
        await forgotPasswordPage.emailField.click();
        await page.keyboard.type(`${email}`);
        // Click Send Reset Link button
        await forgotPasswordPage.sendResetLink.click();
        // Assert validation message appears
        await expect(page.getByText('Error')).toBeVisible();
    });
  });
});





