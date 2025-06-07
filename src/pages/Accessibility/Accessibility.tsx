// src/pages/Accessibility/Accessibility.tsx
import {
  Accessibility,
  Feedback,
  Hearing,
  Language,
  Speed,
  Support,
  TouchApp,
  Visibility,
} from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';

const AccessibilityPage: React.FC = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <Visibility />,
      title: 'Visual Accessibility',
      items: [
        'High contrast colour schemes',
        'Scalable text up to 200%',
        'Alternative text for all images',
        'Clear visual hierarchy',
        'Colour-blind friendly design',
      ],
    },
    {
      icon: <Hearing />,
      title: 'Audio Accessibility',
      items: [
        'Captions for video content',
        'Visual indicators for audio alerts',
        'Text alternatives for audio content',
        'No auto-playing audio',
      ],
    },
    {
      icon: <TouchApp />,
      title: 'Motor Accessibility',
      items: [
        'Keyboard navigation support',
        'Large clickable areas',
        'No time-sensitive actions',
        'Drag and drop alternatives',
        'Voice control compatibility',
      ],
    },
    {
      icon: <Language />,
      title: 'Cognitive Accessibility',
      items: [
        'Clear, simple language',
        'Consistent navigation',
        'Error prevention and correction',
        'Progress indicators',
        'Help and documentation',
      ],
    },
  ];

  const standards = [
    'WCAG 2.1 Level AA compliance',
    'Section 508 standards',
    'EN 301 549 European standard',
    'Regular accessibility audits',
    'User testing with disabled users',
  ];

  const tools = [
    'Screen reader compatibility (NVDA, JAWS, VoiceOver)',
    'Voice recognition software support',
    'Switch navigation devices',
    'Eye-tracking software',
    'Magnification software',
  ];

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
          Accessibility Statement
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}
        >
          We're committed to making EventConnect accessible to everyone,
          regardless of ability or technology.
        </Typography>
      </Box>

      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
          Our Commitment
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.7 }}
        >
          At EventConnect, we believe that everyone should have equal access to
          information and functionality. We are committed to providing a website
          that is accessible to the widest possible audience, regardless of
          circumstance and ability.
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.7 }}
        >
          We adhere to the Web Content Accessibility Guidelines (WCAG) 2.1 at
          Level AA. These guidelines explain how to make web content accessible
          to people with a wide array of disabilities. Complying with those
          guidelines helps us ensure that the website is accessible to all
          people.
        </Typography>
      </Box>

      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
          Accessibility Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ color: 'primary.main', mr: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6">{feature.title}</Typography>
                  </Box>
                  <List dense>
                    {feature.items.map((item, idx) => (
                      <ListItem key={idx} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 24 }}>
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              bgcolor: 'primary.main',
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Grid container spacing={6} sx={{ mb: 8 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography
              variant="h5"
              sx={{ mb: 3, display: 'flex', alignItems: 'center' }}
            >
              <Speed sx={{ mr: 2, color: 'primary.main' }} />
              Standards We Follow
            </Typography>
            <List>
              {standards.map((standard, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon>
                    <Accessibility color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={standard} />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography
              variant="h5"
              sx={{ mb: 3, display: 'flex', alignItems: 'center' }}
            >
              <Support sx={{ mr: 2, color: 'primary.main' }} />
              Assistive Technologies
            </Typography>
            <List>
              {tools.map((tool, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon>
                    <TouchApp color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={tool} />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ bgcolor: 'background.default', borderRadius: 2, p: 4, mb: 8 }}>
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Feedback sx={{ mr: 2, color: 'primary.main' }} />
          We Want Your Feedback
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 3, textAlign: 'center', fontSize: '1.1rem' }}
        >
          We're always working to improve our accessibility. If you experience
          any difficulty accessing any part of this website, please don't
          hesitate to contact us.
        </Typography>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Email:</strong> accessibility@eventconnect.co.uk
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Phone:</strong> +44 20 7946 0958
          </Typography>
          <Typography variant="body1">
            <strong>Address:</strong> 123 Tech Street, London, EC2A 4DP, United
            Kingdom
          </Typography>
        </Box>
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          This accessibility statement was last updated on 7 June 2025.
        </Typography>
      </Box>
    </Container>
  );
};

export default AccessibilityPage;
