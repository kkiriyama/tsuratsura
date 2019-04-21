// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'defalt tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .setValue('input[id="confirmUsername"]', 'dummy@email.com')
      .setValue('input[id="confirmPassword"]', 'DummyDummy')
      .click('button[type="submit"]')
      .pause(8000)
      .assert.visible('div[id="timeline"]')
      .click('div[id="nav-collapse"]')
      .pause(500)
      .click('a[href="#/timeline/erai"]')
      .pause(3000)
      .assert.visible('div[id="timeline"]')
      .click('div[id="nav-collapse"]')
      .pause(500)
      .click('a[href="#/user/wooJVUNr5YdbieDH5tXFK1ABLPG2"]')
      .pause(5000)
      .assert.visible('table')
      .assert.visible('div[class="tabs"]')
      .click('div[id="nav-collapse"]')
      .pause(500)
      .click('li[id="logout"]')
      .pause(500)
      .assert.visible('input[id="confirmUsername"]')
      .end()
  }
}
