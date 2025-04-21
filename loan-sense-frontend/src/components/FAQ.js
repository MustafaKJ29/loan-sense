import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import PhoneIcon from '@mui/icons-material/Phone';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

const faqData = [
  {
    question: "What is a Credit Score?",
    answer: "A number that shows how likely you are to repay borrowed money."
  },
  {
    question: "Why do you need my Income information?",
    answer: "To assess your ability to repay the loan."
  },
  {
    question: "What is the Loan Term?",
    answer: "The length of time you have to repay the loan."
  },
  {
    question: "What is DTI Ratio?",
    answer: "Your total monthly debt payments divided by your gross monthly income."
  },
  {
    question: "What happens after I submit my application?",
    answer: "We will review your information and contact you with the status."
  }
];

const FAQ = () => {
  const [chatMessages, setChatMessages] = useState([
    { text: "Hello! How can I help you today? You can ask me about credit scores, income requirements, loan terms, or anything else!", type: 'bot' }
  ]);
  const [userInput, setUserInput] = useState('');

  const findAnswer = (question) => {
    const lowerQuestion = question.toLowerCase();
    for (const faq of faqData) {
      if (faq.question.toLowerCase().includes(lowerQuestion) ||
          lowerQuestion.includes(faq.question.toLowerCase()) ||
          lowerQuestion.includes(faq.answer.toLowerCase())) {
        return faq.answer;
      }
    }
    return "I'm sorry, I couldn't find a specific answer to that question. Please try rephrasing or contact our customer service for more help.";
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Add user message
    const newMessages = [
      ...chatMessages,
      { text: userInput, type: 'user' }
    ];

    // Add bot response
    const botResponse = findAnswer(userInput);
    newMessages.push({ text: botResponse, type: 'bot' });

    setChatMessages(newMessages);
    setUserInput('');
  };

  return (
    <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <QuestionAnswerIcon /> Frequently Asked Questions
      </Typography>

      {/* FAQ Accordions */}
      <Box sx={{ mb: 4 }}>
        {faqData.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight="medium">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* Chatbot Interface */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Chat with our Bot
      </Typography>
      <Paper 
        variant="outlined" 
        sx={{ 
          height: 300, 
          mb: 2, 
          p: 2,
          overflow: 'auto',
          backgroundColor: '#f8f9fa'
        }}
      >
        <List>
          {chatMessages.map((message, index) => (
            <ListItem
              key={index}
              sx={{
                justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                mb: 1,
              }}
            >
              <Paper
                sx={{
                  p: 1.5,
                  backgroundColor: message.type === 'user' ? 'primary.main' : 'white',
                  color: message.type === 'user' ? 'white' : 'text.primary',
                  maxWidth: '80%',
                }}
              >
                <ListItemText primary={message.text} />
              </Paper>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Chat Input */}
      <form onSubmit={handleSendMessage}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            placeholder="Type your question here..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            size="small"
          />
          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
            disabled={!userInput.trim()}
          >
            Send
          </Button>
        </Box>
      </form>

      {/* Contact Information */}
      <Divider sx={{ my: 4 }} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          p: 2,
          backgroundColor: 'primary.light',
          borderRadius: 1,
          color: 'white',
        }}
      >
        <PhoneIcon />
        <Typography variant="h6">
          Need help? Call 9876543210
        </Typography>
      </Box>
    </Paper>
  );
};

export default FAQ; 