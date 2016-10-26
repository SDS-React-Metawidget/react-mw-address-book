@SEARCH
Feature: Search Feature

    @SEARCH_1
    Scenario: When searching the addressbook with "Ale" only one item is returned
        Given we navigate to the page "http://localhost:3001"
        When we enter "Jac" into the search bar
        Then the address list yields 1 item/s
        And the address list contact 1 shall be "Alex Dacre"