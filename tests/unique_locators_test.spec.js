import { test, expect } from '@playwright/test';
test('Unique Locators In Playwright', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.locator('div[class="form-group"] input[name="name"]').fill('John Doe');
    await page.locator('input[name="email"]').fill('apputc8@gmail.com');
    // Using unique locators to fill the form
    await page.getByPlaceholder('Password').fill('Arya@123');
    await page.getByLabel('Check me out if you Love IceCreams!').check();
    await page.getByLabel('Employed').check();
    await page.getByLabel('Gender').selectOption("Female");
    //submitting the form using a unique locator
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByText('The Form has been submitted successfully!.').isVisible();
    await page.getByRole('link', { name: 'Shop' }).click();
    // in shop page clicking on add to cart button for iphone X
    await page.locator('app-card').filter({ hasText: 'iphone X' }).getByRole('button').click();
    await page.pause(); // Pausing to inspect the form
})