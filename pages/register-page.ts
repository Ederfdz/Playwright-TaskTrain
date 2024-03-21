import { Locator, Page, expect } from "@playwright/test";
import { generateRandomEmail } from "../utility";

export class RegisterPage {
  //variables
  readonly page: Page;
  readonly registerForFreeButton: Locator;
  // Register Verification Page
  readonly registerEmailField: Locator;
  readonly registerVerifyButton: Locator;
  readonly registerHeader: Locator;
  // Register Dialog Page
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly organizationNameInput: Locator;
  readonly userEmailInput: Locator;
  readonly passwordInput: Locator;
  readonly passwordConfirmationInput: Locator;
  readonly verificationCodeInput: Locator;
  readonly registerButton: Locator;

  //constructor
  constructor(page: Page) {
    this.page = page;
    this.registerForFreeButton = page.getByText("Register for free"); //No data tt tour tag
    // Register Verification Page
    this.registerEmailField = page.getByTestId("UserRequestEmailVerification-Input-Email");
    this.registerVerifyButton = page.getByTestId("UserRegister-Button-Verify");
    this.registerHeader = page.getByRole("heading", { name: "Register" });
    // Register Dialog Page
    this.firstNameInput = page.getByTestId("UserRegister-Input-NameFirst");
    this.lastNameInput = page.getByTestId("UserRegister-Input-NameLast");
    this.organizationNameInput = page.getByTestId("UserRegister-Input-OrganizationName");
    this.userEmailInput = page.getByTestId("UserRegister-Input-Username");
    this.passwordInput = page.getByTestId("UserRegister-Input-Password");
    this.passwordConfirmationInput = page.getByTestId("UserRegister-Input-PasswordConfirm");
    this.verificationCodeInput = page.getByTestId("UserRegister-Input-VerificationCode");
    this.registerButton = page.getByTestId("UserRegister-Button-Register");
  }

  //methods
  async visit() {
    await this.page.goto("https://staging.tasktrain.app/auth/register");
  }

  async assertRegisterDialog() {
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.organizationNameInput).toBeVisible();
    await expect(this.userEmailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.passwordConfirmationInput).toBeVisible();
    await expect(this.registerButton).toBeVisible();
  }
  async registerUser(email) {
    await this.registerEmailField.click();
    await this.page.keyboard.type(email);
    await this.page.keyboard.press("Tab");
    await this.registerHeader.click();
    await this.registerVerifyButton.click();
    await this.page.waitForTimeout(2000);
  }

  async fillOutRegisterDialog(
    firstName,
    lastName,
    organization,
    password,
    passwordConfirm,
    verificationCode
  ) {
    await this.firstNameInput.click();
    await this.page.keyboard.type(firstName);
    await this.lastNameInput.click();
    await this.page.keyboard.type(lastName);
    await this.organizationNameInput.click();
    await this.page.keyboard.type(organization);
    await this.passwordInput.click();
    await this.page.keyboard.type(password);
    await this.passwordConfirmationInput.click();
    await this.page.keyboard.type(passwordConfirm);
    await this.verificationCodeInput.click();
    await this.page.keyboard.type(verificationCode);
    await this.page.keyboard.press("Tab");
  };

  async generateRandomProfile(){    
    // Go to Register page
    await this.visit();
    // Generate random email
    const email = await generateRandomEmail();
    // Enter email and click verify button to activate Register Dialog
    await this.registerUser(`${email}`);
  };
}
