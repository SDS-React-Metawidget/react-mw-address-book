@MAIN_PAGE
Feature: Address Book Main Page

@MAIN_PAGE_01
Scenario: The page title is correct
    Given we navigate to the page "http://localhost:3001"
    When we get the page title
    Then the title shall be "React Metawidget Address Book"

@MAIN_PAGE_02
Scenario: The page heading is correct
    Given we navigate to the page "http://localhost:3001"
    When we get the page heading
    Then the heading shall be "MetaWidget Address Book"