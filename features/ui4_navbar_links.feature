@ui @smoke
Feature: UI-4 Navbar links are visible

  @navbar
  Scenario: Navigation bar contains Docs and API links
    Given I am on the Playwright main page
    Then I should see a navbar link with text "Docs"
    And I should see a navbar link with text "API"
