const pageCommands = {
    logout: function () {
        return this.click('@hamMenu')
                    .waitForElementVisible('@logout', 1000)
                    .click('@logout')
    }
}

module.exports = {
    commands: [pageCommands],
    url: function () {
        return this.api.globals.devserverURL + '/timeline/erai'
    },
    elements: {
        table: {
            selector: 'table'
        },
        tabs: {
            selector: 'ul[role="tablist"]'
        },
        hamMenu: {
            selector: 'label[id="nav-open"]'
        },
        logout: {
            selector: 'a[id="logout"]'
        }
    }
}

