import numpy as np
import pandas as pd
from xgboost import XGBClassifier
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

class LoanRiskModel:
    def __init__(self):
        self.model = None
        self.preprocessor = None
        self.feature_names = None
        
        # Define feature groups
        self.numeric_features = [
            'Age', 'Income', 'LoanAmount', 'CreditScore', 'MonthsEmployed',
            'NumCreditLines', 'InterestRate', 'LoanTerm', 'DTIratio'
        ]
        
        self.categorical_features = [
            'Education', 'EmploymentStatus', 'MaritalStatus', 'HasMortgage',
            'HasDependents', 'LoanPurpose', 'HasCoSigner'
        ]

    def create_preprocessor(self):
        numeric_transformer = StandardScaler()
        categorical_transformer = OneHotEncoder(drop='first', sparse_output=False)

        self.preprocessor = ColumnTransformer(
            transformers=[
                ('num', numeric_transformer, self.numeric_features),
                ('cat', categorical_transformer, self.categorical_features)
            ])

    def create_model(self):
        self.model = XGBClassifier(
            n_estimators=100,
            learning_rate=0.1,
            max_depth=4,
            min_child_weight=2,
            subsample=0.8,
            colsample_bytree=0.8,
            gamma=0.1,
            objective='binary:logistic',
            random_state=42
        )

    def calculate_risk_score(self, features, preprocessed_features):
        # Base risk from model probability
        default_prob = self.model.predict_proba(preprocessed_features)[0][1]
        base_risk = default_prob * 100

        # Extract original features from input
        df = features
        
        # Credit Score Component (30%)
        credit_score = df['CreditScore'].values[0]
        if credit_score < 550:
            credit_risk = 100
        elif credit_score < 650:
            credit_risk = 50
        else:
            credit_risk = 0
        
        # DTI Component (20%)
        dti = df['DTIratio'].values[0]
        if dti > 0.65:
            dti_risk = 100
        elif dti > 0.43:
            dti_risk = 50
        else:
            dti_risk = 0
        
        # Employment Component (15%)
        months_employed = df['MonthsEmployed'].values[0]
        employment_risk = max(0, (120 - months_employed) / 120 * 100)
        
        # Loan Amount to Income Ratio Component (15%)
        lai_ratio = df['LoanAmount'].values[0] / df['Income'].values[0]
        lai_risk = min(100, lai_ratio * 100)
        
        # Calculate weighted risk score
        final_risk = (
            0.20 * base_risk +
            0.30 * credit_risk +
            0.20 * dti_risk +
            0.15 * employment_risk +
            0.15 * lai_risk
        )
        
        return min(100, max(0, final_risk))

    def predict_risk(self, features):
        # Convert categorical columns to category dtype
        for col in self.categorical_features:
            if col in features.columns:
                features[col] = features[col].astype('category')
        
        # Preprocess features
        preprocessed_features = self.preprocessor.transform(features)
        
        # Make prediction
        default_prob = self.model.predict_proba(preprocessed_features)[0][1]
        risk_score = self.calculate_risk_score(features, preprocessed_features)
        
        return {
            'risk_score': risk_score,
            'risk_level': 'High' if risk_score > 60 else 'Medium' if risk_score > 30 else 'Low',
            'default_probability': default_prob,
            'approval_recommendation': 'Reject' if risk_score > 60 else 'Review' if risk_score > 30 else 'Approve'
        }

    def fit(self, X, y):
        # Create and fit preprocessor
        self.create_preprocessor()
        X_transformed = self.preprocessor.fit_transform(X)
        
        # Create and fit model
        self.create_model()
        self.model.fit(X_transformed, y)
        
        # Store feature names
        self.feature_names = (
            self.numeric_features +
            self.preprocessor.named_transformers_['cat'].get_feature_names_out(
                self.categorical_features
            ).tolist()
        ) 