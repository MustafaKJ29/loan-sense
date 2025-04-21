import requests
import json
import time

BASE_URL = "http://localhost:5001"

def test_api_endpoints():
    print("\nTesting API endpoints...")

    # Test 1: Health Check
    try:
        print("\n1. Testing health check endpoint...")
        response = requests.get(f"{BASE_URL}/health")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        assert response.status_code == 200
        print("✓ Health check successful")
    except Exception as e:
        print(f"✗ Health check failed: {e}")
        return

    # Test 2: Submit Loan Application (Risk Prediction)
    try:
        print("\n2. Testing loan application submission...")
        test_application = {
            "applicantName": "API Test User",
            "loanAmount": 75000,
            "creditScore": 720,
            "income": 90000,
            "employmentStatus": "EMPLOYED",
            "loanPurpose": "HOME_IMPROVEMENT",
            "monthlyDebt": 2000,
            "yearsEmployed": 5
        }
        
        response = requests.post(
            f"{BASE_URL}/predict",
            json=test_application
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        assert response.status_code == 200
        print("✓ Loan application submission successful")
    except Exception as e:
        print(f"✗ Loan application submission failed: {e}")
        return

    # Test 3: Get All Applications
    try:
        print("\n3. Testing get all applications...")
        response = requests.get(f"{BASE_URL}/applications")
        print(f"Status Code: {response.status_code}")
        applications = response.json()
        print(f"Total applications: {len(applications)}")
        if applications:
            print("Sample application:", json.dumps(applications[0], indent=2))
        assert response.status_code == 200
        print("✓ Get all applications successful")

        # Save the first application's loan ID for next tests
        if applications:
            loan_id = applications[0].get('loanId')
        else:
            print("No applications found to test with")
            return

    except Exception as e:
        print(f"✗ Get all applications failed: {e}")
        return

    # Test 4: Get Specific Application
    try:
        print(f"\n4. Testing get specific application (ID: {loan_id})...")
        response = requests.get(f"{BASE_URL}/applications/{loan_id}")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        assert response.status_code == 200
        print("✓ Get specific application successful")
    except Exception as e:
        print(f"✗ Get specific application failed: {e}")
        return

    # Test 5: Update Application Status
    try:
        print(f"\n5. Testing update application status (ID: {loan_id})...")
        update_data = {
            "status": "APPROVED",
            "notes": "Approved via API test"
        }
        response = requests.put(
            f"{BASE_URL}/applications/{loan_id}/status",
            json=update_data
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        assert response.status_code == 200
        print("✓ Update application status successful")
    except Exception as e:
        print(f"✗ Update application status failed: {e}")
        return

    # Test 6: Get Pending Applications
    try:
        print("\n6. Testing get pending applications...")
        response = requests.get(f"{BASE_URL}/applications/pending")
        print(f"Status Code: {response.status_code}")
        pending = response.json()
        print(f"Total pending applications: {len(pending)}")
        if pending:
            print("Sample pending application:", json.dumps(pending[0], indent=2))
        assert response.status_code == 200
        print("✓ Get pending applications successful")
    except Exception as e:
        print(f"✗ Get pending applications failed: {e}")
        return

    print("\nAll API tests completed successfully!")

if __name__ == "__main__":
    # Wait for the Flask server to start
    print("Waiting for Flask server to start...")
    time.sleep(2)
    test_api_endpoints()