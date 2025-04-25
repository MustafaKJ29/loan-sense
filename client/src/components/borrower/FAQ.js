import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

const FAQ_DATA = {
  'what is a credit score': 'A number that shows how likely you are to repay borrowed money.',
  'why do you need my income information': 'To assess your ability to repay the loan.',
  'what is the loan term': 'The length of time you have to repay the loan.',
  'what is dti ratio': 'Your total monthly debt payments divided by your gross monthly income.',
  'what happens after i submit my application': 'We will review your information and contact you with the status.',
};

function FAQ() {
  const [messages, setMessages] = useState([
    {
      text: "Hi there! I'm your loan assistant. Ask me anything about loans, repayment ability, or risk assessment.",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      text: input,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Find answer in FAQ data
    const question = input.toLowerCase().trim();
    let botResponse = {
      text: "I'm sorry, I don't have an answer for that question. Please contact our customer care at 9876543210 for more assistance.",
      isBot: true,
    };

    for (const [key, value] of Object.entries(FAQ_DATA)) {
      if (question.includes(key)) {
        botResponse.text = value;
        break;
      }
    }

    setMessages((prev) => [...prev, botResponse]);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Loan Assistant
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Get quick answers to your loan-related questions
      </Typography>

      <Card>
        <CardContent>
          <Box sx={{ height: '60vh', display: 'flex', flexDirection: 'column' }}>
            <Paper
              elevation={0}
              sx={{
                flex: 1,
                mb: 2,
                overflow: 'auto',
                bgcolor: 'background.default',
                p: 2,
              }}
            >
              <List>
                {messages.map((message, index) => (
                  <React.Fragment key={index}>
                    <ListItem
                      sx={{
                        justifyContent: message.isBot ? 'flex-start' : 'flex-end',
                      }}
                    >
                      <Paper
                        elevation={1}
                        sx={{
                          p: 2,
                          maxWidth: '70%',
                          bgcolor: message.isBot ? 'background.paper' : 'primary.main',
                        }}
                      >
                        <ListItemText
                          primary={message.text}
                          sx={{
                            '& .MuiListItemText-primary': {
                              color: message.isBot ? 'text.primary' : 'common.white',
                            },
                          }}
                        />
                      </Paper>
                    </ListItem>
                    {index < messages.length - 1 && (
                      <Divider variant="fullWidth" component="li" />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </Paper>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                placeholder="Ask a question about loans..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <IconButton
                color="primary"
                onClick={handleSend}
                disabled={!input.trim()}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default FAQ;