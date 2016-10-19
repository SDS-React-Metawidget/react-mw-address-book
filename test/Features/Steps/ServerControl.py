from behave import given, when, then
import time

@given('the server is running')
def server_is_up(context):
    try:
        context.server.get("localhost:3000")
        time.sleep(10)
    except:
        raise