@UIFLOW
Feature: User Interface Flow
    
    @UIFLOW_1
    Scenario: Change to details page when item is clicked
        Given we navigate to the page "http://localhost:3001"
        When the address list item "c0001" is clicked
        Then the details page will be displayed

        When the back button is clicked
        And the address list item "c0002" is clicked
        Then the details page will be displayed

        When the back button is clicked
        And the address list item "c0003" is clicked
        Then the details page will be displayed

        When the back button is clicked
        And the address list item "c0004" is clicked
        Then the details page will be displayed

        When the back button is clicked
        And the address list item "c0005" is clicked
        Then the details page will be displayed