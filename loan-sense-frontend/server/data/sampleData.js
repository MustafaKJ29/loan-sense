const generateSampleData = () => {
  const loanPurposes = ['Home', 'Business', 'Education', 'Auto', 'Personal'];
  const educationLevels = ["High School", "Bachelor's", "Master's", "PhD"];
  const employmentTypes = ['full-time', 'part-time', 'self-employed', 'unemployed'];
  const maritalStatus = ['Single', 'Married', 'Divorced'];
  const names = [
    'John Smith', 'Emma Wilson', 'Michael Brown', 'Sarah Davis', 'James Johnson',
    'Lisa Anderson', 'Robert Taylor', 'Jennifer Martinez', 'William Thompson', 'Maria Garcia'
  ];

  const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  };

  const generateLoanId = (index) => `LOAN${String(index + 1).padStart(6, '0')}`;

  const sampleData = Array.from({ length: 20 }, (_, index) => {
    const loanAmount = getRandomNumber(10000, 500000);
    const income = getRandomNumber(30000, 200000);
    const createdAt = getRandomDate(new Date(2024, 0, 1), new Date());
    
    return {
      loanId: generateLoanId(index),
      name: getRandomElement(names),
      age: getRandomNumber(25, 60),
      income: income,
      loanAmount: loanAmount,
      creditScore: getRandomNumber(550, 850),
      monthsEmployed: getRandomNumber(12, 120),
      numCreditLines: getRandomNumber(1, 5),
      interestRate: (Math.random() * (15 - 5) + 5).toFixed(2),
      loanTerm: getRandomElement([12, 24, 36, 48, 60]),
      dtiRatio: ((loanAmount / income) * 100).toFixed(2),
      education: getRandomElement(educationLevels),
      employmentType: getRandomElement(employmentTypes),
      maritalStatus: getRandomElement(maritalStatus),
      hasMortgage: Math.random() < 0.5,
      hasDependents: Math.random() < 0.4,
      loanPurpose: getRandomElement(loanPurposes),
      hasCoSigner: Math.random() < 0.3,
      riskRating: getRandomNumber(20, 80),
      status: getRandomElement(['Pending', 'Approved', 'Rejected', 'Flagged for Review']),
      createdAt: createdAt,
      documents: [],
      notes: [],
      userId: `USER${String(index + 1).padStart(6, '0')}`
    };
  });

  return sampleData;
};

module.exports = { generateSampleData }; 