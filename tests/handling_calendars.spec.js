import { test, expect } from '@playwright/test';
test('Handling Calendar test', async ({ page }) => {
    // variables for the calendar inputs
    const day = '15';
    const month = 'March';
    const year = '2024';
    const expectedList = [month, day, year];
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month) - 1).click();
    await page.locator("//abbr[text()='" + day + "']").click();
    const inputs = await page.locator(".react-date-picker__inputGroup input");
    for (let index = 0; index < inputs.length; index++) {
        const value = inputs[index].getAttribute("value");
        expect(value).toEqual(expectedList[index]);
    }
})