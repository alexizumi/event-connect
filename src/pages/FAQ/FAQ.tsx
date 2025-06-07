// src/pages/FAQ/FAQ.tsx
import {
  Event,
  ExpandMore,
  Payment,
  Person,
  Search,
  Settings,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const theme = useTheme();

  const categories = [
    { id: 'all', label: 'All Questions', icon: <Search /> },
    { id: 'events', label: 'Events', icon: <Event /> },
    { id: 'account', label: 'Account', icon: <Person /> },
    { id: 'billing', label: 'Billing', icon: <Payment /> },
    { id: 'technical', label: 'Technical', icon: <Settings /> },
  ];

  const faqs = [
    {
      category: 'events',
      question: 'How do I create an event?',
      answer:
        'To create an event, log into your account and click the "Create Event" button. Fill in the event details including title, description, date, time, location, and ticket information. Once you\'ve reviewed everything, click "Publish Event" to make it live.',
    },
    {
      category: 'events',
      question: 'Can I edit my event after publishing?',
      answer:
        'Yes, you can edit most event details after publishing. However, some changes may require approval if tickets have already been sold. Major changes like date or venue should be communicated to attendees.',
    },
    {
      category: 'events',
      question: 'How do I cancel an event?',
      answer:
        'To cancel an event, go to your event dashboard, select the event, and click "Cancel Event". You\'ll need to provide a reason and choose how to handle refunds. All registered attendees will be automatically notified.',
    },
    {
      category: 'account',
      question: 'How do I create an account?',
      answer:
        'Click "Sign Up" in the top right corner, enter your email address and create a password. You\'ll receive a verification email to confirm your account. Once verified, you can start creating and joining events.',
    },
    {
      category: 'account',
      question: 'I forgot my password. How do I reset it?',
      answer:
        'On the login page, click "Forgot Password" and enter your email address. We\'ll send you a reset link. Click the link in the email and follow the instructions to create a new password.',
    },
    {
      category: 'account',
      question: 'How do I delete my account?',
      answer:
        'To delete your account, go to Settings > Account > Delete Account. Please note that this action is permanent and cannot be undone. All your events and data will be permanently removed.',
    },
    {
      category: 'billing',
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit and debit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for larger transactions. All payments are processed securely through our payment partners.',
    },
    {
      category: 'billing',
      question: 'How do refunds work?',
      answer:
        "Refund policies depend on the event organiser's settings. Generally, refunds are processed within 5-10 business days to the original payment method. Some events may have no-refund policies, which will be clearly stated during purchase.",
    },
    {
      category: 'billing',
      question: 'Are there any fees for creating events?',
      answer:
        'Creating free events is completely free. For paid events, we charge a small service fee (typically 2-5% + payment processing fees). The exact fee structure is shown before you publish your event.',
    },
    {
      category: 'technical',
      question: 'The website is not loading properly. What should I do?',
      answer:
        "Try refreshing the page, clearing your browser cache, or using a different browser. If the problem persists, check our status page or contact support with details about your browser and the issue you're experiencing.",
    },
    {
      category: 'technical',
      question: 'Can I use EventConnect on my mobile device?',
      answer:
        'Yes! EventConnect is fully responsive and works great on mobile devices. You can also download our mobile app from the App Store or Google Play for the best mobile experience.',
    },
    {
      category: 'technical',
      question: 'How do I integrate EventConnect with my website?',
      answer:
        'We offer several integration options including embeddable widgets, API access, and WordPress plugins. Check our Developer Documentation or contact our technical team for assistance with custom integrations.',
    },
  ];

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 'bold',
            mb: 3,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Frequently Asked Questions
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}
        >
          Find answers to common questions about EventConnect
        </Typography>

        <TextField
          fullWidth
          placeholder="Search for answers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ maxWidth: 500, mx: 'auto' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            justifyContent: 'center',
          }}
        >
          {categories.map((category) => (
            <Chip
              key={category.id}
              icon={category.icon}
              label={category.label}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? 'filled' : 'outlined'}
              color={selectedCategory === category.id ? 'primary' : 'default'}
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Box>
      </Box>

      <Box>
        {filteredFAQs.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No questions found matching your search.
            </Typography>
          </Box>
        ) : (
          filteredFAQs.map((faq, index) => (
            <Accordion key={index} sx={{ mb: 1 }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </Box>

      <Box
        sx={{
          mt: 8,
          textAlign: 'center',
          bgcolor: 'grey.50',
          borderRadius: 2,
          p: 4,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Still have questions?
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Can't find the answer you're looking for? Our support team is here to
          help.
        </Typography>
        <Typography>
          Email us at{' '}
          <a
            href="mailto:support@eventconnect.co.uk"
            style={{ color: '#1976d2' }}
          >
            support@eventconnect.co.uk
          </a>{' '}
          or visit our{' '}
          <a href="/contact" style={{ color: '#1976d2' }}>
            contact page
          </a>
        </Typography>
      </Box>
    </Container>
  );
};

export default FAQ;
