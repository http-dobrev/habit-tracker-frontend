const { test, expect } = require('@playwright/test');

test('user can log in and reach the dashboard', async ({ page }) => {
  page.on('dialog', async (dialog) => {
    console.log('ALERT MESSAGE:', dialog.message());
    await dialog.dismiss();
  });
  
  await page.goto('/login');

  await page.getByPlaceholder('Email').fill(process.env.TEST_USER_EMAIL);
  await page.getByPlaceholder('Password').fill(process.env.TEST_USER_PASSWORD);
  await page.getByText('Login', { exact: true }).click();

  await expect(page).toHaveURL(/dashboard/, {timeout: 15000});
});