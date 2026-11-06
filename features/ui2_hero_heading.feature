@ui @smoke
Feature: UI-2 Verify homepage hero heading

  @heading
  Scenario: Homepage displays the main tagline
    Given I am on the Playwright main page
    Then I should see the heading "Playwright enables reliable web automation for testing, scripting, and AI agents."
