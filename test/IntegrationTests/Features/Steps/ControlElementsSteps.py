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

@when('the back button is clicked')
def click_back_button(context):
    back_button = context.server.find_element_by_xpath("//button[@data-route='addressList']")
    assertExists(back_button)
    back_button.click()
    time.sleep(1)

@when('we enter "{search_text}" into the search bar')
def search_using_text(context, search_text):
    search_input_field = context.server.find_element_by_xpath("//input[@id='contactSearch']")
    assertExists(search_input_field)
    search_input_field.send_keys(str(search_text))
    time.sleep(1)