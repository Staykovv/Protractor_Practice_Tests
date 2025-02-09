const { element, browser, by, protractor } = require("protractor");
const { username, password } = require('../config');  // Adjusted path for config.js in root folder

beforeEach(async function() {
  await browser.waitForAngularEnabled(false);
  await browser.get('https://demoqa.com/login');
  await browser.refresh();
  await browser.sleep(1000);
});

afterEach(async function() {
  const logoutButton = element(by.id('submit'));
  
  if (await logoutButton.isPresent()) {
    await browser.wait(protractor.ExpectedConditions.elementToBeClickable(logoutButton), 5000);
    await logoutButton.click();
    await browser.wait(protractor.ExpectedConditions.visibilityOf(element(by.id('login'))), 5000);
  }
});


// 1. User login with valid data. The user should be able to login correctly.
describe('User login with valid data', function() {
  it('Should log in successfully and navigate to profile', async function() {
    await element(by.id('userName')).sendKeys(username);
    await element(by.id('password')).sendKeys(password);

    const loginButton = element(by.id('login'));
    await browser.executeScript("arguments[0].scrollIntoView(true);", loginButton.getWebElement());
    await browser.wait(protractor.ExpectedConditions.elementToBeClickable(loginButton), 5000);
    await loginButton.click();
 
    await browser.wait(protractor.ExpectedConditions.visibilityOf(element(by.id('userName-value'))), 5000);
    expect(await element(by.id('userName-value')).getText()).toEqual(username);

    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).toContain('/profile');
  });
});


// 2. User login with invalid credentials. The user should not be able to login.
describe('User login with invalid credentials', function() {
  it('Should display an error message when invalid credentials are provided', async function() {      
      await element(by.id('userName')).sendKeys('invalidUser');
      await element(by.id('password')).sendKeys('invalidPass');

      const loginButton = element(by.id('login'));
      await browser.executeScript("arguments[0].scrollIntoView(true);", loginButton.getWebElement());
      await browser.wait(protractor.ExpectedConditions.elementToBeClickable(loginButton), 5000);
      await loginButton.click();
  
      const warningMessage = element(by.id('name'));
      await browser.wait(protractor.ExpectedConditions.visibilityOf(warningMessage), 5000);

      const warningMessageCheck = await warningMessage.getText();
      expect(warningMessageCheck.trim()).toEqual('Invalid username or password!');
  });
});


// 3. User login with empty fields. The user should not be able to login with empty fields.
describe('User login with empty fields', function() {
  it('Should show warning info boxes if attempt to login is made without filling the required fields', async function() {      
      const loginButton = element(by.id('login'));
      await browser.executeScript("arguments[0].scrollIntoView(true);", loginButton.getWebElement());
      await browser.wait(protractor.ExpectedConditions.elementToBeClickable(loginButton), 5000);
      await loginButton.click();
  
      const usernameField = element(by.id('userName'));
      const passwordField = element(by.id('password'));

      const usernameWarningMsg = await usernameField.getAttribute('class');
      expect(usernameWarningMsg).toContain('is-invalid');

      const passwordWarningMsg = await passwordField.getAttribute('class'); 
      expect(passwordWarningMsg).toContain('is-invalid');
  });
});


// 4. Verify User Details on Profile Page. The user details should be correctly displayed on the profile page.
describe('Validate profile page after login', function() {
  it('Validate URL and all relevant buttons are present on the profile page', async function() {
    await element(by.id('userName')).sendKeys(username);
    await element(by.id('password')).sendKeys(password);

    const loginButton = element(by.id('login'));
    await browser.executeScript("arguments[0].scrollIntoView(true);", loginButton.getWebElement());
    await browser.wait(protractor.ExpectedConditions.elementToBeClickable(loginButton), 5000);
    await loginButton.click();

    await browser.wait(protractor.ExpectedConditions.visibilityOf(element(by.id('userName-value'))), 5000);
    expect(await element(by.id('userName-value')).getText()).toEqual(username);

    const goToStoreButton = element(by.css('button#gotoStore'));
    await browser.wait(protractor.ExpectedConditions.visibilityOf(goToStoreButton), 5000);
    expect(await goToStoreButton.isDisplayed()).toBe(true);

    const logOutButton = element(by.buttonText('Log out'));
    await browser.wait(protractor.ExpectedConditions.visibilityOf(logOutButton), 5000);
    expect(await logOutButton.isDisplayed()).toBe(true);

    const deleteAccountButton = element(by.buttonText('Delete Account'));
    await browser.wait(protractor.ExpectedConditions.visibilityOf(deleteAccountButton), 5000);
    expect(await deleteAccountButton.isDisplayed()).toBe(true);

    const deleteAllBooksButton = element(by.buttonText('Delete All Books'));
    await browser.wait(protractor.ExpectedConditions.visibilityOf(deleteAllBooksButton), 5000);
    expect(await deleteAllBooksButton.isDisplayed()).toBe(true);

    const loginButtonAfterLogin = element(by.id('login'));
    const newUserButtonAfterLogin = element(by.id('newUser'));
    expect(await loginButtonAfterLogin.isPresent()).toBe(false);
    expect(await newUserButtonAfterLogin.isPresent()).toBe(false);
  });
});


// 5. Logout Functionality. The user should be redirected to the login page after logout button is clicked.
describe('Validate logout functionality', function() {
  it('Should redirect to login page, display all relevant buttons, and hide profile buttons after logout', async function() {
    await element(by.id('userName')).sendKeys(username);
    await element(by.id('password')).sendKeys(password);

    const loginButton = element(by.id('login'));
    await browser.executeScript("arguments[0].scrollIntoView(true);", loginButton.getWebElement());
    await browser.wait(protractor.ExpectedConditions.elementToBeClickable(loginButton), 5000);
    await loginButton.click();

    await browser.wait(protractor.ExpectedConditions.visibilityOf(element(by.id('userName-value'))), 5000);
    expect(await element(by.id('userName-value')).getText()).toEqual(username);

    const logOutButton = element(by.buttonText('Log out'));
    await browser.wait(protractor.ExpectedConditions.elementToBeClickable(logOutButton), 5000);
    await logOutButton.click();

    await browser.wait(protractor.ExpectedConditions.urlContains('/login'), 5000);
    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).toContain('/login');

    const loginButtonAfterLogout = element(by.id('login'));
    const newUserButtonAfterLogout = element(by.id('newUser'));

    await browser.wait(protractor.ExpectedConditions.visibilityOf(loginButtonAfterLogout), 5000);
    expect(await loginButtonAfterLogout.isDisplayed()).toBe(true);

    await browser.wait(protractor.ExpectedConditions.visibilityOf(newUserButtonAfterLogout), 5000);
    expect(await newUserButtonAfterLogout.isDisplayed()).toBe(true);

    const goToStoreButton = element(by.css('button#gotoStore'));
    const deleteAccountButton = element(by.buttonText('Delete Account'));
    const deleteAllBooksButton = element(by.buttonText('Delete All Books'));

    expect(await goToStoreButton.isPresent()).toBe(false);
    expect(await logOutButton.isPresent()).toBe(false);
    expect(await deleteAccountButton.isPresent()).toBe(false);
    expect(await deleteAllBooksButton.isPresent()).toBe(false);
  });
});


// 6. Verify that unauthorized profile access works correctly.
describe('Cannot access the profile page if not logged in', function() {
  it('Should display a warning message and links when accessing profile without login', async function() {
    await browser.get('https://demoqa.com/profile');

    const warningMessage = element(by.id('notLoggin-label'));
    await browser.wait(protractor.ExpectedConditions.visibilityOf(warningMessage), 5000);

    const warningText = await warningMessage.getText();
    expect(warningText.trim()).toEqual('Currently you are not logged into the Book Store application, please visit the login page to enter or register page to register yourself.');

    const loginLink = element(by.css('a[href="/login"]'));
    await browser.wait(protractor.ExpectedConditions.visibilityOf(loginLink), 5000);
    expect(await loginLink.isDisplayed()).toBe(true);
    expect(await loginLink.getText()).toEqual('login');

    const registerLink = element(by.css('a[href="/register"]'));
    await browser.wait(protractor.ExpectedConditions.visibilityOf(registerLink), 5000);
    expect(await registerLink.isDisplayed()).toBe(true);
    expect(await registerLink.getText()).toEqual('register');
  });
});
