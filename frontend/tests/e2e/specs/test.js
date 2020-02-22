// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide

module.exports = {
  'default e2e tests': browser => {
    browser
      .init()
      .waitForElementVisible('#app')
      .assert.elementPresent('.hello')
      .assert.elementPresent('#nav')
      .assert.containsText('h1', 'Welcome to Your Vue.js App')
      .assert.containsText('p', "Version: 0.0.1")
      .assert.elementCount('img', 1)
      .end()
  },
}
