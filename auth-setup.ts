import { test, expect } from "./fixtures/tasktrain-fixture";
import { generateRandomEmail } from "./utility";



test('StorageState for general testing account', async ({ page, signInPage }) => {
    await signInPage.visit();
    await signInPage.signInUser(`${process.env.TEST_EMAIL}`,`${process.env.TEST_PASSWORD}`);
    await page.waitForTimeout(500);

    await page.context().storageState({ path: "./general-auth.json"});
})

test('StorageState for manual testing account', async ({ page, signInPage, navOrganization }) => {
    await signInPage.visit();
    await signInPage.signInUser(`${process.env.MANUAL_EMAIL}`,`${process.env.MANUAL_PASSWORD}`);
    await page.waitForTimeout(500);
    await navOrganization.deleteManual();

    await page.context().storageState({ path: "./manual-auth.json"});
})

test('StorageState for random generated account', async ({ page, registerPage, signInPage }) => {
    // Go to Register page
    await registerPage.visit();
    // Generate random qa-@ttexternship.com email 
    const email = await  generateRandomEmail();
    // Register email 
    await registerPage.registerUser(`${email}`);    
    // Fill out Register dialog and click register button
    await registerPage.fillOutRegisterDialog(`${process.env.TEST_FIRST}`,`${process.env.TEST_LAST}`,`${process.env.TEST_ORG}`,`${process.env.TEST_PASSWORD}`,`${process.env.TEST_PASSWORD}`,`${process.env.TEST_VERIFICATIONCODE}`);
    await registerPage.registerButton.click();
    // Go to sign in page
    await signInPage.visit();
    // Login with newly generated account
    await signInPage.signInUser(`${email}`,`${process.env.TEST_PASSWORD}`);
    // Close tour window
    await page.waitForTimeout(500);
    await page.context().storageState({ path: "./random-generated-auth.json"});
});
