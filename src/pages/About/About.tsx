// src/pages/About/About.tsx
import { Event, LocationOn, People, Star } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

const About: React.FC = () => {
  const stats = [
    { icon: <Event />, number: '10,000+', label: 'Events Created' },
    { icon: <People />, number: '50,000+', label: 'Active Users' },
    { icon: <LocationOn />, number: '100+', label: 'Cities Covered' },
    { icon: <Star />, number: '4.9/5', label: 'User Rating' },
  ];

  const team = [
    { name: 'Sarah Johnson', role: 'CEO & Founder', avatar: 'SJ' },
    { name: 'Michael Chen', role: 'CTO', avatar: 'MC' },
    { name: 'Emily Davis', role: 'Head of Product', avatar: 'ED' },
    { name: 'James Wilson', role: 'Head of Marketing', avatar: 'JW' },
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
          About EventConnect
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}
        >
          We're passionate about bringing people together through meaningful
          events and creating unforgettable experiences in communities across
          the UK.
        </Typography>
      </Box>

      <Box sx={{ mb: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: 4, textAlign: 'center' }}
        >
          Our Mission
        </Typography>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
              <CardContent>
                <Event sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Connect Communities
                </Typography>
                <Typography color="text.secondary">
                  We bridge the gap between event organisers and attendees,
                  fostering stronger community connections.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
              <CardContent>
                <People sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Empower Organisers
                </Typography>
                <Typography color="text.secondary">
                  We provide powerful tools and insights to help event
                  organisers create successful and impactful events.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
              <CardContent>
                <Star sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Create Experiences
                </Typography>
                <Typography color="text.secondary">
                  We believe every event should be memorable, engaging, and
                  leave a lasting positive impact.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mb: 8, bgcolor: 'grey.50', borderRadius: 2, p: 4 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: 4, textAlign: 'center' }}
        >
          Our Impact
        </Typography>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ color: 'primary.main', mb: 1 }}>{stat.icon}</Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {stat.number}
                </Typography>
                <Typography color="text.secondary">{stat.label}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ mb: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: 4, textAlign: 'center' }}
        >
          Meet Our Team
        </Typography>
        <Grid container spacing={4}>
          {team.map((member, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card sx={{ textAlign: 'center', p: 3 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mx: 'auto',
                    mb: 2,
                    bgcolor: 'primary.main',
                    fontSize: '1.5rem',
                  }}
                >
                  {member.avatar}
                </Avatar>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {member.name}
                </Typography>
                <Typography color="text.secondary">{member.role}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box>
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: 4, textAlign: 'center' }}
        >
          Our Story
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.7 }}
        >
          EventConnect was founded in 2020 with a simple vision: to make event
          discovery and organisation effortless for everyone. What started as a
          small project to help local communities stay connected during
          challenging times has grown into a comprehensive platform serving
          thousands of users across the UK.
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.7 }}
        >
          We believe that great events have the power to inspire, educate, and
          bring people together. Whether it's a small workshop, a community
          gathering, or a large conference, every event matters and deserves the
          right tools to succeed.
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}
        >
          Today, we continue to innovate and expand our platform, always keeping
          our users and their communities at the heart of everything we do.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
