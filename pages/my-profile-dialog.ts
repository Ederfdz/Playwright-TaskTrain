import { Locator, Page, expect } from "@playwright/test";

export class MyProfileDialog {
  //variables
  readonly page: Page;
  readonly profileDialog: Locator;  
  // Update Profile
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly EmailInput: Locator;
  // Change Password
  readonly changePasswordToggle: Locator;
  readonly passwordInput: Locator;
  readonly passwordConfirmationInput: Locator;
  readonly passwordUpdateButton: Locator;
  // Delete User
  readonly deleteUserToggle: Locator;
  readonly deleteButton: Locator;
  readonly deleteToolTip: Locator;
  readonly confirmationDialogCancelButton: Locator;
  readonly confirmationDialogDeleteButton: Locator;

  //constructor
  constructor(page: Page) {
    this.page = page;

    this.profileDialog = page.getByTestId('UserProfile-Body');
    // Update Profile
    this.firstNameInput = page.locator(`input[placeholder='First Name']`);
    this.lastNameInput = page.locator(`input[placeholder='Last Name']`);
    this.EmailInput = page.locator(`input[placeholder='Username']`);
    // Change Password
    this.changePasswordToggle = page.getByLabel("Change Password");
    this.passwordInput = page.getByTestId("UserProfile-Input-Password");
    this.passwordConfirmationInput = page.getByTestId("UserProfile-Input-PasswordConfirm");
    this.passwordUpdateButton = page.getByTestId("UserProfile-Button-Update");
    // Delete User
    this.deleteUserToggle = page.getByLabel("Delete User"); //No data tt tour tag
    this.deleteButton = page.getByTestId("UserProfile-Button-Delete");
    this.deleteToolTip = page.getByText('Permanently delete User');
    this.confirmationDialogCancelButton = page.getByTestId("ConfirmationDialog-Button-Reject");
    this.confirmationDialogDeleteButton = page.getByTestId("ConfirmationDialog-Button-Accept");
  }

  //methods
  async deleteUserProfile() {
    await this.deleteUserToggle.click();
    await this.deleteButton.click();
    await this.confirmationDialogDeleteButton.click();
  }
}
