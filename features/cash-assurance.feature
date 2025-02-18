Feature: Verify Cash - Assurance Package Payouts

  Scenario Outline: Verify payout for different users for own one or no property
    Given I open SupportGoWhere web page
    When I navigate to the calculator page
    Then I enter <birthYear>, <income>, <housingType>, <propertyAV>, <propertyOwnership>, <ownsMoreThanOneProperty>, <referenceYear> 
    Then I click Show estimated benefits
    Then I select the reference year tab as <referenceYear>
    Then I verify the Cash - Assurance Package <referenceYear>
    Examples:
      | birthYear | income                           | housingType                          | propertyAV       |  propertyOwnership               | ownsMoreThanOneProperty  | referenceYear |
      | 1987      | $34,000 and below or No income   | 3-room flat                          | N/A              |  Rented from HDB                 | false                    | 2026          |
      | 2000      | Between $34,001 and $100,000     | Executive/Multi-Generation flat      | N/A              |  Rented from Open market         | false                    | 2025          | 
      | 2004      | Above $100,000                   | Private property                     |$21,000 and below |  Rented from HDB                 | false                    | 2025          |

Scenario Outline: Verify payout for different users for own more than one property
    Given I open SupportGoWhere web page
    When I navigate to the calculator page
    Then I enter <birthYear>, <income>, <housingType>, <propertyAV>, <propertyOwnership>, <ownsMoreThanOneProperty>, <referenceYear> 
    Then I click Show estimated benefits
    Then I select the reference year tab as <referenceYear>
    Then I verify the Cash - Assurance Package <referenceYear>
    Examples:
      | birthYear | income                           | housingType                          | propertyAV       |  propertyOwnership               | ownsMoreThanOneProperty | referenceYear |
      | 1987      | $34,000 and below or No income   | 3-room flat                          | N/A              |  Rented from HDB                 | true                    | 2026          |
      | 2000      | Between $34,001 and $100,000     | Executive/Multi-Generation flat      | N/A              |  Rented from Open market         | true                    | 2026          | 
      | 2004      | Above $100,000                   | Private property                     |$21,000 and below |  Rented from HDB                 | true                    | 2025          | 

  Scenario Outline: Verify payout for users less than 20 of age
    Given I open SupportGoWhere web page
    When I navigate to the calculator page
    Then I enter <birthYear>, <income>, <housingType>, <propertyAV>, <propertyOwnership>, <ownsMoreThanOneProperty>, <referenceYear> 
    Then I click Show estimated benefits
    Then I select the reference year tab as <referenceYear>
    Then I verify the Cash - Assurance Package <referenceYear>
    Examples:
      | birthYear | income                           | housingType                          | propertyAV       |  propertyOwnership               | ownsMoreThanOneProperty | referenceYear |
      | 2006      | $34,000 and below or No income   | 3-room flat                          | N/A              |  Rented from HDB                 | true                    | 2026          |
      | 2008      | Between $34,001 and $100,000     | Executive/Multi-Generation flat      | N/A              |  Rented from Open market         | true                    | 2026          | 
      | 2009      | Above $100,000                   | Private property                     |$21,000 and below |  Rented from HDB                 | false                   | 2025          |   