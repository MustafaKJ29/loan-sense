import unittest
import json
from ..app import app

class TestLoanRiskAPI(unittest.TestCase):
    def setUp(self):
        """Set up test fixtures before each test method."""
        self.app = app.test_client()
        self.app.testing = True
        
    def test_health_check(self):
        """Test the health check endpoint."""
        response = self.app.get('/health')
        data = json.loads(response.data)
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['status'], 'healthy')
        self.assertEqual(data['message'], 'Service is running')
        
    def test_predict_valid_request(self):
        """Test prediction endpoint with valid data."""
        test_data = {
            'Age': 35,
            'Income': 75000,
            'LoanAmount': 250000,
            'CreditScore': 720,
            'MonthsEmployed': 48,
            'NumCreditLines': 3,
            'InterestRate': 4.5,
            'LoanTerm': 360,
            'DTIratio': 0.28,
            'Education': 'Bachelors',
            'EmploymentStatus': 'EMPLOYED',
            'MaritalStatus': 'MARRIED',
            'HasMortgage': 'NO',
            'HasDependents': 'YES',
            'LoanPurpose': 'HOME_PURCHASE',
            'HasCoSigner': 'NO'
        }
        
        response = self.app.post('/predict',
                               data=json.dumps(test_data),
                               content_type='application/json')
        data = json.loads(response.data)
        
        self.assertEqual(response.status_code, 200)
        self.assertIn('risk_score', data)
        self.assertIn('risk_level', data)
        self.assertIn('default_probability', data)
        self.assertIn('approval_recommendation', data)
        
    def test_predict_missing_fields(self):
        """Test prediction endpoint with missing fields."""
        test_data = {
            'Age': 35,
            'Income': 75000,
            # Missing LoanAmount and other required fields
        }
        
        response = self.app.post('/predict',
                               data=json.dumps(test_data),
                               content_type='application/json')
        data = json.loads(response.data)
        
        self.assertEqual(response.status_code, 400)
        self.assertEqual(data['error'], 'Missing required fields')
        self.assertIn('message', data)
        
    def test_predict_invalid_types(self):
        """Test prediction endpoint with invalid data types."""
        test_data = {
            'Age': "not_a_number",  # Invalid type for Age
            'Income': 75000,
            'LoanAmount': 250000,
            'CreditScore': 720,
            'MonthsEmployed': 48,
            'NumCreditLines': 3,
            'InterestRate': 4.5,
            'LoanTerm': 360,
            'DTIratio': 0.28,
            'Education': 'Bachelors',
            'EmploymentStatus': 'EMPLOYED',
            'MaritalStatus': 'MARRIED',
            'HasMortgage': 'NO',
            'HasDependents': 'YES',
            'LoanPurpose': 'HOME_PURCHASE',
            'HasCoSigner': 'NO'
        }
        
        response = self.app.post('/predict',
                               data=json.dumps(test_data),
                               content_type='application/json')
        data = json.loads(response.data)
        
        self.assertEqual(response.status_code, 400)
        self.assertEqual(data['error'], 'Invalid field types')
        self.assertIn('message', data)
        
    def test_predict_invalid_json(self):
        """Test prediction endpoint with invalid JSON."""
        response = self.app.post('/predict',
                               data='invalid json',
                               content_type='application/json')
        data = json.loads(response.data)
        
        self.assertEqual(response.status_code, 400)
        self.assertEqual(data['error'], 'Invalid request')
        self.assertIn('message', data)
        
    def test_predict_empty_request(self):
        """Test prediction endpoint with empty request."""
        response = self.app.post('/predict',
                               data=json.dumps({}),
                               content_type='application/json')
        data = json.loads(response.data)
        
        self.assertEqual(response.status_code, 400)
        self.assertEqual(data['error'], 'Missing required fields')
        self.assertIn('message', data)

if __name__ == '__main__':
    unittest.main() 