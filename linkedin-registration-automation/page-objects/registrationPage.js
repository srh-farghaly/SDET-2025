const userData = require('../data/registrationData.json');

class RegistrationPage {
  constructor(browser) {
    this.browser = browser;
    this.selectors = {
      emailInput: 'input#email-address',
      passwordInput: 'input#password',
      agreeJoinBtn: 'button#join-form-submit'
    };
  }

  async fillEmailAndPassword() {

    console.log("Filling email and password fields...");
    await this.browser.waitForElementVisible(this.selectors.emailInput);
    await this.browser.setValue(this.selectors.emailInput, userData.validEmail);
    await this.browser.setValue(this.selectors.passwordInput, userData.validPassword);

  }
  async clickAgreeAndJoin(){
    console.log("Clicking 'Agree & Join' button...");
    await this.browser.waitForElementVisible(this.selectors.agreeJoinBtn)
    await this.browser.click(this.selectors.agreeJoinBtn);
  }
}

module.exports = RegistrationPage;
