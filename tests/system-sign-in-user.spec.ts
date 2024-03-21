import { test, expect } from "../fixtures/tasktrain-fixture";

// Clear cookies since user authentication not required for tests
test.use({ storageState: { cookies: [], origins: [] } });

// TESTS BEGIN
test.describe("Feature: System Sign In", () => {
  test.describe("Scenario: Should redirect to Sign-In", () => {
    // All of these url paths should direct user to sign in screen
    test("User redirected to Sign In page when using url path: / ", async ({ page }) => {
      await page.goto("https://staging.tasktrain.app/");
      //Assert url path redirects to sign-in page
      await expect(page).toHaveURL("https://staging.tasktrain.app/auth/sign-in");
    });

    test("User redirected to Sign In page when using url path: /start/sign-in", async ({ page }) => {
      await page.goto("https://staging.tasktrain.app/start/sign-in");
      //Assert url redirects to sign-in page
      await expect(page).toHaveURL("https://staging.tasktrain.app/auth/sign-in");
    });

    test("User redirected to Sign In page when using url path: /any/arbitrary/url-path", async ({ page }) => {
      await page.goto("https://staging.tasktrain.app/any/arbitrary/url-path");
      //Assert url redirects to sign-in page
      await expect(page).toHaveURL("https://staging.tasktrain.app/auth/sign-in");
    });
  });

  test.describe("Scenario: Show Sign In Form Validation", () => {
    // Invalid entry by the user should show a validation message
    test("After entering malformed email address, validation message 'Please enter a valid e-mail address.' appears", async ({ page, signInPage }) => {
      // Go to Sign-in page
      await signInPage.visit();
      // Enter am invalid email address
      await signInPage.fillEmail("malformed@address");
      // Check that error message 'Please enter a valid e-mail address.' appears
      await expect(signInPage.emailValidationMessage).toBeVisible();
      await expect(signInPage.emailValidationMessage).toHaveText("Please enter a valid e-mail address.");
    });

    test("After entering Password < 11 characters, validation message 'Password must be 11 characters or longer' appears", async ({ page, signInPage }) => {
      // Go to Sign-in page
      await signInPage.visit();
      // Enter invalid # of characters for password, under 11 chars
      await signInPage.fillPassword("lessthan11");
      // Check that error message 'Password must be 11 characters or longer' appears
      await expect(signInPage.shortPasswordValidationMessage).toBeVisible();
      await expect(signInPage.shortPasswordValidationMessage).toHaveText("Password must be 11 characters or longer");
    });

    test("After entering Password > 222 characters, validation message 'Password must be 222 characters or shorter' appears", async ({ page, signInPage }) => {
      // Go to Sign-in page
      await signInPage.visit();
      // Enter invalid # of characters for password, over requirement
      await signInPage.fillPassword(
        "ffgdoiroirieionfrnrgierfndifhrn5iungurnhguirjncdrfvgbhgvfghbnjmnhgfdfgbhnbgfdsdfbhnjhbgfdfgbhnjmnjbcvbnikgjdinenfuwnduwnduwnusurinudincindindfnhdufhnuidfnhhuiffnffgdoiroirieionfrnrgierfndifhrn5iungurnhguirjncdrfvgbhgvfbnjjf"
      );
      //Check that error message 'Password must be 222 characters or shorter' appears
      await expect(signInPage.longPasswordValidationMessage).toBeVisible();
      await expect(signInPage.longPasswordValidationMessage).toHaveText("Password must be 222 characters or shorter");
    });

    test("After entering a non-complex password, validation message 'Password must contain at least 2 of: uppercase, lowercase, numeric, or non-alphabetic characters' appears", async ({ page, signInPage }) => {
      // Go to Sign-in page
      await signInPage.visit();
      // Enter a password that doesn't have at least 2 of: uppercase, lowercase, numeric, or non-alphabetic characters
      await signInPage.fillPassword("passswwoord");
      // Check that error message 'Password must contain at least 2 of: uppercase, lowercase, numeric, or non-alphabetic characters' appears
      await expect(signInPage.nonComplexPasswordValidationMessage).toBeVisible();
      await expect(signInPage.nonComplexPasswordValidationMessage).toHaveText("Password must contain at least 2 of: uppercase, lowercase, numeric, or non-alphabetic characters");
    });
  });

  test.describe("Scenario: Enable/Disable Sign In Button", () => {
    test("Sign In button remains disabled when email value is empty", async ({ page, signInPage }) => {
      // Go to Sign-in page
      await signInPage.visit();
      // Leave email field empty
      await signInPage.fillEmail(" ");
      // Enter a password
      await signInPage.fillPassword("Password123");
      // The sign in button should be disabled
      await expect(signInPage.signInButton).toBeDisabled();
    });

    test("Sign In button remains disabled when malformed email value is entered", async ({ page, signInPage }) => {
      // Go to Sign-in page
      await signInPage.visit();
      // Enter a malformed email
      await signInPage.fillEmail("malformed@address");
      // Enter a password
      await signInPage.fillPassword("Password123");
      // The sign in button should be disabled
      await expect(signInPage.signInButton).toBeDisabled();
    });

    test("Sign In button remains disabled when password is <11 chars", async ({ page, signInPage }) => {
      // Go to Sign-in page
      await signInPage.visit();
      // Enter a valid email
      await signInPage.fillEmail("valid@mail.pattern.hr");
      // Enter a password under 11 characters
      await signInPage.fillPassword("yellowjack");
      // The sign in button should be disabled
      await expect(signInPage.signInButton).toBeDisabled();
    });

    test("Sign In button remains disabled when password is >222 chars", async ({ page, signInPage }) => {
      // Go to Sign-in page
      await signInPage.visit();
      // Enter a valid email
      await signInPage.fillEmail("valid@mail.pattern.hr");
      // Enter a password over 222 characters
      await signInPage.fillPassword(
        "ffgdoiroirieionfrnrgierfndifhrn5iungurnhguirjncdrfvgbhgvfghbnjmnhgfdfgbhnbgfdsdfbhnjhbgfdfgbhnjmnjbcvbnikgjdinenfuwnduwnduwnusurinudincindindfnhdufhnuidfnhhuiffnffgdoiroirieionfrnrgierfndifhrn5iungurnhguirjncdrfvgbhgvfbnjjf"
      );
      // The sign in button should be disabled
      await expect(signInPage.signInButton).toBeDisabled();
    });
  });

  test.describe("Scenario: System Sign-In Failure", () => {
    // An error message should be shown when user tries to sign in with an incomplete username or incorrect password
    test("Sign In Failure validation message: Not Found: User", async ({ page, signInPage }) => {
      // Go to Sign-in page
      await signInPage.visit();
      // Enter invalid username
      await signInPage.fillEmail("Trillian@Megadodo.co");
      // Enter password
      await signInPage.fillPassword("mySecurePassw0rd");
      // Click the sign in button
      await signInPage.signInButton.click();

      /* Check that error message 'Not found: User' appears
         Feature file states that error message should read 'User not found', staging reads: 'Not found: User'
      */

      await expect(signInPage.userNotFoundErrorMessage).toBeVisible();
      await expect(signInPage.userNotFoundErrorMessage).toHaveText("Not found: User");
    });

    test("Sign In Failure validation message: Invalid username/password combination", async ({ page, signInPage }) => {
      // Go to Sign-in page
      await signInPage.visit();
      // Enter user name
      await signInPage.fillEmail("Trillian@Megadodo.com");
      // Enter incorrect password
      await signInPage.fillPassword("mySecurePassword");
      // Click the sign in button
      await signInPage.signInButton.click();

      /* Check that error message 'Not found: User' appears
         Feature file states that error message should read 'Incorrect password', staging reads: 'Invalid username/password combination'
      */
      await expect(signInPage.invalidPasswordErrorMessage).toBeVisible();
      await expect(signInPage.invalidPasswordErrorMessage).toHaveText("Invalid username/password combination");
    });
  });

  test.describe("Scenario: System Sign In Success", () => {
    test("redirectionSource: /", async ({ page, signInPage }) => {
      //Go to redirection source
      await page.goto("https://staging.tasktrain.app/");
      //Fill in valid login & check sign in button enabled
      await signInPage.fillEmail(`${process.env.TEST_EMAIL}`);
      await signInPage.fillPassword(`${process.env.TEST_PASSWORD}`);
      await signInPage.assertSignInButtonEnabled();
      // Click sign-in button
      await signInPage.signInButton.click();
      //Check user is redirected to main screen
      await page.waitForTimeout(1000);
      await expect(page).toHaveURL(/^https:\/\/staging\.tasktrain\.app\/main\/.*$/);
    });

    test("redirectionSource: /sign-in", async ({ page, signInPage }) => {
      //Go to redirection source
      await page.goto("https://staging.tasktrain.app/sign-in");
      //Fill in valid login & check sign in button enabled
      await signInPage.fillEmail(`${process.env.TEST_EMAIL}`);
      await signInPage.fillPassword(`${process.env.TEST_PASSWORD}`);
      await signInPage.assertSignInButtonEnabled();
      // Click sign-in button
      await signInPage.signInButton.click();
      //Check user is redirected to main screen
      await page.waitForTimeout(1000);
      await expect(page).toHaveURL(/^https:\/\/staging\.tasktrain\.app\/main\/.*$/);
    });

    test("redirectionSource: /main/library", async ({ page, signInPage }) => {
      //Go to redirection source
      await page.goto("https://staging.tasktrain.app/main/library");
      //Fill in valid login & check sign in button enabled
      await signInPage.fillEmail(`${process.env.TEST_EMAIL}`);
      await signInPage.fillPassword(`${process.env.TEST_PASSWORD}`);
      await signInPage.assertSignInButtonEnabled();
      // Click sign-in button
      await signInPage.signInButton.click();
      //Check user is redirected to main screen
      await page.waitForTimeout(1000);
      await expect(page).toHaveURL(/^https:\/\/staging\.tasktrain\.app\/main\/.*$/);
    });

    test("redirectionSource /invalid/url-path", async ({ page, signInPage }) => {
      //Go to redirection source
      await page.goto("https://staging.tasktrain.app/invalid/url-path");
      //Fill in valid login & check sign in button enabled
      await signInPage.fillEmail(`${process.env.TEST_EMAIL}`);
      await signInPage.fillPassword(`${process.env.TEST_PASSWORD}`);
      await signInPage.assertSignInButtonEnabled();
      // Click sign-in button
      await signInPage.signInButton.click();
      //Check user is redirected to main screen
      await page.waitForTimeout(1000);
      await expect(page).toHaveURL(/^https:\/\/staging\.tasktrain\.app\/main\/.*$/);
    });
  });
});

