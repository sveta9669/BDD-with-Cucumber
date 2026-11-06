@ui @smoke
Feature: UI-1 Check page title

  @title
  Scenario: Check page title
    Given I am on the Playwright main page
    Then I should see "Playwright" in the page title
