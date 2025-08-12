require('dotenv').config();
const chromedriver = require('chromedriver');

module.exports = {
  src_folders: ['tests'],
  page_objects_path: ['page-objects'],


  webdriver: {
    start_process: true,
    server_path: chromedriver.path,
    port: 9515
  },

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          args: ['--window-size=1366,768'] // remove headless to watch
        }
      }
    }
  }
};
