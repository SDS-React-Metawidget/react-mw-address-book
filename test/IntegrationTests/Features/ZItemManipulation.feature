@ITEM_MANIPULATION
Feature: Item Manipulation Feature

    @ITEM_MANIPULATION_1
    Scenario: Editing a contact updates the contact 
        Given we navigate to the page "http://localhost:3001"
        When the address list contact "Alex Dacre" is clicked
        Then the details page will be displayed

        When we edit the contact
        And the name is set to "Dacre Alex"
        And the contact is saved
        Then the address list contact has been changed correctly

    @ITEM_MANIPULATION_2
    Scenario: Deleting a contact should remove it from the address book
        Given we navigate to the page "http://localhost:3001"
        When the address list contact "Jacob Vorreiter" is clicked
        Then the details page will be displayed

        When we delete the contact
        Then the contact no longer exists

    @ITEM_MANIPULATION_3
    Scenario: Creating a new contact will successfully add that contact to the address book
        Given we navigate to the page "http://localhost:3001"
        When we add a new contact

        When the name is set to "Vorreiter Jacob"
        And the email is set to "vorreiter.l.jacob@student.uts.edu.au"
        And the contact is saved
        Then the address list contact shall be added to the address book