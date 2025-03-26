import { expect, test } from '@playwright/test';
import { LoginPage } from '../pageObjects/login.po';

// Navigate to login page before each test
test.beforeEach(async ({ page }) => {
  await page.goto('/practice-test-login/');
});

test.describe('valid login test'  ,() => { 
  test('Login with login object', async({ page }) => {
  const login = new LoginPage(page);
  await login.login('student', 'Password123');
  await login.verifyValidLogin();
});
})
test.describe('INvalid login test'  ,() => { 
test('Login with invalidusername', async({ page }) => {
    const login = new LoginPage(page);
    await login.login('incorrectusername', 'Password123');
    await login.verifyInvalidusername();
  });

  test('Login with invalidpassword', async({ page }) => {
    const login = new LoginPage(page);
    await login.login('student', 'incorrectPassword');
    await login.verifyInvalidpassword();
  }); 
})