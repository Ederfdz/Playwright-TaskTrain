import { Locator, expect, Page } from "@playwright/test";

export class SignInPage {
  //variables
  readonly page: Page;

  readonly emailAddressField: Locator;
  readonly passwordField: Locator;
  readonly signInButton: Locator;
  readonly signInHeader: Locator;
  readonly forgotPasswordButton: Locator;
  readonly closeTourButton: Locator;
  //Validation messages
  readonly emailValidationMessage: Locator;
  readonly shortPasswordValidationMessage: Locator;
  readonly longPasswordValidationMessage: Locator;
  readonly nonComplexPasswordValidationMessage: Locator;
  //Sign-In Failure messages
  readonly userNotFoundErrorMessage: Locator;
  readonly invalidPasswordErrorMessage: Locator;

  //constructor
  constructor(page: Page) {
    this.page = page;

    this.emailAddressField = page.getByTestId("UserSignIn-Input-Username");
    this.passwordField = page.getByTestId("UserSignIn-Input-Password");
    this.signInButton = page.getByTestId("UserSignIn-Button-SignIn");
    this.signInHeader = page.getByRole("heading", { name: "Sign In" });
    this.forgotPasswordButton = page.getByTestId("UserSignIn-Button-ForgotPassword");
    this.closeTourButton = page.getByLabel("Close Tour");
    //Validation messages
    this.emailValidationMessage = page.getByText("Please enter a valid e-mail address.");
    this.shortPasswordValidationMessage = page.getByText("Password must be 11 characters or longer");
    this.longPasswordValidationMessage = page.getByText("Password must be 222 characters or shorter");
    this.nonComplexPasswordValidationMessage = page.getByText("Password must contain at least 2 of: uppercase, lowercase, numeric, or non-alphabetic characters");
    this.userNotFoundErrorMessage = page.getByText("Not found: User");
    this.invalidPasswordErrorMessage = page.getByText("Invalid username/password combination");
  }
  //methods
  async visit() {
    await this.page.goto("https://staging.tasktrain.app/auth/sign-in"); 
  }

  async authenticatedUserLogin() {
    await this.page.goto("https://staging.tasktrain.app/auth/sign-in");
    await this.page.waitForTimeout(500);
    await this.closeTour();
  }


  async fillPassword(string) {
    await this.passwordField.click();
    await this.page.keyboard.type(string);
  }

  async fillEmail(string) {
    await this.emailAddressField.click();
    await this.page.keyboard.type(string);
  }

  async assertSignInButtonEnabled() {
    await expect(this.signInButton).toBeEnabled();
  }

  async signInUser(email, password) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.signInButton.click();
  }

  async closeTour() {
    await this.page.waitForTimeout(3000);
    if (await this.closeTourButton.isVisible()) {
      await this.closeTourButton.click();
    }
  }
}
