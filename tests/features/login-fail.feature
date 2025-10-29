Feature: User Authentication login fail

  Background:
    Given User navigates to the application
    And User click on the sign in button

  Scenario Outline: Login should not be success
    Given User enter the username as "<email>"
    Given User enter the password as "<password>"
    When User click on the login button
    But Login should be failed

    Examples:
      | email           | password    |
      | test1@gmail.com | password123 |
      | test2@gmail.com | 32112312312 |
