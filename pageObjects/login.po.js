const { expect } = require('@playwright/test');
const { log } = require('console');

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = '//input[@id="username"]';
    this.passwordInput = '//input[@id="password"]';
    this.loginButton = '//button[@id="submit"]';
    this.logOut = '//a[@name="Log out"]';
    this.loginValidation = '//h1[@class="post-title"]';
    this.alertMessage = '#error';
  }

  async login(username, password) {
    await this.page.locator(this.usernameInput).fill(username);
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.locator(this.loginButton).click();
  }

  async verifyValidLogin() {
    const loginValidation = await this.page.locator(this.loginValidation);
    await this.page.waitForTimeout(2000);
    await expect(loginValidation).toHaveText('Logged In Successfully');
  }

  async verifyInvalidLogin() {
    const InvalidLogin = await this.page.locator(this.alertMessage);
    await expect(InvalidLogin).toHaveText('Your username is invalid!');
  }

  async verifyInvalidusername() {
    const InvalidLogin = await this.page.locator(this.alertMessage);
    await expect(InvalidLogin).toHaveText('Your username is invalid!');
  }

  async verifyInvalidpassword() {
    const InvalidLogin = await this.page.locator(this.alertMessage);
    await expect(InvalidLogin).toHaveText('Your password is invalid!');
  }

}