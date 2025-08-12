class SearchResultsPage {
  constructor(browser) {
    this.browser = browser;


    this.selectors = {
      resultsList: 'ul.product_list',           
      resultCards: 'ul.product_list li.ajax_block_product, .product_list .product-container',
      productNames: '.product_list a.product-name, .product_list .product-name'
    };
  }

  
async expectLoaded(query) {
  
  await this.browser.assert.urlContains('controller=search', 'On search results page');
  await this.browser
    .waitForElementVisible(this.selectors.resultsList, 8000)
    .waitForElementVisible(this.selectors.resultCards, 8000);

  return this;
}

  async verifyAllProductsContain(word) {
  const names = await new Promise(resolve => {
    this.browser.execute(
      s => Array.from(document.querySelectorAll(s)).map(el => (el.textContent || '').trim()),
      [this.selectors.productNames],
      res => resolve(res.value || [])
    );
  });
  const bad = names.filter(n => !n.toLowerCase().includes(String(word).toLowerCase()));
  this.browser.assert.ok(bad.length === 0, `Some items are unrelated to "${word}": ${bad.join(', ')}`);
}

}

module.exports = SearchResultsPage;
