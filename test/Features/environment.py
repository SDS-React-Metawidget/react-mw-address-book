import time, os, sys, inspect
from behave import *
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
__address_book_title__ = "Hello, world"

def before_all(context):
    context.server = webdriver.Chrome()
    try:
        context.server.get("localhost:3000")
        time.sleep(10)
    except:
        raise

def after_all(context):
    context.server.quit()

def before_feature(context, feature):
    pass

def after_feature(context, feature):
    pass

def before_scenario(context, scenario):
    pass

def after_scenario(context, scenario):
    pass

def before_step(context, step):
    pass

def after_step(context, step):
    pass