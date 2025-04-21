from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from datetime import datetime
import os
from dotenv import load_dotenv
import sys

load_dotenv()

# MongoDB connection
MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'loansense')

try:
    client = MongoClient(MONGO_URI)
    # The ismaster command is cheap and does not require auth.
    client.admin.command('ismaster')
    print("Successfully connected to MongoDB")
except ConnectionFailure as e:
    print(f"Failed to connect to MongoDB: {e}")
    sys.exit(1)

db = client[DB_NAME]

def create_loan_application(application_data):
    """Create a new loan application"""
    try:
        application_data['created_at'] = datetime.utcnow()
        application_data['status'] = 'PENDING'
        result = db.loan_applications.insert_one(application_data)
        return str(result.inserted_id)
    except Exception as e:
        print(f"Error creating loan application: {e}")
        raise

def get_loan_applications():
    """Get all loan applications"""
    try:
        return list(db.loan_applications.find())
    except Exception as e:
        print(f"Error retrieving loan applications: {e}")
        raise

def get_loan_application(loan_id):
    """Get a specific loan application"""
    try:
        return db.loan_applications.find_one({'loanId': loan_id})
    except Exception as e:
        print(f"Error retrieving loan application {loan_id}: {e}")
        raise

def update_loan_status(loan_id, status, officer_notes=None):
    """Update loan application status"""
    try:
        update_data = {
            'status': status,
            'updated_at': datetime.utcnow()
        }
        if officer_notes:
            update_data['officer_notes'] = officer_notes

        result = db.loan_applications.update_one(
            {'loanId': loan_id},
            {'$set': update_data}
        )
        return result.modified_count > 0
    except Exception as e:
        print(f"Error updating loan status for {loan_id}: {e}")
        raise

def get_pending_applications():
    """Get all pending loan applications"""
    try:
        return list(db.loan_applications.find({'status': 'PENDING'}))
    except Exception as e:
        print(f"Error retrieving pending applications: {e}")
        raise 