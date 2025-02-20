const { Given, When, Then } = require('@wdio/cucumber-framework');

const HomePage = require('../pageobjects/homePage');
const CalculatorPage = require('../pageobjects/calculatorPage');
const Calculation = require('../util/calculation');

Given(/^I open SupportGoWhere web page$/, async () => {
  await HomePage.open();
});

When(/^I navigate to the calculator page$/, async () => {
  await HomePage.navigateToCalculator();
  await CalculatorPage.clickStartButton();
});

Then(/^I enter (.+), (.+), (.+), (.+), (.+), (.+), (.+)$/, async (birthYear, income, housingType, propertyAV, propertyOwnership, ownsMoreThanOneProperty, referenceYear) => {
  this.isBelow20 = false;
  birthYear = parseInt(birthYear, 10);
  referenceYear = parseInt(referenceYear, 10);
  if (referenceYear - birthYear < 20) {
      this.isBelow20 = true;
  }
  this.calculatedPayout = Calculation.calculateCashAssurnacePackage(birthYear, income, ownsMoreThanOneProperty, referenceYear)
  await CalculatorPage.fillCalculatorForm(birthYear, income, housingType, propertyAV, propertyOwnership, ownsMoreThanOneProperty, referenceYear);
})

Then(/^I click Show estimated benefits$/, async () => {
  await CalculatorPage.clickShowBenefitsButton();
});

Then(/^I select the reference year tab as (.+)$/, async (referenceYear) => {
  await CalculatorPage.selectReferenceYear(referenceYear);
});

Then(/^I verify the Cash - Assurance Package (.+)$/, async (referenceYear) => {
  if(this.isBelow20) {
    expect(await CalculatorPage.isCashAssurncPackageDisplayed()).toBe(false);

  } else {
    const actualPayout = await CalculatorPage.getPayoutAmount(referenceYear);
    expect(actualPayout).toEqual(this.calculatedPayout.toString());
  }
  
});
