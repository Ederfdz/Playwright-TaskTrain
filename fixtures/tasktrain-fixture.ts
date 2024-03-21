import { test as base } from "@playwright/test";
import { RegisterPage } from "../pages/register-page"
import { SignInPage } from "../pages/sign-in-page";
import { ForgotPasswordPage } from "../pages/forgot-password-page"; 
import { NavOrganization } from "../pages/nav-organization";
import { ListPane } from "../pages/list-pane";
import { DetailsPane } from "../pages/details-pane";
import { NavUserMenu } from "../pages/nav-user-menu";
import { MyProfileDialog } from "../pages/my-profile-dialog";
import { OrgCreateDialog } from "../pages/org-create-dialog";
import { OrganizationSettings } from "../pages/organization-settings";

export const test = base.extend<{
    registerPage: RegisterPage; 
    signInPage: SignInPage;
    forgotPasswordPage: ForgotPasswordPage;
    navOrganization: NavOrganization;
    listPane: ListPane;
    detailsPane: DetailsPane;
    navUserMenu: NavUserMenu;
    myProfileDialog: MyProfileDialog;
    orgCreateDialog: OrgCreateDialog;
    organizationSettings: OrganizationSettings;
}>({
    // Define Fixture
    registerPage: async({ page }, use) => {
        await use(new RegisterPage(page));
    },
    signInPage: async({ page }, use) => {
        await use(new SignInPage(page));
    },
    forgotPasswordPage: async({ page }, use) => {
        await use(new ForgotPasswordPage(page));
    },
    navOrganization: async({ page }, use) => {
        await use(new NavOrganization(page));
    },
    listPane: async({ page }, use) => {
        await use(new ListPane(page));
    },
    detailsPane: async({ page }, use) => {
        await use(new DetailsPane(page));
    },
    navUserMenu: async({ page }, use) => {
        await use(new NavUserMenu(page));
    },
    myProfileDialog: async({ page }, use) => {
        await use(new MyProfileDialog(page));
    },
    orgCreateDialog: async({ page }, use) => {
        await use(new OrgCreateDialog(page));
    },
    organizationSettings: async({ page }, use) => {
        await use(new OrganizationSettings(page));
    },
});

export { expect } from '@playwright/test';




