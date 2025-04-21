# Loan Risk Prediction Service

A Flask-based REST API service for predicting loan risk using machine learning. This service analyzes various loan application features to provide risk assessment and loan approval recommendations.

## Features

- RESTful API endpoints for loan risk predictions
- Comprehensive input validation and error handling
- Cross-Origin Resource Sharing (CORS) support
- Health check endpoint
- Detailed risk assessment with multiple metrics

## Prerequisites

- Python 3.8 or higher
- pip (Python package installer)

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Create and activate a virtual environment (recommended):
```bash
python -m venv venv
# On Windows
venv\Scripts\activate
# On Unix or MacOS
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Service

To start the service, run:
```bash
python ml_service/app.py
```

The service will start on `http://0.0.0.0:5001`

## API Documentation

### Health Check

**Endpoint:** `/health`  
**Method:** GET  
**Description:** Check if the service is running  
**Response:**
```json
{
    "status": "healthy",
    "message": "Service is running"
}
```

### Predict Loan Risk

**Endpoint:** `/predict`  
**Method:** POST  
**Description:** Analyze loan application and predict risk level  
**Request Body:**
```json
{
    "Age": 35,
    "Income": 75000,
    "LoanAmount": 250000,
    "CreditScore": 720,
    "MonthsEmployed": 48,
    "NumCreditLines": 3,
    "InterestRate": 4.5,
    "LoanTerm": 360,
    "DTIratio": 0.28,
    "Education": "Bachelors",
    "EmploymentStatus": "EMPLOYED",
    "MaritalStatus": "MARRIED",
    "HasMortgage": "NO",
    "HasDependents": "YES",
    "LoanPurpose": "HOME_PURCHASE",
    "HasCoSigner": "NO"
}
```

**Response:**
```json
{
    "risk_score": 35.5,
    "risk_level": "Medium",
    "default_probability": 0.15,
    "approval_recommendation": "Review"
}
```

**Risk Levels:**
- Low: Risk score ≤ 30
- Medium: Risk score between 30 and 60
- High: Risk score > 60

**Approval Recommendations:**
- Approve: Risk score ≤ 30
- Review: Risk score between 30 and 60
- Reject: Risk score > 60

## Error Handling

The service includes comprehensive error handling for various scenarios:

### 1. Missing Required Fields
```json
{
    "error": "Missing required fields",
    "message": "The following required fields are missing: Age, Income"
}
```
Status Code: 400

### 2. Invalid Field Types
```json
{
    "error": "Invalid field types",
    "message": "The following fields have invalid types: Age (expected float)"
}
```
Status Code: 400

### 3. Model Error
```json
{
    "error": "Model prediction error",
    "message": "Error occurred while making prediction"
}
```
Status Code: 500

## Development

### Project Structure
```
ml_service/
├── app.py          # Main Flask application
├── model.py        # Loan risk prediction model
├── requirements.txt # Project dependencies
└── README.md       # Documentation
```

### Model Features

The loan risk prediction model uses the following features:

**Numeric Features:**
- Age: Applicant's age
- Income: Annual income
- LoanAmount: Requested loan amount
- CreditScore: Credit score
- MonthsEmployed: Employment duration in months
- NumCreditLines: Number of credit lines
- InterestRate: Loan interest rate
- LoanTerm: Loan term in months
- DTIratio: Debt-to-income ratio

**Categorical Features:**
- Education: Education level
- EmploymentStatus: Current employment status
- MaritalStatus: Marital status
- HasMortgage: Whether applicant has a mortgage
- HasDependents: Whether applicant has dependents
- LoanPurpose: Purpose of the loan
- HasCoSigner: Whether loan has a co-signer

## License

[Add your license information here]

## Contributing

[Add contribution guidelines here] 