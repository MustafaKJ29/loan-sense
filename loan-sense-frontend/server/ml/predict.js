// Mock risk prediction function
function predict_risk(loanData) {
    // Simple risk calculation based on key factors
    let riskScore = 0;
    
    // Credit score impact (higher is better)
    if (loanData.creditScore >= 800) riskScore += 20;
    else if (loanData.creditScore >= 700) riskScore += 15;
    else if (loanData.creditScore >= 600) riskScore += 10;
    else riskScore += 5;
    
    // Income to loan ratio (higher is better)
    const incomeToLoanRatio = loanData.income / loanData.loanAmount;
    if (incomeToLoanRatio >= 0.5) riskScore += 20;
    else if (incomeToLoanRatio >= 0.3) riskScore += 15;
    else if (incomeToLoanRatio >= 0.2) riskScore += 10;
    else riskScore += 5;
    
    // DTI ratio impact (lower is better)
    if (loanData.dtiRatio <= 20) riskScore += 20;
    else if (loanData.dtiRatio <= 30) riskScore += 15;
    else if (loanData.dtiRatio <= 40) riskScore += 10;
    else riskScore += 5;
    
    // Employment stability
    if (loanData.monthsEmployed >= 60) riskScore += 20;
    else if (loanData.monthsEmployed >= 36) riskScore += 15;
    else if (loanData.monthsEmployed >= 12) riskScore += 10;
    else riskScore += 5;
    
    // Additional factors
    if (loanData.hasCoSigner === true) riskScore += 10;
    if (loanData.hasMortgage === false) riskScore += 5;
    if (loanData.hasDependents === false) riskScore += 5;
    
    // Calculate final risk rating (0-100)
    const riskRating = Math.min(100, Math.max(0, riskScore));
    
    // Determine risk category
    let riskCategory;
    if (riskRating >= 80) riskCategory = 'Low Risk';
    else if (riskRating >= 60) riskCategory = 'Medium Risk';
    else riskCategory = 'High Risk';
    
    return {
        risk_rating: riskRating,
        risk_category: riskCategory
    };
}

module.exports = {
    predict_risk
}; 