//simple first test
import { test, expect } from '@playwright/test';
test.only('First Test Landing Page without browser context playwright test', async ({ page }) => {
    //global locators declaration
    const username = page.locator('#username');
    const password = page.locator('#password');
    const cardBody = page.locator('.card-body a');
    const blinkingTexy = page.locator("a[href*='documents-request']");
    //hitting the landing page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    //asserting the blinking text is visible
    await expect(blinkingTexy).toHaveAttribute("class", "blinkingText");
    console.log(await page.title());//printing the title
    //expecting the title to be 'LoginPage Practise | Rahul Shetty Academy'
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await username.fill('rahulshettyacademy');
    await password.fill('learning');
    //handling the select dropdown
    const dropdown = page.locator('select.form-control');
    await dropdown.selectOption('consult');
    //handling the raio button
    await page.locator('.radiotextsty').last().click();
    //asserting the radio button is selected 
    console.log('Radio button is checked:', await expect(page.locator('.radiotextsty').last()).toBeChecked());
    // handling the confirm alert
    await page.locator('#okayBtn').click();
    //handing the checkbox
    const checkBox = page.locator('#terms');
    await checkBox.click();
    //asserting the checkbox is checked
    console.log('Checkbox is checked:', await expect(checkBox).toBeChecked());
    //clicking on the sign in button
    await page.locator('#signInBtn').click();
    //dashboad page
   //get the first product name
   console.log(await cardBody.nth(0).textContent());
   console.log(await cardBody.allTextContents());
});
// for reference
test('First Test Landing Page with browser context playwright test', async ({ browser }) => {
    //chrome - plugin/cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    //hitting the landing page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.title().then(title => {
        console.log('Page title is:', title);
    });
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    
});

