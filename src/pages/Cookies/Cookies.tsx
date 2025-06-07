// src/pages/Cookies/Cookies.tsx
import { Settings } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';

const Cookies: React.FC = () => {
  const theme = useTheme();

  const cookieTypes = [
    {
      name: 'Strictly Necessary',
      purpose: 'Essential for the website to function properly',
      examples: 'Authentication, security, form submission',
      duration: 'Session or up to 1 year',
      canDisable: 'No',
    },
    {
      name: 'Performance',
      purpose: 'Help us understand how visitors use our website',
      examples: 'Google Analytics, page load times',
      duration: 'Up to 2 years',
      canDisable: 'Yes',
    },
    {
      name: 'Functional',
      purpose: 'Remember your preferences and personalise experience',
      examples: 'Language settings, theme preferences',
      duration: 'Up to 1 year',
      canDisable: 'Yes',
    },
    {
      name: 'Marketing',
      purpose: 'Track visitors across websites for advertising',
      examples: 'Social media pixels, remarketing',
      duration: 'Up to 1 year',
      canDisable: 'Yes',
    },
  ];

  const specificCookies = [
    {
      name: 'eventconnect_session',
      purpose: 'Maintains your login session',
      type: 'Strictly Necessary',
      duration: 'Session',
      provider: 'EventConnect',
    },
    {
      name: '_ga, _ga_*',
      purpose: 'Google Analytics tracking',
      type: 'Performance',
      duration: '2 years',
      provider: 'Google',
    },
    {
      name: 'theme_preference',
      purpose: 'Remembers your dark/light mode choice',
      type: 'Functional',
      duration: '1 year',
      provider: 'EventConnect',
    },
    {
      name: 'cookie_consent',
      purpose: 'Stores your cookie preferences',
      type: 'Strictly Necessary',
      duration: '1 year',
      provider: 'EventConnect',
    },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
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
          Cookie Policy
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Last updated: 7 June 2025
        </Typography>
      </Box>

      <Alert
        severity="info"
        sx={{ mb: 4 }}
        action={
          <Button color="inherit" size="small" startIcon={<Settings />}>
            Manage Preferences
          </Button>
        }
      >
        You can manage your cookie preferences at any time using our cookie
        settings.
      </Alert>

      <Box sx={{ '& h3': { mt: 4, mb: 2 }, '& p': { mb: 2, lineHeight: 1.7 } }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          1. What Are Cookies?
        </Typography>
        <Typography paragraph>
          Cookies are small text files that are placed on your computer or
          mobile device when you visit a website. They are widely used to make
          websites work more efficiently and provide information to website
          owners.
        </Typography>
        <Typography paragraph>
          Cookies allow us to recognise you and remember important information
          that will make your use of our website more convenient (such as
          remembering your login details).
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" sx={{ mb: 3 }}>
          2. How We Use Cookies
        </Typography>
        <Typography paragraph>
          EventConnect uses cookies for several purposes:
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
          <li>
            <strong>Essential functionality:</strong> To enable core website
            features
          </li>
          <li>
            <strong>Security:</strong> To protect against fraud and maintain
            security
          </li>
          <li>
            <strong>Performance:</strong> To analyse how our website is used and
            improve performance
          </li>
          <li>
            <strong>Personalisation:</strong> To remember your preferences and
            customise your experience
          </li>
          <li>
            <strong>Marketing:</strong> To show you relevant advertisements
            (with your consent)
          </li>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" sx={{ mb: 3 }}>
          3. Types of Cookies We Use
        </Typography>

        <TableContainer component={Paper} sx={{ mt: 3, mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Cookie Type</strong>
                </TableCell>
                <TableCell>
                  <strong>Purpose</strong>
                </TableCell>
                <TableCell>
                  <strong>Examples</strong>
                </TableCell>
                <TableCell>
                  <strong>Duration</strong>
                </TableCell>
                <TableCell>
                  <strong>Can Disable?</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cookieTypes.map((cookie, index) => (
                <TableRow key={index}>
                  <TableCell>{cookie.name}</TableCell>
                  <TableCell>{cookie.purpose}</TableCell>
                  <TableCell>{cookie.examples}</TableCell>
                  <TableCell>{cookie.duration}</TableCell>
                  <TableCell>{cookie.canDisable}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" sx={{ mb: 3 }}>
          4. Specific Cookies We Use
        </Typography>

        <TableContainer component={Paper} sx={{ mt: 3, mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Cookie Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Purpose</strong>
                </TableCell>
                <TableCell>
                  <strong>Type</strong>
                </TableCell>
                <TableCell>
                  <strong>Duration</strong>
                </TableCell>
                <TableCell>
                  <strong>Provider</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {specificCookies.map((cookie, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <code>{cookie.name}</code>
                  </TableCell>
                  <TableCell>{cookie.purpose}</TableCell>
                  <TableCell>{cookie.type}</TableCell>
                  <TableCell>{cookie.duration}</TableCell>
                  <TableCell>{cookie.provider}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" sx={{ mb: 3 }}>
          5. Third-Party Cookies
        </Typography>
        <Typography paragraph>
          We use several third-party services that may set their own cookies:
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
          <li>
            <strong>Google Analytics:</strong> To understand how visitors use
            our website
          </li>
          <li>
            <strong>Stripe:</strong> For secure payment processing
          </li>
          <li>
            <strong>Social Media Platforms:</strong> For social sharing and
            login functionality
          </li>
          <li>
            <strong>Customer Support:</strong> For live chat and support ticket
            systems
          </li>
        </Box>
        <Typography paragraph>
          These third parties have their own privacy policies and cookie
          policies, which we encourage you to review.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" sx={{ mb: 3 }}>
          6. Managing Your Cookie Preferences
        </Typography>

        <Typography variant="h5" sx={{ mb: 2, mt: 3 }}>
          Cookie Settings
        </Typography>
        <Typography paragraph>
          You can manage your cookie preferences through our cookie banner that
          appears when you first visit our site, or by clicking the "Manage
          Preferences" button above.
        </Typography>

        <Typography variant="h5" sx={{ mb: 2, mt: 3 }}>
          Browser Settings
        </Typography>
        <Typography paragraph>
          You can also control cookies through your browser settings:
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
          <li>
            <strong>Chrome:</strong> Settings → Privacy and security → Cookies
            and other site data
          </li>
          <li>
            <strong>Firefox:</strong> Preferences → Privacy & Security → Cookies
            and Site Data
          </li>
          <li>
            <strong>Safari:</strong> Preferences → Privacy → Manage Website Data
          </li>
          <li>
            <strong>Edge:</strong> Settings → Cookies and site permissions →
            Cookies and site data
          </li>
        </Box>

        <Typography variant="h5" sx={{ mb: 2, mt: 3 }}>
          Opt-Out Links
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
          <li>
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              rel="noopener noreferrer"
            >
              Google Analytics Opt-out
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/settings?tab=ads"
              rel="noopener noreferrer"
            >
              Facebook Ad Preferences
            </a>
          </li>
          <li>
            <a href="https://optout.aboutads.info/" rel="noopener noreferrer">
              Digital Advertising Alliance Opt-out
            </a>
          </li>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" sx={{ mb: 3 }}>
          7. Impact of Disabling Cookies
        </Typography>
        <Typography paragraph>
          Please note that disabling certain cookies may impact your experience
          on our website:
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
          <li>You may need to re-enter information more frequently</li>
          <li>Some features may not work properly or at all</li>
          <li>Personalised content and recommendations may not be available</li>
          <li>We may not be able to remember your preferences</li>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" sx={{ mb: 3 }}>
          8. Updates to This Policy
        </Typography>
        <Typography paragraph>
          We may update this Cookie Policy from time to time to reflect changes
          in our practices or for legal reasons. We will notify you of any
          significant changes by posting a notice on our website.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" sx={{ mb: 3 }}>
          9. Contact Us
        </Typography>
        <Typography paragraph>
          If you have any questions about our use of cookies, please contact us:
        </Typography>
        <Box sx={{ pl: 2 }}>
          <Typography paragraph>
            <strong>Email:</strong> privacy@eventconnect.co.uk
          </Typography>
          <Typography paragraph>
            <strong>Address:</strong> EventConnect Ltd, 123 Tech Street, London,
            EC2A 4DP, United Kingdom
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Cookies;
