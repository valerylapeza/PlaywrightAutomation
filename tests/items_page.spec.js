// @ts-check
import { test, expect, chromium } from '@playwright/test';

test ('item\'s page', async () => {

    const browser = await chromium.launch( {headless: true} );
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

    // Go to Backpack item card
    await page.locator('[data-test="item-4-title-link"]').click();
    await page.locator('[data-test="inventory-item-name"]');
    await page.locator('[data-test="back-to-products"]').click();

    // Go to Bike Lights card
    await page.locator('[data-test="item-0-title-link"]').click();
    await page.locator('[data-test="inventory-item-name]');
    await page.locator('[data-test="back-to-products"]').click();

    // Go to T-Shirt card
    await page.locator('[data-test="item-1-title-link"]').click();
    await page.locator('[data-test="inventory-item-name]');
    await page.locator('[data-test="back-to-products"]').click();

    // Go to Jacket card
    await page.locator('[data-test="item-5-title-link"]').click();
    await page.locator('[data-test="inventory-item-name]');
    await page.locator('[data-test="back-to-products"]').click();

    // Go to Onesie card
    await page.locator('[data-test="item-2-title-link"]').click();
    await page.locator('[data-test="inventory-item-name]');
    await page.locator('[data-test="back-to-products"]').click();

    // Go to T-Shirt Red card
    await page.locator('[data-test="item-3-title-link"]').click();
    await page.locator('[data-test="inventory-item-name]');
    await page.locator('[data-test="back-to-products"]').click();

    // Open the hamburger menu
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await expect(page.getByRole('button', { name: 'Open Menu' })).toBeVisible();

    //Log out from the system
    await page.locator('[data-test="logout-sidebar-link"]').click();
    await expect(page).toHaveTitle(/Swag Labs/);

    // Close browser window
    await context.close();
    await browser.close();
})