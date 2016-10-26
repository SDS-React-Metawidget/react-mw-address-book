@SEARCH
Feature: Search Feature

    Scenario: Searching with Ale yield one result
        Given we navigate to the page "http://localhost:3001"
        When we enter "Ale" into the search field
        Then the search shall yield "1" item
        And the address list contact shall be "Alex Dacre"