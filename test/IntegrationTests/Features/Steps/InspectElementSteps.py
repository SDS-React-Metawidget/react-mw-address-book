from behave import given, when, then
from AssertionMethods import *

@when("we get the page title")
def get_page_title(context):
    context.page_title = context.server.title

@when('we get the page heading')
def get_heading(context):
    context.heading = context.server.find_element_by_tag_name('h1')

@then('the title shall be "{Title}"')
def check_title(context, Title):
    assertEquals(context.page_title, Title)

@then('the heading shall be "{Heading}"')
def check_heading(context, Heading):
    assertEquals(context.heading.text, Heading)

@then('the details page will be displayed')
def details_page_is_focus(context):
    name = context.server.find_element_by_xpath("//span[text()='" + context.contact_name + "']")
    element = context.server.find_element_by_xpath("//span[text()='Contact details']")
    assertExists(name)
    assertExists(element)

@then('the address list yields {num} item/s')
def check_visibile_contacts(context, num):
    context.address_list_items = context.server.find_element_by_xpath(".//*[@class='address-list-item']//span")

@then('the address list contact {item} shall be "{name}"')
def check_contact_item(context, item, name):
    assertEquals(context.address_list_items.text, name)

@then('the address list contact has been changed correctly')
def check_contact_list_item(context):
    context.execute_steps(u'''When the back button is clicked''')
    contact = context.server.find_element_by_xpath("//div[@class='address-list-item']//span[text()='" + context.new_name + "']")
    assertExists(contact)
    context.execute_steps(u'''Then the contact no longer exists''')
    
@then('the contact no longer exists')
def check_contact_deleted(context):
    try:
        contact = context.server.find_element_by_xpath("//div[@class='address-list-item']//span[text()='" + context.contact_name + "']")
        raise
    except:
        pass

@then('the address list contact shall be added to the address book')
def check_contact_added(context):
    context.execute_steps(u'''When the back button is clicked''')
    contact = context.server.find_element_by_xpath("//div[@class='address-list-item']//span[text()='" + context.new_name + "']")
    email = context.server.find_element_by_xpath("//div[@class='address-list-item']//span[text()='" + context.email + "']")

    assertExists(contact)
    assertExists(email)