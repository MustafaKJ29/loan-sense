import pandas as pd
import numpy as np
from model import LoanRiskModel
import joblib

def generate_sample_data(n_samples=1000):
    np.random.seed(42)
    
    data = {
        'Age': np.random.normal(35, 10, n_samples).astype(int),
        'Income': np.random.normal(70000, 30000, n_samples),
        'LoanAmount': np.random.normal(200000, 150000, n_samples),
        'CreditScore': np.random.normal(700, 100, n_samples),
        'MonthsEmployed': np.random.normal(60, 36, n_samples),
        'NumCreditLines': np.random.normal(3, 2, n_samples).astype(int),
        'InterestRate': np.random.normal(5, 2, n_samples),
        'LoanTerm': np.random.choice([12, 24, 36, 48, 60], n_samples),
        'DTIratio': np.random.normal(0.3, 0.1, n_samples),
        'Education': pd.Categorical(np.random.choice(['HighSchool', 'Bachelor', 'Master', 'PhD'], n_samples)),
        'EmploymentStatus': pd.Categorical(np.random.choice(['Employed', 'Self-Employed', 'Unemployed'], n_samples, p=[0.8, 0.15, 0.05])),
        'MaritalStatus': pd.Categorical(np.random.choice(['Single', 'Married', 'Divorced'], n_samples)),
        'HasMortgage': pd.Categorical(np.random.choice(['Yes', 'No'], n_samples)),
        'HasDependents': pd.Categorical(np.random.choice(['Yes', 'No'], n_samples)),
        'LoanPurpose': pd.Categorical(np.random.choice(['HomeImprovement', 'DebtConsolidation', 'Business', 'Other'], n_samples)),
        'HasCoSigner': pd.Categorical(np.random.choice(['Yes', 'No'], n_samples))
    }
    
    # Clean up the data
    df = pd.DataFrame(data)
    df['Age'] = df['Age'].clip(18, 80)
    df['CreditScore'] = df['CreditScore'].clip(300, 850)
    df['DTIratio'] = df['DTIratio'].clip(0, 1)
    df['Income'] = df['Income'].clip(0, None)
    df['LoanAmount'] = df['LoanAmount'].clip(0, None)
    df['MonthsEmployed'] = df['MonthsEmployed'].clip(0, None)
    df['NumCreditLines'] = df['NumCreditLines'].clip(0, None)
    df['InterestRate'] = df['InterestRate'].clip(0, None)
    
    # Generate target variable (loan default)
    # Higher probability of default if:
    # - Low credit score
    # - High DTI ratio
    # - Low income
    # - Unemployed
    default_prob = (
        (850 - df['CreditScore']) / 850 * 0.4 +
        df['DTIratio'] * 0.3 +
        (1 - df['Income'] / df['Income'].max()) * 0.2 +
        (df['EmploymentStatus'] == 'Unemployed').astype(int) * 0.1
    )
    
    y = (np.random.random(n_samples) < default_prob).astype(int)
    
    return df, y

def train_and_save_model():
    print("Generating sample training data...")
    X, y = generate_sample_data()
    
    print("Training model...")
    model = LoanRiskModel()
    model.fit(X, y)
    
    print("Saving model...")
    joblib.dump(model, 'loan_risk_model.joblib')
    print("Model saved successfully!")
    
    # Test prediction
    sample_input = pd.DataFrame([{
        'Age': 35,
        'Income': 75000,
        'LoanAmount': 200000,
        'CreditScore': 720,
        'MonthsEmployed': 48,
        'NumCreditLines': 3,
        'InterestRate': 4.5,
        'LoanTerm': 36,
        'DTIratio': 0.3,
        'Education': 'Bachelor',
        'EmploymentStatus': 'Employed',
        'MaritalStatus': 'Married',
        'HasMortgage': 'No',
        'HasDependents': 'Yes',
        'LoanPurpose': 'HomeImprovement',
        'HasCoSigner': 'No'
    }])
    
    # Convert categorical columns
    categorical_columns = [
        'Education', 'EmploymentStatus', 'MaritalStatus',
        'HasMortgage', 'HasDependents', 'LoanPurpose', 'HasCoSigner'
    ]
    for col in categorical_columns:
        sample_input[col] = sample_input[col].astype('category')
    
    print("\nTesting model with sample input...")
    prediction = model.predict_risk(sample_input)
    print("Sample prediction:", prediction)

if __name__ == "__main__":
    train_and_save_model() 