// src/pages/CommunityGuidelines/CommunityGuidelines.tsx
import {
  CheckCircle,
  Favorite,
  Gavel,
  Groups,
  Report,
  Security,
  Support,
  VerifiedUser,
  Warning,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';

const CommunityGuidelines: React.FC = () => {
  const theme = useTheme();

  const principles = [
    {
      icon: <Favorite />,
      title: 'Be Respectful',
      description:
        'Treat all community members with kindness, respect, and empathy. Everyone deserves to feel welcome and safe.',
    },
    {
      icon: <VerifiedUser />,
      title: 'Be Authentic',
      description:
        'Use your real identity and provide accurate information. Authentic connections make stronger communities.',
    },
    {
      icon: <Security />,
      title: 'Keep It Safe',
      description:
        'Prioritise the safety and wellbeing of all participants. Report any concerning behaviour immediately.',
    },
    {
      icon: <Groups />,
      title: 'Be Inclusive',
      description:
        'Welcome people from all backgrounds. Diversity makes our community stronger and more vibrant.',
    },
  ];

  const prohibited = [
    {
      title: 'Harassment and Abuse',
      items: [
        'Bullying, intimidation, or threatening behaviour',
        'Hate speech or discrimination based on identity',
        'Sexual harassment or unwanted advances',
        'Doxxing or sharing personal information without consent',
      ],
    },
    {
      title: 'Illegal and Harmful Content',
      items: [
        'Illegal activities or content',
        'Violence or threats of violence',
        'Self-harm or suicide content',
        'Dangerous or harmful activities',
      ],
    },
    {
      title: 'Spam and Misuse',
      items: [
        'Spam, excessive self-promotion, or commercial solicitation',
        'Fake accounts or impersonation',
        'Manipulation of platform features',
        'Copyright infringement or intellectual property violations',
      ],
    },
    {
      title: 'Inappropriate Content',
      items: [
        'Adult content or sexually explicit material',
        'Graphic violence or disturbing imagery',
        'Content that glorifies harmful behaviour',
        'Misinformation or deliberately false information',
      ],
    },
  ];

  const consequences = [
    {
      level: 'Warning',
      icon: <Warning color="warning" />,
      description:
        'First-time minor violations receive a warning and guidance on community standards.',
    },
    {
      level: 'Content Removal',
      icon: <Report color="error" />,
      description:
        'Violating content is removed, and the user is notified of the specific violation.',
    },
    {
      level: 'Temporary Suspension',
      icon: <Security color="error" />,
      description:
        'Repeated or serious violations result in temporary account suspension.',
    },
    {
      level: 'Permanent Ban',
      icon: <Gavel color="error" />,
      description:
        'Severe or repeated violations result in permanent removal from the platform.',
    },
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
          Community Guidelines
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}
        >
          Building a safe, inclusive, and vibrant community for everyone
        </Typography>
      </Box>

      <Alert severity="info" sx={{ mb: 6 }}>
        <Typography>
          Our community guidelines help create a positive environment where
          everyone can discover, create, and participate in amazing events. By
          using EventConnect, you agree to follow these guidelines.
        </Typography>
      </Alert>

      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
          Our Core Principles
        </Typography>
        <Grid container spacing={4}>
          {principles.map((principle, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
                <CardContent>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {React.cloneElement(principle.icon, {
                      sx: { fontSize: 48 },
                    })}
                  </Box>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    {principle.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {principle.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
          What's Not Allowed
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 4, textAlign: 'center', color: 'text.secondary' }}
        >
          The following behaviours and content are prohibited on EventConnect:
        </Typography>
        <Grid container spacing={4}>
          {prohibited.map((category, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, color: 'error.main' }}>
                    {category.title}
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    {category.items.map((item, idx) => (
                      <li key={idx}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {item}
                        </Typography>
                      </li>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
          Event-Specific Guidelines
        </Typography>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ p: 3, height: '100%' }}>
              <Typography
                variant="h6"
                sx={{ mb: 2, display: 'flex', alignItems: 'center' }}
              >
                <CheckCircle sx={{ mr: 1, color: 'success.main' }} />
                For Event Organisers
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <li>Provide accurate and complete event information</li>
                <li>
                  Ensure your event complies with local laws and regulations
                </li>
                <li>Communicate clearly with attendees about any changes</li>
                <li>Handle refunds and cancellations fairly and promptly</li>
                <li>Create inclusive and accessible events when possible</li>
                <li>
                  Respond to attendee questions and concerns professionally
                </li>
              </Box>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ p: 3, height: '100%' }}>
              <Typography
                variant="h6"
                sx={{ mb: 2, display: 'flex', alignItems: 'center' }}
              >
                <CheckCircle sx={{ mr: 1, color: 'success.main' }} />
                For Event Attendees
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <li>Respect event rules and organiser instructions</li>
                <li>
                  Be punctual and prepared for events you've registered for
                </li>
                <li>Treat fellow attendees with courtesy and respect</li>
                <li>Follow venue guidelines and safety protocols</li>
                <li>Provide honest and constructive feedback when requested</li>
                <li>
                  Report any issues or concerns to event organisers or
                  EventConnect
                </li>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
          Enforcement and Consequences
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 4, textAlign: 'center', color: 'text.secondary' }}
        >
          We take violations of our community guidelines seriously. Consequences
          may include:
        </Typography>
        <Grid container spacing={3}>
          {consequences.map((consequence, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card sx={{ textAlign: 'center', p: 2, height: '100%' }}>
                <CardContent>
                  <Box sx={{ mb: 2 }}>{consequence.icon}</Box>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    {consequence.level}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {consequence.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ bgcolor: 'background.default', borderRadius: 2, p: 4, mb: 8 }}>
        <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
          Reporting Violations
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
          If you encounter content or behaviour that violates our community
          guidelines, please report it immediately.
        </Typography>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Report sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                Report Button
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Use the report button on events, profiles, or messages
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Security sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                Safety Centre
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Visit our Safety Centre for resources and reporting tools
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Support sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                Contact Support
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email us at safety@eventconnect.co.uk for urgent issues
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Updates to Guidelines
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          We may update these community guidelines from time to time to reflect
          changes in our community or platform. We'll notify users of
          significant changes.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Last updated: 7 June 2025
        </Typography>
      </Box>
    </Container>
  );
};

export default CommunityGuidelines;
