class HomePage {

  constructor(browser) {
    this.browser = browser;
    this.selectors = {
      searchInput: '#search_query_top, input[name="search_query"], form#searchbox input[type="text"]',
      searchButton: 'button[name="submit_search"], form#searchbox button[type="submit"]'
    };
  }

  async open() {
    await this.browser
      .url(this.browser.launch_url)
      .waitForElementVisible('body', 8000);
    return this; 
  }
  async search(term) {
    const { searchInput, searchButton } = this.selectors;

    await this.browser
      .waitForElementVisible(searchInput, 5000)
      .clearValue(searchInput)
      .setValue(searchInput, term)
      .click(searchButton);

    return this; 
  }
}

module.exports = HomePage;
