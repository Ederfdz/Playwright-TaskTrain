import { test, expect } from "../fixtures/tasktrain-fixture";

// Using cookies from general-auth.json to login with account 'qa-account@ttexternship.com'
test.use({storageState: "./general-auth.json"});

// TEST HOOKS
test.beforeEach(async ({ page, signInPage, navUserMenu }) => {
    // Go to TaskTrain main page as an authenticated user and close tour window
    await signInPage.authenticatedUserLogin();
    //Clicking on the user profile dialog
    await navUserMenu.openProfileDialog();
});

// TESTS BEGIN
test.describe("Feature: User View Profile", () => {
  test.describe("Show User Profile Layout", () => {
    test("Checking User Profile Layout", async ({ page, myProfileDialog }) => {
      //Asserting the User Profile Dialog is visible
      await expect(myProfileDialog.profileDialog).toBeVisible();
      //Asserting all text fields are visible
      await expect(myProfileDialog.firstNameInput).toBeVisible();
      await expect(myProfileDialog.lastNameInput).toBeVisible();
      await expect(myProfileDialog.EmailInput).toBeVisible();
      //Asserting the Change Password and Delete User fieldsets are closed
      await expect(myProfileDialog.passwordUpdateButton).not.toBeInViewport();
      await expect(myProfileDialog.deleteButton).not.toBeInViewport({
        ratio: 0.5,
      });
    });
  });

  test.describe("Show User Profile Content", () => {
    test("Checking User Profile Content", async ({ page, myProfileDialog }) => {
      //Asserting the first name matches the assigned first name
      await expect(myProfileDialog.firstNameInput).toHaveValue("John");
      //Asserting the last name matches the assigned last name
      await expect(myProfileDialog.lastNameInput).toHaveValue("Doe");
      //Asserting the username matches the assigned username
      await expect(myProfileDialog.EmailInput).toHaveValue(`${process.env.TEST_EMAIL}`);
    });
  });

  test.describe("Show Change Password Layout", () => {
    test("Toggling open Change Password reveals Change Password layout", async ({ page, myProfileDialog }) => {
      //Toggle open the Change Password fieldset
      await myProfileDialog.changePasswordToggle.click();
      //Asserting Change Password text fields visible
      await expect(myProfileDialog.passwordInput).toBeVisible();
      await expect(myProfileDialog.passwordConfirmationInput).toBeVisible();
      //Asserting update password button exists
      await expect(myProfileDialog.passwordUpdateButton).toBeVisible();
    });
  });

  test.describe('Show "Delete..." Button', () => {
    test("Toggling open Delete User reveals a delete button", async ({ page, myProfileDialog }) => {
      //Toggle open the Delete User fieldset
      await myProfileDialog.deleteUserToggle.click();
      //Asserting delete button is visible
      await expect(myProfileDialog.deleteButton).toBeVisible();
    });
  });
});

