// src/pages/Pricing/Pricing.tsx
import {
  Analytics,
  Check,
  Event,
  People,
  Star,
  Support,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
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

const Pricing: React.FC = () => {
  const theme = useTheme();

  const plans = [
    {
      name: 'Free',
      price: '£0',
      period: 'forever',
      description: 'Perfect for getting started with small events',
      features: [
        'Up to 3 events per month',
        'Up to 50 attendees per event',
        'Basic event management',
        'Email notifications',
        'Community support',
      ],
      buttonText: 'Get Started',
      buttonVariant: 'outlined' as const,
      popular: false,
    },
    {
      name: 'Pro',
      price: '£19',
      period: 'per month',
      description: 'Ideal for regular event organisers',
      features: [
        'Unlimited events',
        'Up to 500 attendees per event',
        'Advanced analytics',
        'Custom branding',
        'Priority email support',
        'Payment processing',
        'Event promotion tools',
      ],
      buttonText: 'Start Free Trial',
      buttonVariant: 'contained' as const,
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'For large organisations and agencies',
      features: [
        'Unlimited everything',
        'White-label solution',
        'API access',
        'Dedicated account manager',
        '24/7 phone support',
        'Custom integrations',
        'Advanced reporting',
        'Multi-user accounts',
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'outlined' as const,
      popular: false,
    },
  ];

  const features = [
    {
      icon: <Event />,
      title: 'Event Management',
      description:
        'Create, edit, and manage your events with our intuitive dashboard',
    },
    {
      icon: <People />,
      title: 'Attendee Management',
      description:
        'Track registrations, send updates, and manage your guest list',
    },
    {
      icon: <Analytics />,
      title: 'Analytics & Insights',
      description:
        'Get detailed insights about your events and attendee engagement',
    },
    {
      icon: <Support />,
      title: 'Customer Support',
      description: 'Access our help centre and get support when you need it',
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
          Simple, Transparent Pricing
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}
        >
          Choose the plan that's right for you. Start free and upgrade as you
          grow.
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mb: 8 }}>
        {plans.map((plan, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                border: plan.popular
                  ? `2px solid ${theme.palette.primary.main}`
                  : 'none',
                transform: plan.popular ? 'scale(1.05)' : 'none',
              }}
            >
              {plan.popular && (
                <Chip
                  label="Most Popular"
                  color="primary"
                  icon={<Star />}
                  sx={{
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                />
              )}
              <CardContent sx={{ flexGrow: 1, p: 4 }}>
                <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
                  {plan.name}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="h3"
                    component="span"
                    sx={{ fontWeight: 'bold', color: 'primary.main' }}
                  >
                    {plan.price}
                  </Typography>
                  <Typography
                    variant="body1"
                    component="span"
                    color="text.secondary"
                  >
                    {' '}
                    / {plan.period}
                  </Typography>
                </Box>
                <Typography color="text.secondary" sx={{ mb: 3 }}>
                  {plan.description}
                </Typography>
                <List sx={{ mb: 3 }}>
                  {plan.features.map((feature, idx) => (
                    <ListItem key={idx} sx={{ px: 0, py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <Check color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={feature}
                        primaryTypographyProps={{ fontSize: '0.9rem' }}
                      />
                    </ListItem>
                  ))}
                </List>
                <Button
                  variant={plan.buttonVariant}
                  fullWidth
                  size="large"
                  sx={{ mt: 'auto' }}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
          Everything You Need to Succeed
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    color: 'primary.main',
                    mb: 2,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {React.cloneElement(feature.icon, { sx: { fontSize: 48 } })}
                </Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ bgcolor: 'background.default', borderRadius: 2, p: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
          Frequently Asked Questions
        </Typography>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Can I change plans anytime?
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Yes, you can upgrade or downgrade your plan at any time. Changes
              take effect immediately, and we'll prorate any charges.
            </Typography>

            <Typography variant="h6" sx={{ mb: 2 }}>
              Is there a free trial?
            </Typography>
            <Typography color="text.secondary">
              Yes! Pro plan comes with a 14-day free trial. No credit card
              required to start.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              What payment methods do you accept?
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              We accept all major credit cards, PayPal, and bank transfers for
              annual plans.
            </Typography>

            <Typography variant="h6" sx={{ mb: 2 }}>
              Do you offer refunds?
            </Typography>
            <Typography color="text.secondary">
              Yes, we offer a 30-day money-back guarantee for all paid plans. No
              questions asked.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Pricing;
