def assertEquals(actual, expected):
    assert actual == expected, "Expected: %s, Actual: %s" % (expected, actual)

def assertNotEqual(actual, expected_not_equal):
    assert actual != expected_not_equal, "Expected Not Equal To: %s, Actual: %s" % (expected_not_equal, actual)

def assertLessThan(actual, upper_bound):
    assert actual < upper_bound, "Expected Less Than: %s, Actual: %s" % (upper_bound, actual)

def assertLessThanEqual(actual, upper_bound):
    assert actual <= upper_bound, "Expected Less Than Equal To: %s, Actual: %s" % (upper_bound, actual)

def assertGreaterThan(actual, lower_bound):
    assert actual > lower_bound, "Expected Greater Than: %s, Actual: %s" % (lower_bound, actual)

def assertGreaterThanEqual(actual, lower_bound):
    assert actual >= lower_bound, "Expected Greater Than Equal: %s, Actual: %s" % (lower_bound, actual)