@ui @navigation
Feature: UI-5 Search functionality

  @search
  Scenario: Search bar opens when the search button is clicked
    Given I am on the Playwright main page
    When I click the search button
    Then a search input should be visible
