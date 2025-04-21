from models.db import (
    create_loan_application,
    get_loan_applications,
    get_loan_application,
    update_loan_status,
    get_pending_applications
)

def test_database_operations():
    # Test data
    test_application = {
        "loanId": "TEST123",
        "applicantName": "Test User",
        "loanAmount": 50000,
        "creditScore": 750,
        "income": 80000,
        "employmentStatus": "EMPLOYED",
        "loanPurpose": "HOME_PURCHASE",
        "riskScore": 0.85,
        "status": "PENDING"
    }

    print("\nTesting database operations...")
    
    # Test 1: Create loan application
    try:
        print("\n1. Creating test loan application...")
        loan_id = create_loan_application(test_application)
        print(f"✓ Successfully created loan application with ID: {loan_id}")
    except Exception as e:
        print(f"✗ Failed to create loan application: {e}")
        return

    # Test 2: Get all loan applications
    try:
        print("\n2. Retrieving all loan applications...")
        applications = get_loan_applications()
        print(f"✓ Successfully retrieved {len(applications)} applications")
        if applications:
            print("Sample application data:")
            print(applications[0])
    except Exception as e:
        print(f"✗ Failed to retrieve applications: {e}")
        return

    # Test 3: Get specific loan application
    try:
        print("\n3. Retrieving specific loan application...")
        application = get_loan_application("TEST123")
        if application:
            print("✓ Successfully retrieved test application")
            print("Application details:")
            print(application)
        else:
            print("✗ Test application not found")
    except Exception as e:
        print(f"✗ Failed to retrieve specific application: {e}")
        return

    # Test 4: Update loan status
    try:
        print("\n4. Updating loan status...")
        success = update_loan_status("TEST123", "APPROVED", "Test approval")
        if success:
            print("✓ Successfully updated loan status")
            # Verify the update
            updated_app = get_loan_application("TEST123")
            print("Updated application status:", updated_app.get('status'))
            print("Officer notes:", updated_app.get('officer_notes'))
        else:
            print("✗ Failed to update loan status")
    except Exception as e:
        print(f"✗ Failed to update loan status: {e}")
        return

    # Test 5: Get pending applications
    try:
        print("\n5. Retrieving pending applications...")
        pending = get_pending_applications()
        print(f"✓ Successfully retrieved {len(pending)} pending applications")
        if pending:
            print("Pending applications:")
            for app in pending:
                print(f"- {app.get('loanId')}: {app.get('status')}")
    except Exception as e:
        print(f"✗ Failed to retrieve pending applications: {e}")
        return

    print("\nAll database tests completed successfully!")

if __name__ == "__main__":
    test_database_operations() 