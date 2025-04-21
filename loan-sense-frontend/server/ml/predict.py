import joblib
import numpy as np

class LoanRiskPredictor:
    def __init__(self):
        self.model = joblib.load('xgboost_model.joblib')
        self.label_encoders = joblib.load('label_encoders.joblib')
        
        self.features = [
            'Age', 'Income', 'LoanAmount', 'CreditScore', 'MonthsEmployed',
            'DTIRatio', 'Education', 'EmploymentType', 'MaritalStatus',
            'HasMortgage', 'HasDependents', 'LoanPurpose', 'HasCoSigner'
        ]
        
    def preprocess_input(self, data):
        # Convert categorical variables
        for column, encoder in self.label_encoders.items():
            if column in data:
                data[column] = encoder.transform([data[column]])[0]
        
        # Convert boolean variables to int
        boolean_columns = ['HasMortgage', 'HasDependents', 'HasCoSigner']
        for column in boolean_columns:
            if column in data:
                data[column] = 1 if data[column] == 'Yes' else 0
        
        # Create feature array in correct order
        features = np.zeros(len(self.features))
        for i, feature in enumerate(self.features):
            features[i] = data.get(feature, 0)
            
        return features.reshape(1, -1)
    
    def predict_risk(self, data):
        # Preprocess input data
        features = self.preprocess_input(data)
        
        # Get probability of default
        default_prob = self.model.predict_proba(features)[0][1]
        
        # Convert to risk rating (0-100)
        risk_rating = int(default_prob * 100)
        
        # Get risk category
        if risk_rating < 20:
            category = "Very Low Risk"
        elif risk_rating < 40:
            category = "Low Risk"
        elif risk_rating < 60:
            category = "Moderate Risk"
        elif risk_rating < 80:
            category = "High Risk"
        else:
            category = "Very High Risk"
            
        return {
            "risk_rating": risk_rating,
            "risk_category": category,
            "default_probability": float(default_prob)
        } 