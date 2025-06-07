// src/pages/Privacy/Privacy.tsx
import {
  Box,
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

const Privacy: React.FC = () => {
  const theme = useTheme();

  const dataTypes = [
    {
      type: 'Personal Information',
      data: 'Name, email address, phone number',
      purpose: 'Account creation and communication',
      retention: '3 years after account deletion',
    },
    {
      type: 'Event Data',
      data: 'Event details, attendee lists, preferences',
      purpose: 'Service provision and event management',
      retention: '2 years after event completion',
    },
    {
      type: 'Usage Data',
      data: 'IP address, browser type, pages visited',
      purpose: 'Analytics and service improvement',
      retention: '12 months',
    },
    {
      type: 'Payment Information',
      data: 'Billing address, payment method details',
      purpose: 'Transaction processing',
      retention: '7 years (legal requirement)',
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
          Privacy Policy
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Last updated: 7 June 2025
        </Typography>
      </Box>

      <Box sx={{ '& h3': { mt: 4, mb: 2 }, '& p': { mb: 2, lineHeight: 1.7 } }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          1. Introduction
        </Typography>
        <Typography paragraph>
          EventConnect ("we", "our", or "us") is committed to protecting your
          privacy. This Privacy Policy explains how we collect, use, disclose,
          and safeguard your information when you use our service.
        </Typography>
        <Typography paragraph>
          Please read this privacy policy carefully. If you do not agree with
          the terms of this privacy policy, please do not access the site.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" sx={{ mb: 3 }}>
          2. Information We Collect
        </Typography>

        <Typography variant="h5" sx={{ mb: 2, mt: 3 }}>
          Personal Data
        </Typography>
        <Typography paragraph>
          We may collect personally identifiable information, such as:
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
          <li>Name and contact information (email address, phone number)</li>
          <li>Demographic information (age, location)</li>
          <li>Payment and billing information</li>
          <li>Event preferences and interests</li>
          <li>Profile information and photos</li>
        </Box>

        <Typography variant="h5" sx={{ mb: 2, mt: 3 }}>
          Usage Data
        </Typography>
        <Typography paragraph>
          We automatically collect certain information when you visit our
          service:
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
          <li>IP address and browser type</li>
          <li>Pages visited and time spent on pages</li>
          <li>Device information and operating system</li>
          <li>Referral URLs and search terms</li>
          <li>Cookies and similar tracking technologies</li>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" sx={{ mb: 3 }}>
          3. How We Use Your Information
        </Typography>
        <Typography paragraph>
          We use the information we collect for various purposes:
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
          <li>To provide and maintain our service</li>
          <li>To process transactions and send related information</li>
          <li>To send you technical notices and support messages</li>
          <li>
            To communicate with you about events, updates, and promotional
            offers
          </li>
          <li>To personalise your experience and improve our service</li>
          <li>To monitor usage and analyse trends</li>
          <li>To detect and prevent fraud and abuse</li>
          <li>To comply with legal obligations</li>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" sx={{ mb: 3 }}>
          4. Data Retention
        </Typography>
        <Typography paragraph>
          We retain your personal information for as long as necessary to
          provide our services and comply with legal obligations:
        </Typography>

        <TableContainer component={Paper} sx={{ mt: 3, mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Data Type</strong>
                </TableCell>
                <TableCell>
                  <strong>Information</strong>
                </TableCell>
                <TableCell>
                  <strong>Purpose</strong>
                </TableCell>
                <TableCell>
                  <strong>Retention Period</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataTypes.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.data}</TableCell>
                  <TableCell>{row.purpose}</TableCell>
                  <TableCell>{row.retention}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" sx={{ mb: 3 }}>
          5. Information Sharing and Disclosure
        </Typography>
        <Typography paragraph>
          We do not sell, trade, or otherwise transfer your personal information
          to third parties except in the following circumstances:
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
          <li>
            <strong>Service Providers:</strong> We may share information with
            trusted third parties who assist us in operating our service
          </li>
          <li>
            <strong>Event Organisers:</strong> When you register for an event,
            we share necessary information with the organiser
          </li>
          <li>
            <strong>Legal Requirements:</strong> We may disclose information
            when required by law or to protect our rights
          </li>
          <li>
            <strong>Business Transfers:</strong> Information may be transferred
            in connection with a merger or acquisition
          </li>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" sx={{ mb: 3 }}>
          6. Data Security
        </Typography>
        <Typography paragraph>
          We implement appropriate technical and organisational security
          measures to protect your personal information:
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
          <li>Encryption of data in transit and at rest</li>
          <li>Regular security assessments and updates</li>
          <li>Access controls and authentication measures</li>
          <li>Employee training on data protection</li>
          <li>Secure payment processing through certified providers</li>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" sx={{ mb: 3 }}>
          7. Your Rights (GDPR)
        </Typography>
        <Typography paragraph>
          Under the General Data Protection Regulation (GDPR), you have the
          following rights:
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
          <li>
            <strong>Right of Access:</strong> Request copies of your personal
            data
          </li>
          <li>
            <strong>Right of Rectification:</strong> Request correction of
            inaccurate data
          </li>
          <li>
            <strong>Right of Erasure:</strong> Request deletion of your personal
            data
          </li>
          <li>
            <strong>Right of Portability:</strong> Request transfer of your data
          </li>
          <li>
            <strong>Right to Object:</strong> Object to processing of your
            personal data
          </li>
          <li>
            <strong>Right to Restriction:</strong> Request restriction of
            processing
          </li>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" sx={{ mb: 3 }}>
          8. Cookies and Tracking
        </Typography>
        <Typography paragraph>
          We use cookies and similar tracking technologies to enhance your
          experience. You can control cookie settings through your browser
          preferences. For more information, please see our Cookie Policy.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" sx={{ mb: 3 }}>
          9. International Data Transfers
        </Typography>
        <Typography paragraph>
          Your information may be transferred to and processed in countries
          other than your own. We ensure appropriate safeguards are in place to
          protect your data in accordance with GDPR requirements.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" sx={{ mb: 3 }}>
          10. Children's Privacy
        </Typography>
        <Typography paragraph>
          Our service is not intended for children under 13 years of age. We do
          not knowingly collect personal information from children under 13.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" sx={{ mb: 3 }}>
          11. Changes to This Privacy Policy
        </Typography>
        <Typography paragraph>
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on this page and
          updating the "Last updated" date.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" sx={{ mb: 3 }}>
          12. Contact Us
        </Typography>
        <Typography paragraph>
          If you have questions about this Privacy Policy or wish to exercise
          your rights, please contact us:
        </Typography>
        <Box sx={{ pl: 2 }}>
          <Typography paragraph>
            <strong>Email:</strong> privacy@eventconnect.co.uk
          </Typography>
          <Typography paragraph>
            <strong>Data Protection Officer:</strong> dpo@eventconnect.co.uk
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

export default Privacy;
