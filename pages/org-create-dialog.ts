import { Locator, Page, expect } from "@playwright/test";

export class OrgCreateDialog {   
    //variables
    readonly page: Page;
    //General
    readonly NameField: Locator;
    readonly EmailField: Locator;
    readonly DescriptionField: Locator;
    readonly SectorField: Locator;
    readonly cancelButton: Locator;
    readonly createOrgButton: Locator;
    //Plans
    readonly freightPaymentPlan: Locator;
    //Payment
    readonly cardHolderNameField: Locator;
    readonly cardNumberField: Locator;
    readonly cardExpirationField: Locator;
    readonly cardCvcField: Locator;
    readonly cardPostalField: Locator;
    


    //constructor
    constructor(page: Page){
    this.page = page;
    //General
    this.NameField = page.getByTestId('OrganizationCreate-Input-OrganizationName')
    this.EmailField = page.getByTestId('OrganizationCreate-Input-Email');
    this.DescriptionField = page.getByTestId('OrganizationCreate-Input-Description');
    this.SectorField = page.getByTestId('OrganizationCreate-Input-Sector');
    this.cancelButton = page.getByTestId('OrganizationCreate-Button-Cancel');
    this.createOrgButton = page.getByTestId('OrganizationCreate-Button-Create');
    //Plans
    this.freightPaymentPlan = page.getByText('Freight');
    //Payment
    this.cardHolderNameField = page.getByTestId('OrganizationBillingPayment-Input-CardHolderName');
    this.cardNumberField = page.getByTestId('OrganizationBillingPayment-Input-CardNumber');
    this.cardExpirationField = page.getByTestId('OrganizationBillingPayment-Input-Expiration');
    this.cardCvcField = page.getByTestId('OrganizationBillingPayment-Input-CVC');
    this.cardPostalField = page.getByTestId('OrganizationBillingPayment-Input-PostalCode');
    

    }

    //methods
    async fillOrgName(string:string){
        await this.NameField.click();
        await this.page.keyboard.type(string);
    }

    async fillOrgEmail(string:string){
        await this.EmailField.click({ clickCount: 3});
        await this.page.keyboard.type(string);
    }

    async fillOrgDescription(string:string){
        await this.DescriptionField.click();
        await this.page.keyboard.type(string);
    }

    async fillOrgSector(string:string){
        await this.SectorField.click();
        await this.page.keyboard.type(string)
    }

    async fillCreateOrgDialog(orgName:string, orgDescription:string, orgSector:string){
        await this.fillOrgName(orgName);
        await this.fillOrgDescription(orgDescription);
        await this.fillOrgSector(orgSector);
    }

    async fillPaymentInfo(name:string, cardNumber:string, expirationDate:string, cvcNumber:string, postalCode:string ) {
        await this.cardHolderNameField.click();
        await this.page.keyboard.type(name);
        await this.page.waitForTimeout(200);
        await this.cardNumberField.click();
        await this.page.keyboard.type(cardNumber, {delay:100});
        await this.page.keyboard.press('Tab');
        await this.page.waitForTimeout(200);
        await this.page.keyboard.type(expirationDate);
        await this.cardCvcField.click();
        await this.page.keyboard.type(cvcNumber);
        await this.cardPostalField.click();
        await this.page.keyboard.type(postalCode);
        await this.page.keyboard.press('Tab');
        await this.page.waitForTimeout(500);
    }
}