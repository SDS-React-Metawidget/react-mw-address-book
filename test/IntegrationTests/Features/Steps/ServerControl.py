from behave import given, when, then
import time

@given('we navigate to the page "{page}"')
def server_is_up(context, page):
    try:
        context.server.get(page)
        time.sleep(5)
    except:
        raise