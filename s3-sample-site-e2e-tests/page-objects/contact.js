class ContactPage {
  constructor(browser) {
    this.browser = browser;
    this.selectors = {
      pageRoot: 'body',
      pageSelector: 'h1, h2, img[src*="contact"], a[href="mailto:"]'
    };
  }

  async assertContactLoaded() {
    await this.browser.waitForElementVisible(this.selectors.pageRoot, 5000);
    await this.browser.assert.urlContains('contact', 'Contact page loaded (URL contains "contact")');

    const res = await this.browser.element('css selector', this.selectors.pageSelector);
    if (res && res.status === 0) {
      await this.browser.assert.visible(this.selectors.pageSelector, 'Contact Selector is visible');
    }

    console.log('Contact loaded successfully.');
  }

  async backToHome() {
    console.log('Going back to Home...');
    await this.browser.back();
  }
}

module.exports = ContactPage;
