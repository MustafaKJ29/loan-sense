const predict_risk = (loanData) => {
  // Mock risk calculation based on various factors
  let riskScore = 50; // Base risk score

  // Credit score impact (higher is better)
  const creditScore = parseInt(loanData.creditScore) || 650;
  if (creditScore >= 750) riskScore -= 15;
  else if (creditScore >= 700) riskScore -= 10;
  else if (creditScore < 600) riskScore += 15;

  // Income to loan amount ratio impact
  const income = parseInt(loanData.income) || 50000;
  const loanAmount = parseInt(loanData.loanAmount) || 100000;
  const loanToIncomeRatio = loanAmount / income;
  if (loanToIncomeRatio <= 2) riskScore -= 10;
  else if (loanToIncomeRatio >= 4) riskScore += 15;

  // Employment stability impact
  const monthsEmployed = parseInt(loanData.monthsEmployed) || 0;
  if (monthsEmployed >= 60) riskScore -= 10;
  else if (monthsEmployed < 12) riskScore += 10;

  // DTI ratio impact
  const dtiRatio = parseFloat(loanData.dtiRatio) || 0.5;
  if (dtiRatio <= 0.3) riskScore -= 10;
  else if (dtiRatio >= 0.5) riskScore += 15;

  // Additional factors
  if (loanData.hasCoSigner) riskScore -= 5;
  if (loanData.hasMortgage) riskScore += 5;
  if (loanData.hasDependents) riskScore += 3;

  // Ensure risk score stays within bounds
  riskScore = Math.max(0, Math.min(100, riskScore));

  return {
    risk_rating: riskScore,
    risk_category: riskScore <= 30 ? 'Low' : riskScore <= 60 ? 'Medium' : 'High'
  };
};

module.exports = { predict_risk }; 