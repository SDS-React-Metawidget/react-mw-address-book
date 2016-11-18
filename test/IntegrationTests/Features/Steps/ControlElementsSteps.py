from behave import given, when, then
from AssertionMethods import *
import time

@when('the address list item "{data_id}" is clicked')
def click_address_item(context, data_id):
    address_list_item = context.server.find_element_by_xpath("//div[@class='address-list-item'][@data-contact='" + data_id + "']")
    assertExists(address_list_item)
    context.contact_name = address_list_item.text[0:address_list_item.text.find("\n")]
    address_list_item.click()
    time.sleep(1)

@when('the address list contact "{contact_name}" is clicked')
def click_contact_item(context, contact_name):
    contact_item = context.server.find_element_by_xpath("//div[@class='address-list-item']//span[text()='" + contact_name + "']")
    assertExists(contact_item)
    context.contact_name = contact_name
    contact_item.click()
    time.sleep(1)

@when('the back button is clicked')
def click_back_button(context):
    back_button = context.server.find_element_by_xpath("//button[@data-route='addressList']")
    assertExists(back_button)
    back_button.click()
    time.sleep(1)

@when('we edit the contact')
def click_edit_button(context):
    edit_button = context.server.find_element_by_xpath("//span[text()='Edit address']")
    assertExists(edit_button)
    clickable_button = edit_button.find_element_by_xpath("../../..")
    assertExists(clickable_button)
    clickable_button.click()
    time.sleep(0.5)

@when('we delete the contact')
def click_delete_button(context):
    delete_button = context.server.find_element_by_xpath("//span[text()='Delete']")
    assertExists(delete_button)
    delete_button.click()
    time.sleep(1)

@when('we add a new contact')
def click_add_contact_button(context):
    add_button = context.server.find_element_by_xpath("//button[@data-route='addAddress']")
    assertExists(add_button)
    add_button.click()
    time.sleep(1)

@when('the name is set to "{name}"')
def update_name(context, name):
    name_field = context.server.find_element_by_xpath("//input[@type='text'][@name='name']")
    name_field.send_keys("\b" * 100)
    time.sleep(0.2)
    name_field.send_keys(name)
    context.new_name = name
    time.sleep(1)

@when('the email is set to "{email}"')
def update_email(context, email):
    email_field = context.server.find_element_by_xpath("//input[@type='text'][@name='email']")
    email_field.send_keys("\b" * 100)
    time.sleep(0.2)
    email_field.send_keys(email)
    context.email = email
    time.sleep(1)

@when('the contact is saved')
def click_save_button(context):
    save_button = context.server.find_element_by_xpath("//button[@name='saveButton']")
    assertExists(save_button)
    save_button.click()
    time.sleep(1.5)

@when('we enter "{search_text}" into the search bar')
def search_using_text(context, search_text):
    search_input_field = context.server.find_element_by_xpath("//input[@id='contactSearch']")
    assertExists(search_input_field)
    search_input_field.send_keys("\b"*3)
    time.sleep(0.2)
    search_input_field.send_keys(str(search_text))
    time.sleep(1)