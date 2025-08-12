const HomePage = require('../page-objects/Home');
const ContactPage = require('../page-objects/contact');

module.exports = {

  async 'Verify that user can navigate between home and Contact page'(browser) {
    const home = new HomePage(browser);
    const contact = new ContactPage(browser);
    await home.openHome();              
    await home.goToContact();
    await contact.assertContactLoaded();
    browser.pause(4000);
    await contact.backToHome();
    await home.assertHomeLoaded(); 
    browser.pause(3000);

    await browser.end();
  }
};
