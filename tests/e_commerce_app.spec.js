import { test, expect } from '@playwright/test';
test('First E_commerce app test', async ({ page }) => {
    //global locators declaration
    const username = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const cardBody = page.locator('.card-body b');
    //hitting the landing page
    await page.goto('https://rahulshettyacademy.com/client/');
    console.log(await page.title());//printing the title
    //expecting the title to be 'Let's Shop'
    await expect(page).toHaveTitle("Let's Shop");
    await username.fill('apputc8@gmail.com');
    await password.fill('Arya@123');
    //clicking on the sign in button
    await page.locator('#login').click();
    //waiting for the network to be idle
    await page.waitForLoadState('networkidle');
    //get the first product name
    console.log(await cardBody.nth(0).textContent());
    console.log(await cardBody.allTextContents());
});