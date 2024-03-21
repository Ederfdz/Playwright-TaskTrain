/* Tests set to run serially to avoid collisions using .serial
PLEASE run tests ONE browser at a time to avoid collisions!
*/
import { test, expect } from "../fixtures/tasktrain-fixture";

// Using cookies from manual-auth.json to login with account 'qa-manual@ttexternship.com'
test.use({storageState: "./manual-auth.json"});

// TEST HOOKS
test.beforeEach(async ({ page, signInPage, navOrganization }) => {
  // Go to TaskTrain main page as an authenticated user and close tour window
  await signInPage.authenticatedUserLogin();
  // Close Ursa Minor org panel and open Megadodo org panel to access manuals
  await navOrganization.memberOrganizationButton.click();
  await navOrganization.ownerOrganizationButton.click();
});

/*
  BACKGROUND:
  Account qa-manual@ttexternship.com holds these Roles on Manuals in the "Ursa Minor" Organization:
			| MANUAL ROLE | MANUAL NAME |
			| OWNER       | Don't Panic |
			| MANAGER     | Keep Calm   |
			| WORKER      | Carry On    |
			| VIEWER      | Stay Frosty |
*/

//TESTS BEGIN
test.describe.serial('Feature: Manual-Delete', () => {

  test.describe("Scenario: Enable/ Disable 'Delete' Button/Menu", () => {
    test("Don't Panic Delete button should be enabled", async ({ navOrganization, detailsPane, page }) => {
      // Click on the Don't Panic manual
      await navOrganization.dontPanicManual.click();
      // Click on Actions tab in Details pane
      await detailsPane.actionsTab.click();
      // Assert Delete button in Actions tab is enabled
      await expect(detailsPane.deleteButton).toBeEnabled();
    });
    test("Keep Calm Delete button should be Disabled", async ({ page, navOrganization, detailsPane }) => {
      // Click on the Keep Calm manual
      await navOrganization.keepCalmManual.click();
      // Click on Actions tab in Details pane
      await detailsPane.actionsTab.click();
      // Assert Delete button in Actions tab is disabled
      await expect(detailsPane.deleteButton).toBeDisabled();
    });
    test("Carry ON Delete button should be Disabled", async ({ page, navOrganization, detailsPane }) => {
      // Click on the Carry On manual
      await navOrganization.carryOnManual.click();
      // Click on Actions tab in Details pane
      await detailsPane.actionsTab.click();
      // Assert Delete button in Actions tab is disabled
      await expect(detailsPane.deleteButton).toBeDisabled();
    });
    test("Stay Frosty Delete button should be Disabled", async ({ page, navOrganization, detailsPane }) => {
      // Click on the Stay Frosty manual
      await navOrganization.stayFrostyManual.click();
      // Click on Actions tab in Details pane
      await detailsPane.actionsTab.click();
      // Assert Delete button in Actions tab is disabled
      await expect(detailsPane.deleteButton).toBeDisabled();
    });
    test("Don't Panic Delete Menu Item should be enabled", async ({ page, navOrganization }) => {
      // Click on Don't Panic menu button
      await navOrganization.dontPanicMenu.click();
      // Assert Manual Menu Delete button is enabled
      await expect(navOrganization.manualMenuDeleteButton).not.toHaveClass(/disabled/);
    });
    test("Keep Calm Delete Menu Item should be Disabled", async ({ page, navOrganization }) => {
      // Click on Keep Calm menu button
      await navOrganization.keepCalmMenu.click();
      // Assert Manual Menu Delete button is enabled
      await expect(navOrganization.manualMenuDeleteButton).toHaveClass(/disabled/);
    });
    test("Carry On Delete Menu Item should be Disabled", async ({ page, navOrganization }) => {
      // Click on Carry On menu button
      await navOrganization.carryOnMenu.click();
      // Assert Manual Menu Delete button is enabled
      await expect(navOrganization.manualMenuDeleteButton).toHaveClass(/disabled/);
    });
    test("Stay Frosty Delete Menu Item should be Disabled", async ({ page, navOrganization }) => {
      // Click on Stay Frosty menu button
      await navOrganization.stayFrostyMenu.click();
      // Assert Manual Menu Delete button is enabled
      await expect(navOrganization.manualMenuDeleteButton).toHaveClass(/disabled/);
    });
  });
  
  test.describe("Scenario: Show Delete Button/Menu Tooltip", () => {
    test("Don't Panic button tooltip message", async ({ page, navOrganization, detailsPane }) => {
      // Click on the Don't Panic manual
      await navOrganization.dontPanicManual.click();
      // Click on Actions tab in Details pane
      await detailsPane.actionsTab.click();
      // Hover over delete button and assert "Delete Manual" tool tip message visible
      await page.waitForTimeout(500);
      await detailsPane.deleteButton.hover();
      await expect(detailsPane.authorizedToolTip).toBeVisible();        
    });
    test("Keep Calm button tooltip message", async ({ page, navOrganization, detailsPane }) => {
      // Click on the Keep Calm manual
      await navOrganization.keepCalmManual.click();
      // Click on Actions tab in Details pane
      await detailsPane.actionsTab.click();
      // Hover over delete button and assert "Manual Owner Role required to Delete a Manual" tool tip message visible
      await page.waitForTimeout(500);
      await detailsPane.deleteButton.hover();
      await expect(detailsPane.notAuthorizedToolTip).toBeVisible();   
    });
    test("Don't Panic Delete Menu Item Tooltip Message", async ({ page, navOrganization }) => {
      // Click on Don't Panic menu button
      await navOrganization.dontPanicMenu.click();
      // Hover over delete button and assert "Delete Manual" tool tip message visible
      await page.waitForTimeout(500);
      await navOrganization.manualMenuDeleteButton.hover();
      await expect(navOrganization.authorizedToolTip).toBeVisible();
    });
    test("Keep Calm Delete Menu Item Tooltip Message", async ({ page, navOrganization }) => {
      // Click on Keep Calm menu button
      await navOrganization.keepCalmMenu.click();
      // Hover over delete button and assert "Manual Owner Role required to Delete a Manual" tool tip message visible
      await page.waitForTimeout(500);
      await navOrganization.manualMenuDeleteButton.hover();
      await expect(navOrganization.notAuthorizedToolTip).toBeVisible();
    });
  });
  
  test.describe("Scenario: Show Delete Dialog", () => {
    test("Delete Button in the Manual-Actions Panel activates Delete Dialog", async ({ page, navOrganization, detailsPane }) => {
      // Click on the Don't Panic manual
      await navOrganization.dontPanicManual.click();
      // Click on Actions tab in Details pane
      await detailsPane.actionsTab.click();
      // Click Delete button in Actions tab
      await detailsPane.deleteButton.click();
      await page.waitForTimeout(500);
      // Assert Delete Manual Dialog is visible (Header, Label, Cancel & Delete buttons)
      await navOrganization.assertDeleteManualDialogIsVisible();
      // Assert Delete Manual Dialog buttons are enabled
      await navOrganization.assertDeleteManualDialogButtonsEnabled();
      
    });
    test("Delete Button in Manual Context Menu activates Delete Dialog", async ({ page, navOrganization }) => {
      // Click on Don't Panic menu button
      await navOrganization.dontPanicMenu.click();
      // Click on Manual Menu Delete button
      await navOrganization.manualMenuDeleteButton.click();
      // Assert Delete Manual Dialog is visible (Header, Label, Cancel & Delete buttons)
      await navOrganization.assertDeleteManualDialogIsVisible();
      // Assert Delete Manual Dialog buttons are enabled
      await navOrganization.assertDeleteManualDialogButtonsEnabled();
    });
    test("Pressing Delete key on keyboard activates Delete Dialog", async ({ page, navOrganization }) => {
      // Click on Don't Panic menu button
      await navOrganization.dontPanicMenu.click();
      // Press Delete key on keyboard
      await page.keyboard.press("Delete");
      // Assert Delete Manual Dialog is visible (Header, Label, Cancel & Delete buttons)
      await navOrganization.assertDeleteManualDialogIsVisible();
      // Assert Delete Manual Dialog buttons are enabled
      await navOrganization.assertDeleteManualDialogButtonsEnabled();
    });
    test("Pressing Backspace key on keyboard activates Delete Dialog", async ({ page, navOrganization }) => {
      // Click on Don't Panic menu button
      await navOrganization.dontPanicMenu.click();
      // Press Delete key on keyboard
      await page.keyboard.press("Backspace");
      // Assert Delete Manual Dialog is visible (Header, Label, Cancel & Delete buttons)
      await navOrganization.assertDeleteManualDialogIsVisible();
      // Assert Delete Manual Dialog buttons are enabled
      await navOrganization.assertDeleteManualDialogButtonsEnabled();
    });
  });
  
  test.describe("Scenario: Cancel Deletion", () => {
    test("Delete Dialog Should Dismiss after clicking Cancel button", async ({ page, navOrganization, detailsPane }) => {
      // Click on the Don't Panic manual
      await navOrganization.dontPanicManual.click();
      // Click on Actions tab in Details pane
      await detailsPane.actionsTab.click();
      await page.waitForTimeout(500);
      // Click Delete button in Actions tab
      await detailsPane.deleteButton.click();
      await page.waitForTimeout(500);
      // Click Cancel button in the Delete Manual Dialog
      await navOrganization.deleteManualDialogCancelButton.click();
      // Assert Delete Manual Dialog is NOT visible
      await expect(navOrganization.deleteManualDialogHeader).toBeHidden();
      await expect(navOrganization.deleteManualDialogLabel).toBeHidden();
    });
  });
  
  test.describe("Scenario: Confirm Deletion", () => {
    test.afterEach(async ({ page, navOrganization }) => {
      // Recreating the Don't Panic Manual to be available for other tests
      await navOrganization.createManual(`Don't Panic`);
    })
    
    test("Deleting Don't Panic manual", async ({ page, navOrganization, detailsPane }) => {
      // Click on the Don't Panic manual
      await navOrganization.dontPanicManual.click();
      // Click on Actions tab in Details pane
      await detailsPane.actionsTab.click();
      // Click Delete button in Actions tab
      await detailsPane.deleteButton.click();
      await page.waitForTimeout(500);
      // Click Delete button in Delete Manual Dialog
      await navOrganization.deleteManualDialogDeleteButton.click();
      // Assert Delete Manual Dialog is NOT visible
      await expect(navOrganization.deleteManualDialogHeader).toBeHidden();
      await expect(navOrganization.deleteManualDialogLabel).toBeHidden();
      // Assert Dont Panic Manual is no longer visible in Nav Manual panel
      await expect(navOrganization.dontPanicManual).toBeHidden();
    });
  });
})


