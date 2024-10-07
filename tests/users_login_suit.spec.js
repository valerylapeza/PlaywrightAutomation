// @ts-check
import { test, expect, chromium } from '@playwright/test';

test ('standard user login', async () => {

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

test ('locked user login', async ({ request }) => {

    const browser = await chromium.launch( {headless: true} );
    const context = await browser.newContext();

    // Open new page
    const page = await context.newPage();

    // Go to login page
    await page.goto('https://www.saucedemo.com/');
    
    // Enter the login name and password
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    
    // Log in on the system
    await page.locator('[data-test="login-button"]').click();
    
    //Validate the highlighted input fields and the error message
    const userName = page.locator('[data-test="username"]');
    const password = page.locator('[data-test="password"]');
    const errorMessage = page.locator('[data-test="error"]');
    
    await expect(userName).toHaveClass('input_error form_input error');
    await expect(password).toHaveClass('input_error form_input error');
    await expect(errorMessage).toContainText(/Epic sadface/);

    // Validate the 503 status code (Service Unavailable)
    const response = await request.post("https://submit.backtrace.io/UNIVERSE/TOKEN/json");
    expect(response.status()).toBe(503);

    // Close browser window
    await context.close();
    await browser.close();
})

test ('problem user login', async () => {

    const browser = await chromium.launch( {headless: true} );
    const context = await browser.newContext();

    // Open new page
    const page = await context.newPage();

    // Go to login page
    await page.goto('https://www.saucedemo.com/');
    
    // Enter the login name and password
    await page.locator('[data-test="username"]').fill('problem_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // Log in on the system
    await page.locator('[data-test="login-button"]').click();

    // Verify that problem user is logged in
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    const image = page.locator('[src="/static/media/sl-404.168b1cce.jpg"]');
    await expect(image).toHaveCount(6);

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

test ('performance glitch user login', async () => {

    const browser = await chromium.launch( {headless: true} );
    const context = await browser.newContext();

    // Open new page
    const page = await context.newPage();

    // Go to login page
    await page.goto('https://www.saucedemo.com/');
    
    // Enter the login name and password
    await page.locator('[data-test="username"]').fill('performance_glitch_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // Log in on the system
    await page.locator('[data-test="login-button"]').click();

    // Verify that performance glitch user is logged in
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html', { timeout: 10000 });

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

test ('error user login', async ({ request }) => {

    const browser = await chromium.launch( {headless: true} );
    const context = await browser.newContext();

    // Open new page
    const page = await context.newPage();

    // Go to login page
    await page.goto('https://www.saucedemo.com/');
    
    // Enter the login name and password
    await page.locator('[data-test="username"]').fill('error_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // Log in on the system
    await page.locator('[data-test="login-button"]').click();

    // Add a backpack to the cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // Remove a backpack from the cart
    await page.click('[data-test="remove-sauce-labs-backpack"]');
    const response = await request.post("https://submit.backtrace.io/UNIVERSE/TOKEN/json");
    expect(response.status()).toBe(503);

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
