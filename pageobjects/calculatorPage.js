const { By } = require('selenium-webdriver');
const Page = require('./page');

class CalculatorPage extends Page {
  
  get getStartButton () {
      return $('//span[text()="Start"]');
    }

  get getBirthYearInput () {
      return $('//input[@aria-labelledby="personalInfo.yearOfBirth"]');
  }

  get getAssessableIncome () {
    return $('//input[@aria-labelledby="personalInfo.assessableIncome"]//parent::div');
}
  
  get getPropertyOwnershipInput () {
    return $('//input[@aria-labelledby="property.ownsPropertyOfResidence"]//parent::div');
  }

  get getHousingTypeInput () {
    return $('//input[@name="property.typeOfPropertyOfResidence"]//parent::div');
  }

  get getPropertAVInput () {
    return $('//input[@aria-labelledby="property.annualValue"]//parent::div');
  }

  get getOwnsMoreThanOnePropertYesInput () {
    return $('//input[@name="property.ownsMoreThanOneProperty" and @value="Yes"]//parent::label');
  }

  get getOwnsMoreThanOnePropertNoInput () {
    return $('//input[@name="property.ownsMoreThanOneProperty" and @value="No"]//parent::label');
  }

  get getShowBenefitsButton () {
    return $('//span[text()="Show estimated benefits"]//parent::button');
  }

  get getCashAssurancePackageModal() {
    return $('//span[text()="Cash - Assurance Package"]/parent::a/parent::div/parent::div/parent::div');
  }


  // Click the "Start" button
  async clickStartButton() {
    try {
      await this.getStartButton.waitForDisplayed({ timeout: 5000 });
      await this.getStartButton.waitForClickable({ timeout: 5000 });
      await this.getStartButton.scrollIntoView();
      await this.getStartButton.click();

    } catch(error) {
      await this.getStartButton.waitForDisplayed({ timeout: 5000 });
      await this.getStartButton.waitForClickable({ timeout: 5000 });
      await this.getStartButton.scrollIntoView();
      await this.getStartButton.click();
    }
    
  }

  // Fill in the calculator form fields
  async fillCalculatorForm(birthYear, income, housingType, propertyAV, propertyOwnership, ownsMoreThanOneProperty) {
    await this.getBirthYearInput.scrollIntoView();
    await this.getBirthYearInput.click();
    await this.getBirthYearInput.setValue(birthYear);
    await this.getBirthYearInput.addValue('\uE007');
    birthYear = parseInt(birthYear, 10);
    const currentYear = new Date().getFullYear();
    if (currentYear - birthYear >= 21) {
      await this.getAssessableIncome.click();
      const option = await $(`//div[contains(text(), "${income}")]`);
      await option.waitForExist();
      await option.click();
    }
    await this.getHousingTypeInput.click();
    const housingTypeOption = await $(`//div[contains(text(), "${housingType}")]`);
    await housingTypeOption.waitForExist();
    await housingTypeOption.click()
    if (housingType.toLowerCase() === "private property") {
      await this.getPropertAVInput.click();
      const option = await $(`//div[contains(text(), "${propertyAV}")]`);
      await option.waitForExist();
      await option.click();
    }
    await this.getPropertyOwnershipInput.click();
    const propertyOwnershipOption = await $(`//div[contains(text(), "${propertyOwnership}")]`);
    await propertyOwnershipOption.waitForExist();
    await propertyOwnershipOption.click(); // Click the option

    if(ownsMoreThanOneProperty === "true") {
      await this.getOwnsMoreThanOnePropertYesInput.waitForClickable({ timeout: 5000 });
      await this.getOwnsMoreThanOnePropertYesInput.click();
    } else {
      await this.getOwnsMoreThanOnePropertNoInput.click();
    }
  }

  // Click the "Show estimated benefits" button
  async clickShowBenefitsButton() {
    await this.getShowBenefitsButton.click();
  }

  async selectReferenceYear(year) {
    const option = await $(`//span[text()="${year}"]`);
      await option.waitForExist();
      await option.click()
  }

  // Get the payout amount displayed
  async getPayoutAmount(referenceYear) {
    let payoutText = '0'; // Default value
      try {
        payoutText = await $(`(//span[text()="Cash - Assurance Package"])[2]/parent::a/parent::div/parent::div/following-sibling::span[@id="${referenceYear}-You-payout"]`).getText();
          payoutText = payoutText.replace('$', '');
      } catch (error) {
        try {
          payoutText = await $(`(//span[text()="Cash - Assurance Package"])[1]/parent::a/parent::div/parent::div/following-sibling::span[@id="${referenceYear}-You-payout"]`).getText();
          payoutText = payoutText.replace('$', '');
        } catch {
          // Handle the error (if element is not found)
          console.log('Element not found, returning 0');
        }
      }
    return payoutText;
    }

    async isCashAssurncPackageDisplayed() {
      return await this.getCashAssurancePackageModal.isDisplayed();
    }
}

module.exports = new CalculatorPage();
