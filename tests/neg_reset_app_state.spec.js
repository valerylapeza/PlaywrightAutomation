import { test, expect, chromium } from '@playwright/test';

test ('reset app state', async () => {

    const browser = await chromium.launch( {headless: false} );
    const context = await browser.newContext();

    // Open new page
    const page = await context.newPage();

    //Go to login page
    await page.goto('https://www.saucedemo.com/');

    // Enter the login name and password
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // Log in on the system
    await page.locator('[data-test="login-button"]').click();

    // Verify that standard user is logged in
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await page.locator('[data-test="inventory-container"]');

    //Add 2 items to the cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
   
    // Open the hamburger menu
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await expect(page.getByRole('button', { name: 'Open Menu' })).toBeVisible();

    //Reset the app state
    await page.click('[data-test="reset-sidebar-link"]');

    //Verify that state of buttons are not changed
    await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(2);

    //Log out from the system
    await page.locator('[data-test="logout-sidebar-link"]').click();
    await expect(page).toHaveTitle(/Swag Labs/);

    // Close browser window
    await context.close();
    await browser.close();
})
