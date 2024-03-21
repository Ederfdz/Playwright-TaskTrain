// PLEASE run tests ONE browser at a time to avoid collisions!
import { test, expect } from "../fixtures/tasktrain-fixture";

// Using cookies from manual-auth.json to login with account 'qa-manual@ttexternship.com'
test.use({storageState: "./manual-auth.json"});

// TEST HOOKS
test.beforeEach(async ({ page, signInPage, navOrganization }) => {
    // Go to TaskTrain main page as an authenticated user and close tour window
    await signInPage.authenticatedUserLogin();
    // Close Ursa Minor org panel and open Megadodo org panel
    await navOrganization.memberOrganizationButton.click();
    await navOrganization.ownerOrganizationButton.click();
});
test.afterEach(async ({ navOrganization }) => {
  // Test teardown: deletes any newly created manuals
    await navOrganization.deleteManual();
});

/*
  BACKGROUND: Account qa-manual@ttexternship.com Holds following accounts:

| Megadodo           | OWNER             | arthur@megadodo.com | Arthur     | Dent      |
| Sirius Cybernetics | MANAGER           | arthur@megadodo.com | Arthur     | Dent      |
| Ursa Minor         | MEMBER            | arthur@megadodo.com | Arthur     | Dent      |
*/

// TESTS BEGIN
test.describe.only("Feature: Manual Create", () => {
  test.describe("Scenario: Enable/Disable Create Manual Button", () => {
    test("Create Manual button is enabled for Megadodo Organization (Owner role)", async ({ navOrganization }) => {
      // Hover over create manual button and check if it is enabled
      await navOrganization.ownerCreateManualButton.hover();
      await expect(navOrganization.ownerCreateManualButton).toBeEnabled();
    });

    test("Create Manual button is enabled for Sirius Cybernetics Organization (Manager role)", async ({ navOrganization }) => {
      // Close Megadodo org panel
      await navOrganization.memberOrganizationButton.click();
      // Open the Sirius Cybernetics tab
      await navOrganization.managerOrganizationButton.click();
      //check if create manual button is enabled
      await expect(navOrganization.managerCreateManualButton).toBeEnabled();
    });

    test("Create Manual button is disabled for Ursa Minor Organization (Member role)", async ({ navOrganization }) => {
      // Check if create manual button is disabled
      await expect(navOrganization.memberCreateManualButton).toBeDisabled();
    });
  });

  test.describe("Scenario: Show Create Manual Button Tooltip", () => {
    test("Tool tip  appears for enabled Create Manual button 'Create Manual'", async ({ navOrganization, page }) => {
      // Hover over create manual button in the Megadodo org panel, timeout needed to allow hover action to execute properly
      await page.waitForTimeout(3000);
      await navOrganization.ownerCreateManualButton.hover();
      // Assert 'Create Manual' tooltip is visible
      await expect(navOrganization.createManualToolTip).toBeVisible();
    });

    test("Tool tip  appears for disabled Create Manual button 'Organization Owner or Manager Role required to Create a Manual'", async ({ navOrganization, page }) => {
      // Close Megadodo org panel and open Ursa Minor org panel
      await navOrganization.ownerOrganizationButton.click();
      await navOrganization.memberOrganizationButton.click();
      // Hover over the create manual button in the Ursa Minor org panel, timeout needed to allow hover action to execute properly
      await page.waitForTimeout(3000);
      await navOrganization.memberCreateManualButton.hover();
      // Assert 'Organization Owner or Manager Role required to Create a Manual' tooltip is visible
      await expect(navOrganization.createManualDisabledToolTip).toBeVisible();
    });
  });

test.describe.serial("SERIAL", () => {
  test.describe("Scenario: Create Manual", () => {
    test("Clicking Create Manual button creates a new manual", async ({ page, navOrganization }) => {
      // Clicking on the create manual button in the Megadodo org panel
      await navOrganization.ownerCreateManualButton.click();
      // Assert the new manual text input field is selected
      await expect(navOrganization.newManualInputField).toBeFocused();
      await page.keyboard.press("Enter");
      // Assert new Manual row is added to Manuals Library
      await expect(navOrganization.untitledManual).toBeVisible();
    });
  });

  test.describe("Scenario: Name New Manual", () => {
    test("Creating new Manual 'Uses for Towels' and checking info in Access Tab, ", async ({ navOrganization, listPane, detailsPane }) => {
      //Create Manual with name 'Uses for Towels'
      await navOrganization.createManual("Uses for Towels");
      //Checking for the correct name in the Nav-Breadcrumb panel
      await expect(listPane.breadcrumbManualLink).toBeVisible();
      await expect(listPane.breadcrumbManualLink).toContainText(
        "Uses for Towels"
      );
      //Check for the access tab to be selected
      await expect(detailsPane.manualAccessList).toBeVisible();
      //Assert 'Arthur Dent' in User cell
      await expect(detailsPane.userCell).toBeVisible();
      await expect(detailsPane.userCell).toHaveText(/Arthur Dent/);
      //Assert 'qa-manual@ttexternship.com' in Email cell
      await expect(detailsPane.emailCell).toBeVisible();
      await expect(detailsPane.emailCell).toHaveText(
        /qa-manual@ttexternship.com/
      );
      //Assert 'Owner' in Role cell
      await expect(detailsPane.roleCell).toBeVisible();
      await expect(detailsPane.roleCell).toHaveText(/Owner/);
    });
  });

  test.describe("Scenario: Display New Manual Default Info", () => {
    test("Asserting account info is displayed in Info tab", async ({ page, navOrganization, detailsPane }) => {
      //Create Manual with name 'Uses for Towels'
      await navOrganization.createManual("Uses for Towels");
      //Click on the Info tab
      await detailsPane.infoTab.click();
      //Check manual name "Uses for Towels"
      await expect(detailsPane.manualName).toBeVisible();
      //Check manual description
      await expect(detailsPane.manualDescription).toBeVisible();
      //Click on the categorization tab
      await detailsPane.categorizationButton.click();
      //Check Keywords field is visible
      await expect(detailsPane.categorizationKeywords).toBeVisible();
      //Check Functions field is visible
      await expect(detailsPane.categorizationFunctions).toBeVisible();
      //Check publishing tag in Sectors field
      const publishingTag = await page.getByLabel("Publishing");
      await expect(publishingTag).toBeVisible();
    });
  });
})

  
});




