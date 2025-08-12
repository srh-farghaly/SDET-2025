class HomePage {

  constructor(browser) {
    this.browser = browser;
    this.selectors = {
      searchInput: '#search_query_top',
      searchButton: 'button[name="submit_search"]'
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
