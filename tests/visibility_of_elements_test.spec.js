import { test, expect } from '@playwright/test';
test('Visibility of elements test', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.goto('https://google.com/');
    await page.goBack();
    // checking element hide or not
    await expect(page.locator('#displayed-text')).toBeVisible();
    //clicking hide button
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    page.on('dialog',dialog => dialog.accept());// accept js dialog box
    await page.locator('#confirmbtn').click();
    await page.locator('#mousehover').hover();// hovering concept handling
    //handing frames
    const frames =  page.frameLocator('#courses-iframe');
    await frames.locator('li a[href*="lifetime-access"]:visible').click();
    const text = await frames.locator('.text h2').textContent();
    const subscribersNumbers = text.split(" ");
    console.log(subscribersNumbers[1]);

    

})