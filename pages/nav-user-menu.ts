import { Locator, Page, expect } from "@playwright/test";

export class NavUserMenu {
  //variables
  readonly page: Page;
  readonly navUserMenu: Locator;
  readonly myProfileButton: Locator;
  readonly createOrganizationButton: Locator;
  readonly signOutButton: Locator;

  //constructor
  constructor(page: Page) {
    this.page = page;
    this.navUserMenu = page.getByTestId("NavUser");
    this.myProfileButton = page.locator("#myProfileMenuItem");
    this.createOrganizationButton = page.locator("#createOrganizationMenuItem");
    this.signOutButton = page.locator("#signOutMenuItem");
  }

  //methods
  async openProfileDialog() {
    await this.page.waitForTimeout(1000);
    await this.navUserMenu.hover();
    await this.myProfileButton.click();
  }

  async openCreateOrgDialog() {
    await this.page.waitForTimeout(1000);
    await this.navUserMenu.hover();
    await this.createOrganizationButton.click();
  }
}
