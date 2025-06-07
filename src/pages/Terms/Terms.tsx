// src/pages/Terms/Terms.tsx
import { Box, Container, Divider, Typography, useTheme } from '@mui/material';
import React from 'react';

const Terms: React.FC = () => {
  const theme = useTheme();

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
          Terms & Conditions
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Last updated: 7 June 2025
        </Typography>
      </Box>

      <Box sx={{ '& h3': { mt: 4, mb: 2 }, '& p': { mb: 2, lineHeight: 1.7 } }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          1. Acceptance of Terms
        </Typography>
        <Typography paragraph>
          By accessing and using EventConnect ("the Service"), you accept and
          agree to be bound by the terms and provision of this agreement. If you
          do not agree to abide by the above, please do not use this service.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" sx={{ mb: 3 }}>
          2. Description of Service
        </Typography>
        <Typography paragraph>
          EventConnect is an online platform that allows users to create,
          discover, and manage events. The Service includes web-based tools for
          event creation, ticketing, promotion, and attendee management.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" sx={{ mb: 3 }}>
          3. User Accounts
        </Typography>
        <Typography paragraph>
          To access certain features of the Service, you must register for an
          account. You agree to:
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
          <li>
            Provide accurate and complete information when creating your account
          </li>
          <li>Maintain the security of your password and account</li>
          <li>Notify us immediately of any unauthorized use of your account</li>
          <li>
            Accept responsibility for all activities that occur under your
            account
          </li>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" sx={{ mb: 3 }}>
          4. Event Creation and Management
        </Typography>
        <Typography paragraph>
          As an event organiser, you are solely responsible for:
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
          <li>The accuracy of event information and descriptions</li>
          <li>Compliance with all applicable laws and regulations</li>
          <li>Obtaining necessary permits and licenses</li>
          <li>Ensuring event safety and security measures</li>
          <li>
            Handling refunds and cancellations according to your stated policy
          </li>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" sx={{ mb: 3 }}>
          5. Prohibited Uses
        </Typography>
        <Typography paragraph>You may not use our Service:</Typography>
        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
          <li>
            For any unlawful purpose or to solicit others to perform unlawful
            acts
          </li>
          <li>
            To violate any international, federal, provincial, or state
            regulations, rules, laws, or local ordinances
          </li>
          <li>
            To infringe upon or violate our intellectual property rights or the
            intellectual property rights of others
          </li>
          <li>
            To harass, abuse, insult, harm, defame, slander, disparage,
            intimidate, or discriminate
          </li>
          <li>To submit false or misleading information</li>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" sx={{ mb: 3 }}>
          6. Payment Terms
        </Typography>
        <Typography paragraph>
          For paid events, EventConnect charges a service fee as outlined in our
          pricing page. Payment processing is handled by third-party providers,
          and you agree to their terms of service.
        </Typography>
        <Typography paragraph>
          Event organisers are responsible for setting their own refund
          policies. EventConnect is not responsible for disputes between
          organisers and attendees regarding refunds.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" sx={{ mb: 3 }}>
          7. Intellectual Property
        </Typography>
        <Typography paragraph>
          The Service and its original content, features, and functionality are
          and will remain the exclusive property of EventConnect and its
          licensors. The Service is protected by copyright, trademark, and other
          laws.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" sx={{ mb: 3 }}>
          8. Privacy Policy
        </Typography>
        <Typography paragraph>
          Your privacy is important to us. Please review our Privacy Policy,
          which also governs your use of the Service, to understand our
          practices.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" sx={{ mb: 3 }}>
          9. Termination
        </Typography>
        <Typography paragraph>
          We may terminate or suspend your account and bar access to the Service
          immediately, without prior notice or liability, under our sole
          discretion, for any reason whatsoever and without limitation,
          including but not limited to a breach of the Terms.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" sx={{ mb: 3 }}>
          10. Disclaimer
        </Typography>
        <Typography paragraph>
          The information on this website is provided on an "as is" basis. To
          the fullest extent permitted by law, this Company excludes all
          representations, warranties, conditions and terms whether express or
          implied, statutory or otherwise.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" sx={{ mb: 3 }}>
          11. Limitation of Liability
        </Typography>
        <Typography paragraph>
          EventConnect shall not be liable for any indirect, incidental,
          special, consequential, or punitive damages, including without
          limitation, loss of profits, data, use, goodwill, or other intangible
          losses.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" sx={{ mb: 3 }}>
          12. Governing Law
        </Typography>
        <Typography paragraph>
          These Terms shall be interpreted and governed by the laws of England
          and Wales. Any disputes relating to these terms will be subject to the
          exclusive jurisdiction of the courts of England and Wales.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" sx={{ mb: 3 }}>
          13. Changes to Terms
        </Typography>
        <Typography paragraph>
          We reserve the right to modify or replace these Terms at any time. If
          a revision is material, we will provide at least 30 days notice prior
          to any new terms taking effect.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" sx={{ mb: 3 }}>
          14. Contact Information
        </Typography>
        <Typography paragraph>
          If you have any questions about these Terms & Conditions, please
          contact us:
        </Typography>
        <Box sx={{ pl: 2 }}>
          <Typography paragraph>
            <strong>Email:</strong> legal@eventconnect.co.uk
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

export default Terms;
