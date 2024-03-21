import { Locator, Page, expect } from "@playwright/test";
import { ListPane } from "./list-pane";
export class NavOrganization {
    
    //variables
    readonly listPane: ListPane;
    readonly page: Page;

    readonly navOrganizationButton: Locator; 
    readonly manageOrganizationButton: Locator;
    // Inboxes Panel
    // Manuals Panel
    readonly createManualButton: Locator;
    readonly createManualToolTip: Locator;
    readonly createManualDisabledToolTip: Locator;
    readonly manualRow: Locator;
    readonly newManualInputField: Locator;
    readonly manualMenuButton: Locator;
    readonly manualMenuRenameButton: Locator;
    readonly manualMenuDeleteButton: Locator;
    readonly deleteManualDialogHeader: Locator;
    readonly deleteManualDialogLabel: Locator;
    readonly deleteManualDialogCancelButton: Locator;
    readonly deleteManualDialogDeleteButton: Locator;

    // Organization Panel for multi-role account: qa-manual@ttexternship.com
    readonly memberOrganizationButton: Locator;
    readonly managerOrganizationButton: Locator;
    readonly ownerOrganizationButton: Locator;
    readonly memberCreateManualButton: Locator;
    readonly managerCreateManualButton: Locator;
    readonly ownerCreateManualButton: Locator;
    // Megadodo Panel
    readonly dontPanicManual: Locator;
    readonly dontPanicMenu: Locator;
    readonly carryOnManual: Locator;
    readonly carryOnMenu: Locator;
    readonly keepCalmManual: Locator;
    readonly keepCalmMenu: Locator;
    readonly stayFrostyManual: Locator;
    readonly stayFrostyMenu: Locator;
    readonly usesForTowelsManual: Locator;
    readonly usesForTowelsMenu: Locator;
    readonly untitledManual: Locator;
    readonly untitledManualMenu: Locator;
    readonly authorizedToolTip: Locator;
    readonly notAuthorizedToolTip: Locator;
    // Sirius Cybernetics Panel
    // Ursa Minor Panel
   
    //constructor
    constructor(page: Page){
    this.page = page;
    this.listPane = new ListPane(page);

    this.navOrganizationButton = page.getByTestId('NavOrganization');
    this.manageOrganizationButton = page.getByTestId("NavOrganization-Button-ManageOrganization");
    // Inboxes Panel
    // Manuals Panel
    this.createManualButton = page.getByTestId('NavLibrary-Button-CreateManual');
    this.createManualToolTip = page.getByText('Create Manual');
    this.createManualDisabledToolTip = page.getByText('Organization Owner or Manager Role required to Create a Manual');
    this.manualRow = page.getByTestId('NavLibrary-Row');
    this.newManualInputField = page.getByTestId('InplaceEditor-Input');
    this.manualMenuButton = page.getByTestId('NavLibrary-Button-ManualMenu');
    this.manualMenuRenameButton = page.getByLabel('Rename');
    this.manualMenuDeleteButton = page.getByLabel('Delete…');
    this.deleteManualDialogHeader = page.locator("div").filter({ hasText: /^Delete "Don't Panic"\?$/ });
    this.deleteManualDialogLabel = page.locator("div").filter({hasText:/^Delete the "Don't Panic" Manual, its Procedures, Content, & Assignments\?$/,});
    this.deleteManualDialogCancelButton = page.getByTestId('ConfirmationDialog-Button-Reject');
    this.deleteManualDialogDeleteButton = page.getByTestId('ConfirmationDialog-Button-Accept');


    // Organization Panel for multi-role account: qa-manual@ttexternship.com
    this.memberOrganizationButton = page.getByRole('button', { name: 'Ursa Minor' });
    this.managerOrganizationButton = page.getByRole('button', { name: 'Sirius Cybernetics' });
    this.ownerOrganizationButton = page.getByRole('button', { name: 'Megadodo' });
    this.memberCreateManualButton = page.getByLabel('Ursa Minor').getByTestId('NavLibrary-Button-CreateManual');
    this.managerCreateManualButton = page.getByLabel('Sirius Cybernetics').getByTestId('NavLibrary-Button-CreateManual');
    this.ownerCreateManualButton = page.getByLabel('Megadodo').getByTestId('NavLibrary-Button-CreateManual');
    // Megadodo Panel
    this.dontPanicManual = page.getByRole("button", {name: "Don't Panic",});
    this.dontPanicMenu = page.getByLabel('Megadodo').locator('tree-node-content').filter({ hasText: 'Don\'t Panic' }).getByTestId('NavLibrary-Button-ManualMenu');
    this.carryOnManual = page.getByRole("button", {name: "Carry On",});
    this.carryOnMenu = page.getByLabel('Megadodo').locator("tree-node-content").filter({ hasText: "Carry On" }).getByTestId("NavLibrary-Button-ManualMenu");
    this.keepCalmManual = page.getByRole("button", {name: "Keep Calm",});
    this.keepCalmMenu = page.getByLabel('Megadodo').locator("tree-node-content").filter({ hasText: "Keep Calm" }).getByTestId("NavLibrary-Button-ManualMenu");
    this.stayFrostyManual = page.getByRole("button", {name: "Stay Frosty",});
    this.stayFrostyMenu = page.getByLabel('Megadodo').locator("tree-node-content").filter({ hasText: "Stay Frosty" }).getByTestId("NavLibrary-Button-ManualMenu");
    this.usesForTowelsManual = page.getByRole("button", {name: "Uses for Towels",});
    this.usesForTowelsMenu = page.getByLabel('Megadodo').locator("tree-node-content").filter({ hasText: "Uses for Towels" }).getByTestId("NavLibrary-Button-ManualMenu");
    this.untitledManual = page.getByRole("button", {name: "Untitled Manual",});
    this.untitledManualMenu = page.getByLabel('Megadodo').locator("tree-node-content").filter({ hasText: "Untitled Manual" }).getByTestId("NavLibrary-Button-ManualMenu");
    this.authorizedToolTip = page.getByText("Delete Manual");
    this.notAuthorizedToolTip = page.getByText("Manual Owner Role required to Delete a Manual");
    // Sirius Cybernetics Panel
    // Ursa Minor Panel
    }

    //methods
    async assertDeleteManualDialogIsVisible(){
        await this.page.waitForTimeout(1500);
        await expect(this.deleteManualDialogHeader).toBeVisible();
        await expect(this.deleteManualDialogLabel).toBeVisible();
        await expect(this.deleteManualDialogCancelButton).toBeVisible();
        await expect(this.deleteManualDialogDeleteButton).toBeVisible();
    }
    async assertDeleteManualDialogButtonsEnabled(){
        await expect(this.deleteManualDialogDeleteButton).toBeEnabled();
        await expect(this.deleteManualDialogCancelButton).toBeEnabled();
    }
    
    async deleteManual() {
        if(await this.usesForTowelsManual.count() > 0) {
            await this.usesForTowelsMenu.first().click();
            await this.manualMenuDeleteButton.click();
            await this.deleteManualDialogDeleteButton.click();
            await this.page.goto('')
        } else if(await this.untitledManual.count() > 0){
            await this.untitledManualMenu.click();
            await this.manualMenuDeleteButton.click();
            await this.deleteManualDialogDeleteButton.click();
            await this.page.goto('')
        }
    };

    async createManual(manualName) {
        await this.ownerCreateManualButton.click();
        await this.newManualInputField.click();
        await this.page.keyboard.type(manualName);
        await this.page.keyboard.press(`Tab`);
    }
}
