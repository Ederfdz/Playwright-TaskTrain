import { Locator, Page, expect } from "@playwright/test";

export class OrganizationSettings {
  //variables
  readonly page: Page;

  // Info
  // My Account
  readonly displayNameInput: Locator;

  // Email Notifications

  // Delete Organization
  readonly deleteOrganizationToggle: Locator;
  readonly deleteOrganizationButton: Locator;
  readonly deleteOrganizationDialogConfirm: Locator;
  // Leave Organization

  // Access
  readonly accessToggle: Locator;
  // Billing

  //constructor
  constructor(page: Page) {
    this.page = page;
    // Info
    // My Account
    this.displayNameInput = page.locator("#displayNameInput");

    // Email Notifications

    // Delete Organization
    this.deleteOrganizationToggle = page.getByLabel('Delete Organization');
    this.deleteOrganizationButton = page.getByTestId('OrganizationInfo-Button-DeleteOrganization');
    this.deleteOrganizationDialogConfirm = page.getByTestId('ConfirmationDialog-Button-Accept');
    // Leave Organization

    // Access
    this.accessToggle = page.getByRole('button', { name: ' Access' });
    // Billing

    // Email Notifications

    // Delete Organization

    // Leave Organization

    // Access

    // Billing
  }

  //methods
  async updateDisplayName(string) {
    await this.displayNameInput.clear();
    await this.displayNameInput.click();
    await this.page.keyboard.type(string);
    await this.page.keyboard.press("Tab");
  }

  async resetDisplayName(firstName, lastName) {
    await this.page.waitForTimeout(1000);
    await this.displayNameInput.clear();
    await this.displayNameInput.click();
    await this.page.keyboard.type(`${firstName} ${lastName}`);
    await this.page.keyboard.press("Tab");
  }

  async deleteOrganization() {
    await this.page.waitForTimeout(1000);
    await this.deleteOrganizationToggle.click();
    await this.deleteOrganizationButton.click();
    await this.deleteOrganizationDialogConfirm.click();
  }


}
