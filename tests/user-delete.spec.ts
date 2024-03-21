import { test, expect } from "../fixtures/tasktrain-fixture";

// Using cookies from random-generated-auth.json to login with newly generated account that can be deleted
test.use({storageState: "./random-generated-auth.json"});

test.beforeEach(async ({ page, signInPage }) => {
    await signInPage.authenticatedUserLogin();
});

// TESTS BEGIN
test.describe('Feature: User-delete', () => {
    test.describe("Scenario: Show Delete Button Tooltip", () => {
      test("Hovering over Delete button reveals ToolTip", async ({ page, navUserMenu, myProfileDialog }) => {
        // Open My Profile dialog
        await navUserMenu.openProfileDialog();
        // Clicking the "Delete User" toggle button
        await myProfileDialog.deleteUserToggle.click();
        // Hover over the delete button
        await myProfileDialog.deleteButton.hover();
        // Assert 'Permanently Delete User' tool tip is visible
        await expect(myProfileDialog.deleteToolTip).toBeVisible();
      });
    });
    
    test.describe("Scenario: Show Delete User Confirmation Dialog", () => {
      test("Check Delete Confirmation Dialog is visible", async ({ page, navUserMenu, myProfileDialog }) => {
        // Open My Profile dialog
        await navUserMenu.openProfileDialog();
        // Clicking the "Delete User" toggle button
        await myProfileDialog.deleteUserToggle.click();
        // Clicking the delete button
        await myProfileDialog.deleteButton.click();
        // Assert that the delete confirmation dialog is visible
        await expect(myProfileDialog.confirmationDialogCancelButton).toBeVisible();
        await expect(myProfileDialog.confirmationDialogDeleteButton).toBeVisible();
      });
    });
    
    test.describe("Scenario: Cancel Deletion", () => {
      test("Check cancel button in Delete Confirmation Dialog works", async ({ page, navUserMenu, myProfileDialog }) => {
        // Open My Profile dialog
        await navUserMenu.openProfileDialog();
        // Clicking the "Delete User" toggle button
        await myProfileDialog.deleteUserToggle.click();
        // Clicking the delete button
        await myProfileDialog.deleteButton.click();
        //Clicking "Cancel" on confirmation dialog
        await myProfileDialog.confirmationDialogCancelButton.click();
        // Assert that the confirmation dialog is NOT visible
        await expect(myProfileDialog.confirmationDialogCancelButton).toBeHidden();
        await expect(myProfileDialog.confirmationDialogDeleteButton).toBeHidden();
      });
    });
    
    test.describe("Scenario: Confirm Deletion", () => {
      test("Delete the user account", async ({ page, navUserMenu, myProfileDialog }) => {
        // Open My Profile dialog
        await navUserMenu.openProfileDialog();
        // Deletes User Profile
        await myProfileDialog.deleteUserProfile();
        // Assert success message, taken back to register page
        await expect(page).toHaveURL('https://staging.tasktrain.app/auth/register');
        const confirmationMessage = page.getByText('Thank you for using TaskTrain');
        await expect(confirmationMessage).toBeVisible();
      });
    });
});
