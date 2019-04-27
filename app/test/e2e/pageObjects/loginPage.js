const pageCommands = {
    send: function () {
        return this.click('@sendButton')
    }
}

module.exports = {
    commands: [pageCommands],
    url: function () {
        return this.api.globals.devServerURL + '/#/signin'
    },
    elements: {
        inputUsername: {
            selector: 'input[id="confirmUsername"]'
        },
        inputPassword: {
            selector: 'input[id="confirmPassword"]'
        },
        sendButton: {
            selector: 'button[type="submit"]'
        }
    }
}

