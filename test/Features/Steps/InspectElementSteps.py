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