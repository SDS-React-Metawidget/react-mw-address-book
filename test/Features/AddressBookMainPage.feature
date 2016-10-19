@MAIN_PAGE
Feature: Address Book Main Page

Background: Check server is up
    Given the server is running

@MAIN_PAGE_01
Scenario: The page title is correct
    When we get the page title
    Then the title shall be "Hello, world"