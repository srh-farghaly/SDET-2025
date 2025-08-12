class HomePage {
  constructor(browser) {
    this.browser = browser;
    this.baseUrl = process.env.BASE_URL
    this.selectors = {
      homeRoot: 'body',                 
      contactLink: 'a[href="contact.html"]'
    };
  }

  async openHome() {
    console.log('Navigating to Home...');
    await this.browser.url(this.baseUrl);
    await this.assertHomeLoaded();        
  }

  async assertHomeLoaded() {
    await this.browser.waitForElementVisible(this.selectors.homeRoot, 5000);
    await this.browser.assert.visible(this.selectors.homeRoot, 'Home page loaded');
    console.log('Home loaded successfully.');
  }

  async goToContact() {
    console.log('Clicking Contact link...');
    await this.browser.click(this.selectors.contactLink);
  }
}

module.exports = HomePage;   
