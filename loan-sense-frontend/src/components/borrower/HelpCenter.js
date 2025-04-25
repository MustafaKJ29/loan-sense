import React from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { ExpandMore, Help, Email, Phone, Chat } from '@mui/icons-material';

function HelpCenter() {
  const faqs = [
    {
      question: "How do I apply for a loan?",
      answer: "To apply for a loan, navigate to the 'Apply for Loan' section from your dashboard. Fill out the application form with your personal and financial information. Make sure to provide accurate information to speed up the approval process."
    },
    {
      question: "What documents do I need for a loan application?",
      answer: "Typically, you'll need: Government-issued ID, Proof of income (pay stubs or tax returns), Bank statements, Proof of address, and Employment verification. Additional documents may be required based on the loan type."
    },
    {
      question: "How long does the approval process take?",
      answer: "The loan approval process usually takes 2-3 business days. However, this can vary depending on the loan amount, type, and completeness of your application. You'll receive updates via email throughout the process."
    },
    {
      question: "What factors affect my loan approval?",
      answer: "Key factors include: Credit score, Income level, Employment history, Debt-to-income ratio, Loan purpose, and Existing loans. We consider all these factors to ensure responsible lending."
    },
    {
      question: "How is my interest rate determined?",
      answer: "Interest rates are determined based on several factors including your credit score, loan term, loan amount, and current market rates. Better credit scores typically qualify for lower interest rates."
    }
  ];

  const supportChannels = [
    {
      title: "Email Support",
      description: "Send us an email anytime",
      icon: Email,
      contact: "support@loansense.com"
    },
    {
      title: "Phone Support",
      description: "Available Mon-Fri, 9AM-5PM",
      icon: Phone,
      contact: "1-800-LOAN-HELP"
    },
    {
      title: "Live Chat",
      description: "Chat with our support team",
      icon: Chat,
      contact: "Available 24/7"
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Help Center
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" gutterBottom>
            Frequently Asked Questions
          </Typography>
          {faqs.map((faq, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls={`faq-content-${index}`}
                id={`faq-header-${index}`}
              >
                <Typography variant="subtitle1">
                  <Help sx={{ mr: 1, verticalAlign: 'middle', color: 'primary.main' }} />
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom>
            Contact Support
          </Typography>
          {supportChannels.map((channel, index) => {
            const IconComponent = channel.icon;
            return (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <IconComponent sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography variant="h6">
                      {channel.title}
                    </Typography>
                  </Box>
                  <Typography color="text.secondary" paragraph>
                    {channel.description}
                  </Typography>
                  <Typography variant="body1" color="primary">
                    {channel.contact}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
}

export default HelpCenter; 