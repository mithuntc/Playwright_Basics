import { test, expect } from '@playwright/test';
test('E_commerce End to End test', async ({ page }) => {
    //global locators declaration
    const username = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const cardBody = page.locator('.card-body b');
    const products = page.locator('.card-body');
    var allProducts = [];
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
    // get all product names
    allProducts = await cardBody.allTextContents();
    for (let i = 0; i <= allProducts.length; i++) {
        const productName = await products.nth(i).locator('b').textContent();
        if (productName === allProducts[1]) { //checking if the product name matches (in this case 'ADIDAS ORIGINAL')
            //click on the add to cart button
            await products.nth(i).locator('text=Add To Cart').click();
            break;
        }
    }
    //click on the cart icon
    await page.locator('[routerlink="/dashboard/cart"]').click();
    //checking if the cart has the right prduct using assertions
    const cartProductName = await page.locator('.cartSection h3').textContent();
    console.log("Item Already in the cart: " + cartProductName);
    expect(cartProductName).toContain('ADIDAS ORIGINAL');
    //click on the checkout button
    await page.locator('text="Checkout"').click();
    //filling the form
    await page.locator("[placeholder*='Select Country']").pressSequentially('Ind');
    const options = page.locator('.ta-results');
    await options.waitFor();// Wait for the options to be visible
    const optionsCount = await options.locator('button').count(); // get the count of options
    for (let i = 0; i < optionsCount; i++) {
        const text = await options.locator('button').nth(i).textContent();
        if (text === ' India') { //checking if the option is India
            await options.locator('button').nth(i).click(); //click on the India option
            break;
        }
    }
    // assserting the email id is correct or not
    const email = await page.locator('label[type="text"]').textContent();
    console.log("Email in the form: " + email);
    expect(email).toContain('apputc8@gmail.com');
    //click on the place order button
    //await page.locator('text="Place Order"').click();
    await page.locator('.action__submit').click();
    //asserting the order confirmation message
    const orderConfirmationMessage = await page.locator('.hero-primary').textContent();
    console.log("Order Confirmation Message: " + orderConfirmationMessage);
    expect(orderConfirmationMessage).toContain('Thankyou for the order.');
    //get the order id from the confirmation message
    const orderId = await page.locator('label[class="ng-star-inserted"]').textContent();
    console.log("Order ID: " + orderId);
    //asserting the order id is not null
    expect(orderId).not.toBeNull();
    //going to the orders page
    await page.locator('button[routerlink="/dashboard/myorders"]').click();
    //asserting the order id is present in the orders page
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});