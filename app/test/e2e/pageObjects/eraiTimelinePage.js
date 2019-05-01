const pageCommands = {
  toMyPage: function () {
    return this.click('@hamMenu')
      .waitForElementVisible('@toMyPage', 5000)
      .click('@toMyPage')
  }
}

module.exports = {
  commands: [pageCommands],
  url: function () {
    return this.api.globals.devServerURL + '/timeline/erai'
  },
  elements: {
    timeline: {
      selector: 'div[id="timeline"]'
    },
    card: {
      selector: 'div[class="card p-2 mb-2 erai-card-color"]'
    },
    hamMenu: {
      selector: 'label[id="nav-open"]'
    },
    toMyPage: {
      selector: 'a[id="mypage"]'
    }
  }
}
