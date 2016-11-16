@UIFLOW
Feature: User Interface Flow
    
    @UIFLOW_1
    Scenario: Change to details page when item is clicked
        Given we navigate to the page "http://localhost:3001"
        When the address list contact "Alex Dacre" is clicked
        Then the details page will be displayed

        When the back button is clicked
        And the address list contact "Ben Franzi" is clicked
        Then the details page will be displayed

        When the back button is clicked
        And the address list contact "Jacob Vorreiter" is clicked
        Then the details page will be displayed

        When the back button is clicked
        And the address list contact "Tim Porritt" is clicked
        Then the details page will be displayed

        When the back button is clicked
        And the address list contact "Wilson Chen" is clicked
        Then the details page will be displayed