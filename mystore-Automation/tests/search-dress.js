const HomePage = require('../page-objects/homePage');             
const SearchResultsPage = require('../page-objects/searchResultsPage');

module.exports = {

  'TC001 - Search "dress" returns only dress-related items': async function (browser) {
    const home = new HomePage(browser);
    const results = new SearchResultsPage(browser);
    await home.open();
    await home.search('dress');
    await results.expectLoaded('dress');
    await results.verifyAllProductsContain('dress');
    browser.end();
  }
};
