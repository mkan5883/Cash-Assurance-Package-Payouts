const { $ } = require('@wdio/globals')
const Page = require('./page');

class HomePage extends Page {

  get getUseCalculator () {
    return $('//span[text()="Use Calculator"]');
  }


  // Action to navigate to the calculator page
  async navigateToCalculator() {
    await this.getUseCalculator.click();
  }

  open () {
    return super.open();
}

}

module.exports = new HomePage();