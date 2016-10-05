from behave import given, when, then

@given('the server is running')
def server_is_up(context):
    assert context.server.title == "Hello, world", "Server is not running"