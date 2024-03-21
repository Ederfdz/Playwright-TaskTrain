import { Locator, Page, expect } from "@playwright/test";

export class ListPane {
    
    //variables
    readonly page: Page;
    // Main Section List Pane
    readonly breadcrumbHomelink: Locator
    readonly breadcrumbOrgLink: Locator;
    readonly breadcrumbManualLink: Locator;
    readonly proceduresButton: Locator;
    readonly assignmentsButton: Locator;
    //Procedures
    readonly showCardViewButton: Locator;
    readonly showArchivedProceduresButton: Locator;
    readonly filterProceduresButton: Locator;
    readonly searchProceduresTextButton: Locator;
    readonly createProcedureButton: Locator;
    //Assignments
    readonly openAssignmentsButton: Locator;
    readonly closedAssignmentsButton: Locator;
    readonly searchAssignmentsTextButton: Locator;
    readonly sortAssignmentsButton: Locator;
    readonly createAssignmentButton: Locator;


    //constructor
    constructor(page: Page){
    this.page = page;
    // Main Section List Pane
    this.breadcrumbOrgLink = page.locator('li#Organization');
    this.breadcrumbManualLink = page.locator('li#Manual');
    this.breadcrumbHomelink = page.locator('li#Home');
    //Procedures
    this.showCardViewButton = 
    this.showArchivedProceduresButton = 
    this.filterProceduresButton = 
    this.searchProceduresTextButton = 
    this.createProcedureButton = page.getByTestId("ProcedureList-Button-CreateProcedure");
    //Assignments

    }

    //methods
    async visit(){
        // await this.nameOfVariable.click();
    }
}
