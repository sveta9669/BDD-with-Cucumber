@ui @navigation
Feature: UI-3 Get Started button navigation

  @get-started
  Scenario: Clicking Get Started navigates to the Docs page
    Given I am on the Playwright main page
    When I click the "Get started" button
    Then the URL should contain "/docs/intro"
