import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import xgboost as xgb
import joblib
from sklearn.metrics import roc_auc_score

# Load the data
data = pd.read_csv('../../../Loandata1.csv')

# Prepare features
categorical_columns = ['Education', 'EmploymentType', 'MaritalStatus', 'LoanPurpose']
boolean_columns = ['HasMortgage', 'HasDependents', 'HasCoSigner']

# Label encode categorical variables
label_encoders = {}
for column in categorical_columns:
    label_encoders[column] = LabelEncoder()
    data[column] = label_encoders[column].fit_transform(data[column])

# Convert boolean columns to int
for column in boolean_columns:
    data[column] = data[column].map({'Yes': 1, 'No': 0})

# Select features for the model
features = [
    'Age', 'Income', 'LoanAmount', 'CreditScore', 'MonthsEmployed',
    'DTIRatio', 'Education', 'EmploymentType', 'MaritalStatus',
    'HasMortgage', 'HasDependents', 'LoanPurpose', 'HasCoSigner'
]

X = data[features]
y = data['Default']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train XGBoost model
model = xgb.XGBClassifier(
    n_estimators=100,
    learning_rate=0.1,
    max_depth=4,
    min_child_weight=6,
    gamma=0,
    subsample=0.8,
    colsample_bytree=0.8,
    objective='binary:logistic',
    random_state=42
)

model.fit(X_train, y_train)

# Save the model and label encoders
joblib.dump(model, 'xgboost_model.joblib')
joblib.dump(label_encoders, 'label_encoders.joblib')

# Calculate feature importance
importance = model.feature_importances_
feature_importance = pd.DataFrame({
    'feature': features,
    'importance': importance
})
feature_importance = feature_importance.sort_values('importance', ascending=False)

print("\nFeature Importance:")
print(feature_importance)

# Evaluate the model
train_pred = model.predict_proba(X_train)[:, 1]
test_pred = model.predict_proba(X_test)[:, 1]

print("\nModel Performance:")
print(f"Train AUC: {roc_auc_score(y_train, train_pred):.4f}")
print(f"Test AUC: {roc_auc_score(y_test, test_pred):.4f}") 