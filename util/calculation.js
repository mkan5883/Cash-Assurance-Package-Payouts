const payoutSchema = require('../data/payoutSchema');

function calculateCashAssurnacePackage(birthYear, income, ownsMoreThanOneProperty, referenceYear) {
    if (referenceYear - birthYear < 20) {
      return 0;
    }
    const propertyCategory = ownsMoreThanOneProperty === "true" ? ">1" : "0 to 1";
    let incomeCategory = "Above $100,000"; // Default to highest income
    if (income === "$34,000 and below or No income") {
      incomeCategory = "$34,000 and below or No income";
    } else if (income === "Between $34,001 and $100,000") {
      incomeCategory = "Between $34,001 and $100,000";
    }
    if (ownsMoreThanOneProperty === "true") {
      incomeCategory = "Regardless of AI"
    }
  
    // Fetch payout amount based on conditions
    return payoutSchema[propertyCategory][">=20"][incomeCategory]?.[referenceYear] || 0;
  }

  module.exports = {calculateCashAssurnacePackage};