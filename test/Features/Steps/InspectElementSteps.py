from behave import given, when, then

@when("we get the page title")
def get_page_title(context):
    context.page_title = context.server.title

@then('the title shall be "{Title}"')
def check_title(context,Title):
    assert context.page_title == Title, "Expected: %s, Actual: %s" % (Title, context.page_title)