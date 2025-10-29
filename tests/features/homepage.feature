Feature: Homepage Functionality

  Scenario: Verify correct UI
    Given User navigates to the Homepage
    Then It should show all products
    And I could see the Products title
    And I could see the page description

  Scenario: Verify product is clickable
    Given User Navigates to Browserstack Homepage
    When User clicks on product card
    Then It should lead user to the product details page