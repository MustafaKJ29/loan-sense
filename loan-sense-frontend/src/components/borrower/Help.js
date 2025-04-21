import React from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    question: "What documents do I need for a loan application?",
    answer: "You'll need proof of identity (government-issued ID), proof of income (pay stubs, W-2s, tax returns), bank statements, and employment verification. Additional documents may be required based on the loan type and amount."
  },
  {
    question: "How is my loan interest rate determined?",
    answer: "Your interest rate is determined by several factors including your credit score, income, debt-to-income ratio, loan term, and current market rates. Better credit scores typically qualify for lower interest rates."
  },
  {
    question: "What is DTI (Debt-to-Income) ratio?",
    answer: "DTI ratio is your total monthly debt payments divided by your gross monthly income. It helps lenders evaluate your ability to manage monthly payments and repay debts. A lower DTI ratio is generally better."
  },
  {
    question: "How long does the loan approval process take?",
    answer: "The loan approval process typically takes 1-3 business days after submitting all required documents. Complex cases may take longer. You'll be notified of the decision via email."
  },
  {
    question: "Can I pay off my loan early?",
    answer: "Yes, you can pay off your loan early. There are no prepayment penalties. Early payments can help reduce the total interest paid over the loan term."
  },
  {
    question: "What factors affect my loan approval?",
    answer: "Key factors include credit score, income stability, employment history, debt-to-income ratio, and loan purpose. We also consider your credit history and current financial obligations."
  },
  {
    question: "How is my credit score used?",
    answer: "Your credit score helps assess creditworthiness and determine interest rates. Higher scores typically qualify for better rates. We consider scores from major credit bureaus."
  },
  {
    question: "What if I miss a payment?",
    answer: "Late payments may incur fees and negatively impact your credit score. Contact us immediately if you anticipate payment difficulties. We can discuss payment options and potential solutions."
  }
];

function Help() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom color="primary">
        Help Center
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Find answers to common questions about loan applications and processes.
      </Typography>

      <Card elevation={3}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Frequently Asked Questions
          </Typography>
          <Divider sx={{ mb: 3 }} />

          {faqs.map((faq, index) => (
            <Accordion key={index} sx={{ mb: 1 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <Typography variant="subtitle1" color="primary">
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" color="text.secondary">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}

          <Box sx={{ mt: 4 }}>
            <Typography variant="body1" color="text.secondary">
              Need more help? Contact our support team at support@loansense.com
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Help; 