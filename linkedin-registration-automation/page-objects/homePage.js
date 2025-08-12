class HomePage {
  constructor(browser) {
    this.browser = browser;
    this.selectors = {
      joinNowBtn: 'a.sign-in-form__join-cta.link.link-no-visited-state'
    };
  }

  async navigateToHome() {

    console.log("Navigating to LinkedIn homepage...");
    await this.browser.url('https://www.linkedin.com/');
    await this.browser.waitForElementVisible('body',false);
    await this.browser.assert.titleContains('LinkedIn');
  }

  async clickJoinNow() {
    await this.browser.click(this.selectors.joinNowBtn);
  }
}

module.exports = HomePage;
