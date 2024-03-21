import { Locator, Page, expect } from "@playwright/test";

export class ForgotPasswordPage {
    
    //variables
    readonly page: Page;
    
    readonly emailField: Locator;
    readonly sendResetLink: Locator;

    //constructor
    constructor(page: Page){
        this.page = page;

        this.emailField = page.getByTestId('UserRequestPasswordReset-Input-Username');
        this.sendResetLink = page.getByTestId('UserRequestPasswordReset-Button-SendResetLink');

    }

    //methods
    async visit(){
        await this.page.goto('https://staging.tasktrain.app/auth/forgot-password');
    }
}
