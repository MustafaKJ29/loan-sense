import unittest
import pandas as pd
import numpy as np
from ..model import LoanRiskModel

class TestLoanRiskModel(unittest.TestCase):
    def setUp(self):
        """Set up test fixtures before each test method."""
        self.model = LoanRiskModel()
        
    def test_risk_calculation_low_risk(self):
        """Test risk calculation for a low-risk application."""
        test_data = pd.DataFrame([{
            'Age': 45,
            'Income': 120000,
            'LoanAmount': 300000,
            'CreditScore': 780,
            'MonthsEmployed': 120,
            'NumCreditLines': 3,
            'InterestRate': 3.5,
            'LoanTerm': 360,
            'DTIratio': 0.28,
            'Education': 'Masters',
            'EmploymentStatus': 'EMPLOYED',
            'MaritalStatus': 'MARRIED',
            'HasMortgage': 'NO',
            'HasDependents': 'NO',
            'LoanPurpose': 'HOME_PURCHASE',
            'HasCoSigner': 'NO'
        }])
        
        result = self.model.predict_risk(test_data)
        
        self.assertLess(result['risk_score'], 30)
        self.assertEqual(result['risk_level'], 'Low')
        self.assertEqual(result['approval_recommendation'], 'Approve')
        
    def test_risk_calculation_high_risk(self):
        """Test risk calculation for a high-risk application."""
        test_data = pd.DataFrame([{
            'Age': 25,
            'Income': 35000,
            'LoanAmount': 300000,
            'CreditScore': 580,
            'MonthsEmployed': 12,
            'NumCreditLines': 1,
            'InterestRate': 8.5,
            'LoanTerm': 360,
            'DTIratio': 0.65,
            'Education': 'HighSchool',
            'EmploymentStatus': 'SELF_EMPLOYED',
            'MaritalStatus': 'SINGLE',
            'HasMortgage': 'NO',
            'HasDependents': 'YES',
            'LoanPurpose': 'DEBT_CONSOLIDATION',
            'HasCoSigner': 'NO'
        }])
        
        result = self.model.predict_risk(test_data)
        
        self.assertGreater(result['risk_score'], 60)
        self.assertEqual(result['risk_level'], 'High')
        self.assertEqual(result['approval_recommendation'], 'Reject')
        
    def test_risk_calculation_medium_risk(self):
        """Test risk calculation for a medium-risk application."""
        test_data = pd.DataFrame([{
            'Age': 32,
            'Income': 65000,
            'LoanAmount': 200000,
            'CreditScore': 680,
            'MonthsEmployed': 36,
            'NumCreditLines': 2,
            'InterestRate': 5.5,
            'LoanTerm': 360,
            'DTIratio': 0.45,
            'Education': 'Bachelors',
            'EmploymentStatus': 'EMPLOYED',
            'MaritalStatus': 'MARRIED',
            'HasMortgage': 'NO',
            'HasDependents': 'YES',
            'LoanPurpose': 'HOME_PURCHASE',
            'HasCoSigner': 'NO'
        }])
        
        result = self.model.predict_risk(test_data)
        
        self.assertGreater(result['risk_score'], 30)
        self.assertLess(result['risk_score'], 60)
        self.assertEqual(result['risk_level'], 'Medium')
        self.assertEqual(result['approval_recommendation'], 'Review')
        
    def test_invalid_credit_score(self):
        """Test handling of invalid credit score."""
        test_data = pd.DataFrame([{
            'Age': 35,
            'Income': 75000,
            'LoanAmount': 250000,
            'CreditScore': 900,  # Invalid credit score > 850
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
        }])
        
        with self.assertRaises(ValueError):
            self.model.predict_risk(test_data)
            
    def test_missing_features(self):
        """Test handling of missing features."""
        test_data = pd.DataFrame([{
            'Age': 35,
            'Income': 75000,
            # Missing LoanAmount
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
        }])
        
        with self.assertRaises(KeyError):
            self.model.predict_risk(test_data)

if __name__ == '__main__':
    unittest.main() 