import unittest
import sys
import os

# Add the parent directory to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Import test modules
from tests.test_model import TestLoanRiskModel
from tests.test_api import TestLoanRiskAPI

def create_test_suite():
    """Create and return a test suite containing all tests."""
    suite = unittest.TestSuite()
    
    # Add test cases from test_model.py
    suite.addTests(unittest.TestLoader().loadTestsFromTestCase(TestLoanRiskModel))
    
    # Add test cases from test_api.py
    suite.addTests(unittest.TestLoader().loadTestsFromTestCase(TestLoanRiskAPI))
    
    return suite

if __name__ == '__main__':
    # Create and run the test suite
    runner = unittest.TextTestRunner(verbosity=2)
    test_suite = create_test_suite()
    result = runner.run(test_suite) 