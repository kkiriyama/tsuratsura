const pageCommands = {
  toErai: function () {
    return this.click('@hamMenu')
      .waitForElementVisible('@toErai', 5000)
      .click('@toErai')
  }
}

module.exports = {
  commands: [pageCommands],
  url: function () {
    return this.api.globals.devServerURL
  },
  elements: {
    timeline: {
      selector: 'div[id="timeline"]'
    },
    card: {
      selector: 'div[class="card p-2 mb-2 tsurai-card-color"]'
    },
    hamMenu: {
      selector: 'label[id="nav-open"]'
    },
    toErai: {
      selector: 'a[href="#/timeline/erai"]'
    }
  }
}
