module.exports = {
  'Verify that user is registered successfully on linkedin': async function (browser) {
    // Importing Page Object Model files
    const HomePage = require('../page-objects/homePage');
    const RegistrationPage = require('../page-objects/registrationPage');
    const ProfilePage = require('../page-objects/profilePage');

    // Create instances of the page objects to interact with each page
    const homePage = new HomePage(browser);
    const registrationPage = new RegistrationPage(browser);
    const profilePage = new ProfilePage(browser);
    
    // test cases steps
    // 1- Open the page, verify page loaded and click Join now.
    await homePage.navigateToHome();
    await homePage.clickJoinNow();
    browser.pause(6000);
    // 2 -Enter email & password and click agree and join
    await registrationPage.fillEmailAndPassword();
    await registrationPage.clickAgreeAndJoin();
    browser.pause(6000);
    // 3- Enter First and Last Name
    await profilePage.fillProfileInfo();
   // 4- Click Continue and assert security verification is shown
    await profilePage.clickContinue();
    browser.pause(6000);
    await profilePage.securityVerification();
    browser.pause(6000);
    browser.end();
  }
};
