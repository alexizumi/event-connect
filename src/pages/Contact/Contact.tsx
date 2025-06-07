// src/pages/Contact/Contact.tsx
import {
  AccessTime,
  Email,
  LocationOn,
  Phone,
  Send,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This is just a simulation of form submission.
    setShowSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const contactInfo = [
    {
      icon: <Email sx={{ fontSize: 40 }} />,
      title: 'Email Us',
      details: ['hello@eventconnect.co.uk', 'support@eventconnect.co.uk'],
      description: "Send us an email and we'll respond within 24 hours",
    },
    {
      icon: <Phone sx={{ fontSize: 40 }} />,
      title: 'Call Us',
      details: ['+44 20 7946 0958'],
      description: 'Speak to our team Monday to Friday, 9am-5pm GMT',
    },
    {
      icon: <LocationOn sx={{ fontSize: 40 }} />,
      title: 'Visit Us',
      details: ['123 Tech Street', 'London, EC2A 4DP', 'United Kingdom'],
      description: 'Drop by our office for a chat (appointment preferred)',
    },
    {
      icon: <AccessTime sx={{ fontSize: 40 }} />,
      title: 'Business Hours',
      details: ['Monday - Friday: 9:00 AM - 5:00 PM', 'Weekend: Closed'],
      description: 'We aim to respond to all enquiries within one business day',
    },
  ];

  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
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
          Get in Touch
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: 'auto' }}
        >
          We'd love to hear from you. Send us a message and we'll respond as
          soon as possible.
        </Typography>
      </Box>

      <Grid container spacing={6}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" sx={{ mb: 4 }}>
            Contact Information
          </Typography>
          <Grid container spacing={3}>
            {contactInfo.map((info, index) => (
              <Grid size={{ xs: 12, sm: 6 }} key={index}>
                <Card sx={{ height: '100%', p: 2 }}>
                  <CardContent>
                    <Box sx={{ color: 'primary.main', mb: 2 }}>{info.icon}</Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      {info.title}
                    </Typography>
                    {info.details.map((detail, idx) => (
                      <Typography key={idx} sx={{ mb: 0.5 }}>
                        {detail}
                      </Typography>
                    ))}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 2 }}
                    >
                      {info.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" sx={{ mb: 4 }}>
            Send us a Message
          </Typography>

          {showSuccess && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Thank you for your message! We'll get back to you soon.
            </Alert>
          )}

          <Card sx={{ p: 3 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={<Send />}
                    sx={{ mt: 2 }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
          Quick Answers
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                How quickly do you respond?
              </Typography>
              <Typography color="text.secondary">
                We aim to respond to all enquiries within 24 hours during
                business days. For urgent matters, please call us directly.
              </Typography>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Need technical support?
              </Typography>
              <Typography color="text.secondary">
                For technical issues, please email support@eventconnect.co.uk
                with details about your problem and we'll help you resolve it
                quickly.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Contact;
