import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/practice-test-login');
});

test('Login using valid credentials', async ({ page }) => {
  await page.locator("//input[@id='username']").fill('student');
  await page.locator("//input[@id='password']").fill('Password123');
  await page.locator("//input[@id='password']//following::button").click();
  
  await expect(page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/');
})

test('Login using invalid username', async ({ page }) => {
  await page.locator("//input[@id='username']").fill('incorrectusername');
  await page.locator("//input[@id='password']").fill('Password123');
  await page.locator("//button[@id='submit']").click();
  
  expect(await page.locator('#error').textContent()).toBe('Your username is invalid!');
})

test('Login using invalid password', async ({ page }) => {
  await page.locator("//input[@id='username']").fill('student');
  await page.locator("//input[@id='password']").fill('incorrectPassword');
  await page.getByRole('Button',{name: 'submit'}).click();
  
  expect(await page.locator('#error').textContent()).toBe('Your password is invalid!');
})

