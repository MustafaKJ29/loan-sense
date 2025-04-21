from flask import Flask, request, jsonify
from flask_cors import CORS
from model import LoanRiskModel
from models.db import create_loan_application, get_loan_applications, update_loan_status, get_pending_applications
import os
from dotenv import load_dotenv
from datetime import datetime
import uuid
import joblib

load_dotenv()

app = Flask(__name__)
CORS(app)

# Load the trained model
try:
    risk_model = joblib.load('loan_risk_model.joblib')
    print("Successfully loaded the trained model")
except Exception as e:
    print(f"Error loading model: {e}")
    print("Training a new model...")
    from train_model import train_and_save_model
    train_and_save_model()
    risk_model = joblib.load('loan_risk_model.joblib')
    print("Successfully trained and loaded a new model")

model = LoanRiskModel()

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/loan/assess', methods=['POST'])
def assess_loan():
    try:
        data = request.json
        
        # Generate loan ID
        loan_id = f"Loan{len(get_loan_applications()) + 1:02d}"
        
        # Calculate risk score using the model
        risk_score = model.predict_risk(data)
        
        # Create loan application
        application = {
            'loanId': loan_id,
            'name': data['name'],
            'age': int(data['age']),
            'income': float(data['income']),
            'loanAmount': float(data['loanAmount']),
            'creditScore': int(data['creditScore']),
            'monthsEmployed': int(data['monthsEmployed']),
            'numCreditLines': int(data['numCreditLines']),
            'interestRate': float(data['interestRate']),
            'loanTerm': int(data['loanTerm']),
            'dtiRatio': float(data['dtiRatio']),
            'education': data['education'],
            'employmentType': data['employmentType'],
            'maritalStatus': data['maritalStatus'],
            'hasMortgage': data['hasMortgage'],
            'hasDependents': data['hasDependents'],
            'loanPurpose': data['loanPurpose'],
            'hasCoSigner': data['hasCoSigner'],
            'riskRating': round(risk_score * 100, 2),
            'status': 'Pending',
            'createdAt': datetime.now().isoformat()
        }
        
        create_loan_application(application)
        
        return jsonify({
            'success': True,
            'loanId': loan_id,
            'riskScore': risk_score
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 400

@app.route('/api/loan/applications', methods=['GET'])
def get_applications():
    try:
        applications = get_loan_applications()
        return jsonify(applications)
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 400

@app.route('/api/loan/status/<loan_id>', methods=['PUT'])
def update_status(loan_id):
    try:
        data = request.json
        update_loan_status(loan_id, data['status'])
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 400

@app.route('/applications/pending', methods=['GET'])
def get_pending():
    try:
        applications = get_pending_applications()
        for app in applications:
            app['_id'] = str(app['_id'])
        return jsonify(applications)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001) 