Feature: Address Book Example Tests

Scenario: The page title is correct
    Given the server is running
    When we get the page title
    Then the title shall be "Hello, world"