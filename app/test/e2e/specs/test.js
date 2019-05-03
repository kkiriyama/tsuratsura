// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'defalt test': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const loginPage = browser.page.loginPage()
    const tsuraiTimelinePage = browser.page.tsuraiTimelinePage()
    const eraiTimelinePage = browser.page.eraiTimelinePage()
    const myPage = browser.page.myPage()

    loginPage.navigate()
      .waitForElementVisible('@inputUsername', 5000)
      .setValue('@inputUsername', 'dummy@email.com')
      .setValue('@inputPassword', 'DummyDummy')
      .send()

    tsuraiTimelinePage
      .waitForElementVisible('@timeline', 5000)
      .waitForElementVisible('@card', 5000)
      .toErai()

    eraiTimelinePage
      .waitForElementVisible('@timeline', 5000)
      .waitForElementVisible('@card', 5000)
      .toMyPage()

    myPage
      .waitForElementVisible('@table', 5000)
      .waitForElementVisible('@tabs', 5000)
      .logout()

    loginPage
      .waitForElementVisible('@inputUsername', 5000)

    browser.end()
  }
}
