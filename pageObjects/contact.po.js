const { expect } = require('@playwright/test');


exports.ContactPage = class ContactPage {
  constructor(page) {
    this.page = page;

    // Input fields
    this.firstName = '//input[@id="firstName"]';
    this.lastName = '//input[@id="lastName"]';
    this.birthdate = '//input[@id="birthdate"]';
    this.email = '//input[@id="email"]';
    this.phone = '//input[@id="phone"]';
    this.street1 = '//input[@id="street1"]';
    this.street2 = '//input[@id="street2"]';
    this.city = '//input[@id="city"]';
    this.stateProvince = '//input[@id="stateProvince"]';
    this.postalCode = '//input[@id="postalCode"]';
    this.country = '//input[@id="country"]';
    
    // Submit button
    this.submit = '//button[@id="submit"]';

    // Validation and result elements
    this.contactTable = '//table[@id="myTable"]';
    this.alertMessage = '#error';
    this.errorText ='Contact validation failed: firstName: Path `firstName` is required., lastName: Path `lastName` is required.'
  }

  async addContact(
    firstName, 
    lastName, 
    birthdate, 
    email, 
    phone, 
    street1, 
    street2, 
    city, 
    stateProvince, 
    postalCode, 
    country
  ) {
    await this.page.locator(this.firstName).fill(firstName);
    await this.page.locator(this.lastName).fill(lastName);
    await this.page.locator(this.birthdate).fill(birthdate);
    await this.page.locator(this.email).fill(email);
    await this.page.locator(this.phone).fill(phone);
    await this.page.locator(this.street1).fill(street1);
    await this.page.locator(this.street2).fill(street2);
    await this.page.locator(this.city).fill(city);
    await this.page.locator(this.stateProvince).fill(stateProvince);
    await this.page.locator(this.postalCode).fill(postalCode);
    await this.page.locator(this.country).fill(country);

    await this.page.locator(this.submit).click();
  }

  async verifyAddContact() {
    const contactTable = await this.page.locator(this.contactTable);

    await this.page.waitForTimeout(2000);
    await expect(contactTable).toBeVisible();
  }

  async verifyInvalidAddContact() {
    const errorMessage = await this.page.locator(this.alertMessage);

    await this.page.waitForTimeout(2000);
    await expect(errorMessage).toHaveText(this.errorText);
  }
}