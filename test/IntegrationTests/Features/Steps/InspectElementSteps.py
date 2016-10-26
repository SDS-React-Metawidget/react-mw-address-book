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
    pass

@then('the address list contact {item} shall be "{name}"')
def check_contact_item(context, item, name):
    pass
