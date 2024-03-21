import { Locator, Page, expect } from "@playwright/test";

export class DetailsPane {
    
    //Variables
    readonly page: Page;
    //Info Tab
    readonly infoTab: Locator;
    readonly manualName: Locator;
    readonly manualDescription: Locator;
    readonly categorizationButton: Locator;
    readonly categorizationKeywords: Locator;
    readonly categorizationFunctions: Locator;
    readonly categorizationSectors: Locator;
    //Actions Tab
    readonly actionsTab: Locator;
    readonly deleteButton: Locator;
    readonly authorizedToolTip: Locator;
    readonly notAuthorizedToolTip: Locator;
    
    //Access Tab
    readonly manualAccessList: Locator;
    readonly userCell: Locator;
    readonly emailCell: Locator;
    readonly roleCell: Locator;
    //Assignment Summary Tab
    
    
    //Assignment Summary

    //

    //Constructor
    constructor(page: Page){
    this.page = page;
    //Info Tab
    this.infoTab = page.getByRole('tab', { name: 'Info' });
    this.manualName = page.getByTestId('ManualInfo-Input-Name');
    this.manualDescription = page.getByTestId('ManualInfo-Input');
    this.categorizationButton = page.getByRole('heading', { name: 'Categorization' });
    this.categorizationKeywords = page.getByTestId('ManualInfo-Chips-KeywordList');
    this.categorizationFunctions = page.getByTestId('ManualInfo-AutoComplete-FunctionList');
    this.categorizationSectors = page.getByTestId('ManualInfo-AutoComplete-SectorList');    
    //Actions Tab
    this.actionsTab = page.getByRole("tab", { name: "Actions" });
    this.deleteButton = page.getByTestId('ManualActions-Button-Delete');
    this.authorizedToolTip = page.getByText("Delete Manual");
    this.notAuthorizedToolTip = page.getByText("Manual Owner Role required to Delete a Manual");

    //Access Tab
    this.manualAccessList = page.getByTestId('ManualAccessList');
    this.userCell = page.locator(`(//td[@class='p-cell-data'])[1]`);
    this.emailCell = page.locator(`(//td[@class='p-cell-data'])[2]`);
    this.roleCell = page.locator('.tt-manual-role-column');
    //Assignment Summary Tab
    }

    //Methods
    async visit(){
        // await this.nameOfVariable.click();
    }
}
