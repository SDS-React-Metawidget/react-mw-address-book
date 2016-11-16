@SEARCH
Feature: Search Feature

    @SEARCH_1
    Scenario: When searching the addressbook, the correct item/s are displayed
        Given we navigate to the page "http://localhost:3001"
        When we enter "Ale" into the search bar
        Then the address list yields 1 item/s
        And the address list contact 1 shall be "Alex Dacre"

        When we enter "Jac" into the search bar
        Then the address list yields 1 item/s
        And the address list contact 1 shall be "Jacob Vorreiter"

        When we enter "Por" into the search bar
        Then the address list yields 1 item/s
        And the address list contact 1 shall be "Tim Porritt"

        When we enter "Che" into the search bar
        Then the address list yields 1 item/s
        And the address list contact 1 shall be "Wilson Chen"

        When we enter "Fra" into the search bar
        Then the address list yields 1 item/s
        And the address list contact 1 shall be "Ben Franzi"