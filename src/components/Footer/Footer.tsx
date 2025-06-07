// src/components/Footer/Footer.tsx
import {
  Email,
  GitHub,
  LinkedIn,
  LocationOn,
  Phone,
  Twitter,
} from '@mui/icons-material';
import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';

const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const footerSections = {
    company: {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    support: {
      title: 'Support',
      links: [
        { label: 'FAQ', href: '/faq' },
        { label: 'Accessibility', href: '/accessibility' },
      ],
    },
    legal: {
      title: 'Legal',
      links: [
        { label: 'Terms & Conditions', href: '/terms' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'Community Guidelines', href: '/community-guidelines' },
      ],
    },
  };

  const socialLinks = [
    {
      name: 'Twitter',
      icon: <Twitter />,
      href: 'https://x.com/alexizumi',
      color: '#1DA1F2',
    },
    {
      name: 'GitHub',
      icon: <GitHub />,
      href: 'https://github.com/alexizumi',
      color: theme.palette.mode === 'dark' ? '#fff' : '#333',
    },
    {
      name: 'LinkedIn',
      icon: <LinkedIn />,
      href: 'https://www.linkedin.com/in/alexizumi/',
      color: '#0077B5',
    },
  ];

  const contactInfo = [
    {
      icon: <Email fontSize="small" />,
      text: 'hello@eventconnect.co.uk',
      href: 'mailto:hello@eventconnect.co.uk',
    },
    {
      icon: <Phone fontSize="small" />,
      text: '+44 20 7946 0958',
      href: 'tel:+442079460958',
    },
    {
      icon: <LocationOn fontSize="small" />,
      text: 'London, United Kingdom',
      href: null,
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
        py: 6,
        mt: 'auto',
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 'bold',
                color: 'primary.main',
                mb: 2,
              }}
            >
              EventConnect
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3, maxWidth: 300 }}
            >
              Connecting people through incredible events. Discover, participate
              and create memorable experiences in our community.
            </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.name}
                  component="a"
                  href={social.href}
                  rel="noopener noreferrer"
                  sx={{
                    color: social.color,
                    '&:hover': {
                      bgcolor: `${social.color}20`,
                    },
                  }}
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {Object.entries(footerSections).map(([key, section]) => (
            <Grid size={{ xs: 12, sm: 6, md: 2 }} key={key}>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  fontSize: '1rem',
                }}
              >
                {section.title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {section.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    color="text.secondary"
                    sx={{
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      '&:hover': {
                        color: 'primary.main',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Box>
            </Grid>
          ))}

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: '1rem',
              }}
            >
              Contact
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {contactInfo.map((contact, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Box sx={{ color: 'primary.main' }}>{contact.icon}</Box>
                  {contact.href ? (
                    <Link
                      href={contact.href}
                      color="text.secondary"
                      sx={{
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}
                    >
                      {contact.text}
                    </Link>
                  ) : (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: '0.875rem' }}
                    >
                      {contact.text}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear} EventConnect. All rights reserved.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Link
              href="/privacy"
              color="text.secondary"
              sx={{
                textDecoration: 'none',
                fontSize: '0.75rem',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              color="text.secondary"
              sx={{
                textDecoration: 'none',
                fontSize: '0.75rem',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              color="text.secondary"
              sx={{
                textDecoration: 'none',
                fontSize: '0.75rem',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              Cookies
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
