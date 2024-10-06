// @ts-check
import { test, expect, chromium } from '@playwright/test';

test ('Checkout flow for standard user', async () => {

    // Test variables
    
    const userName = 'standard_user';
    const password = 'secret_sauce';
    const firstName = Math.random().toString(36).substring(2,7);
    const lastName = Math.random().toString(36).substring(2,7);
    const postalCode = `${Array.from({length: 3}, () => String.fromCharCode(Math.floor(Math.random() * 26) + 65)).join('')}-${('00000' + Math.floor(Math.random() * 100000)).slice(-5)}`;
    

    const browser = await chromium.launch( {headless: false} );
    const context = await browser.newContext();

    // Open new page
    const page = await context.newPage();

    //Go to login page
    await page.goto('https://www.saucedemo.com/');

    // Enter the login name and password
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill(userName);
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill(password);

    // Log in on the system
    await page.locator('[data-test="login-button"]').click();

    // Add 3 items to the shopping cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();

    // Navigate to the shopping cart
    await page.locator('[data-test="shopping-cart-link"]').click();

    // Go to checkout
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').click();

    // Fill the personal data details
    await page.locator('[data-test="firstName"]').fill(firstName);
    await page.locator('[data-test="lastName"]').click();
    await page.locator('[data-test="lastName"]').fill(lastName);
    await page.locator('[data-test="postalCode"]').click();
    await page.locator('[data-test="postalCode"]').fill(postalCode);
    await page.locator('[data-test="continue"]').click();

    // Complete the checkout
    await page.locator('[data-test="finish"]').click();

    // Back to Products page
    await page.locator('[data-test="back-to-products"]').click();

    // // Open the hamburger menu
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await expect(page.getByRole('button', { name: 'Open Menu' })).toBeVisible();

    //Log out from the system
    await page.locator('[data-test="logout-sidebar-link"]').click();
    await expect(page).toHaveTitle(/Swag Labs/);

    // Close browser window
    await context.close();
    await browser.close();

})