import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const helpItems = [
  {
    question: "1. How do I apply for a loan?",
    answer: "Click on 'Apply for Loan' in the navigation menu. Fill out all required information in the application form, including personal details, income, and loan requirements. Submit the form for review."
  },
  {
    question: "2. What documents do I need to apply?",
    answer: "You'll need proof of identity (Aadhar/PAN), proof of income (salary slips/ITR), bank statements for the last 6 months, and proof of address. Additional documents may be required based on the loan type."
  },
  {
    question: "3. How is my loan risk calculated?",
    answer: "Our advanced ML model assesses various factors including credit score, income, employment history, debt-to-income ratio, and other financial parameters to determine your risk score."
  },
  {
    question: "4. What are the interest rates?",
    answer: "Interest rates typically range from 8.5% to 15% per annum, depending on your credit score, income, loan amount, and tenure. Use our EMI calculator to estimate your monthly payments."
  },
  {
    question: "5. How long does the approval process take?",
    answer: "Most applications are processed within 2-3 business days. You'll receive updates on your application status via email and can check the status anytime by logging into your account."
  }
];

const Help = () => {
  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            Help Center
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 4 }}>
            Find answers to common questions about our loan application process, requirements, and services.
          </Typography>

          {helpItems.map((item, index) => (
            <Accordion key={index} sx={{ mb: 1 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  '&.Mui-expanded': {
                    minHeight: 48,
                    backgroundColor: 'rgba(0, 0, 0, 0.03)',
                  }
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" color="text.secondary">
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}

          <Box sx={{ mt: 4 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Need more help?
            </Typography>
            <Typography variant="body2">
              Contact our support team at support@loansense.com or call us at 1800-123-4567 (Mon-Fri, 9 AM - 6 PM).
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Help; 