import { Locator, Page, expect } from "@playwright/test";

export class NameOfPage {
    
    //variables
    readonly page: Page;
    readonly nameOfVariable: Locator;

    //constructor
    constructor(page: Page){
        this.page = page;
        this.nameOfVariable = page.getByTestId('');
    }

    //methods
    async visit(){
        await this.nameOfVariable.click();
    }
}
