// /src/pages/Home/Home.tsx
import {
  CalendarToday,
  LocationOn,
  People,
  TrendingUp,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEvents, type Event } from '../../hooks/useFirestore';

export default function Home() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { events, getEvents } = useEvents();
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      const now = new Date();
      const thirtyDaysFromNow = new Date(
        now.getTime() + 30 * 24 * 60 * 60 * 1000,
      );

      const upcoming = events
        .filter((event) => {
          const eventDate = new Date(event.date);
          return eventDate >= now && eventDate <= thirtyDaysFromNow;
        })
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 6);

      setUpcomingEvents(upcoming);

      setFeaturedEvents(upcoming.slice(0, 3));
    }
  }, [events]);

  const stats = [
    { icon: <CalendarToday />, value: events.length, label: 'Total Events' },
    { icon: <TrendingUp />, value: upcomingEvents.length, label: 'This Month' },
    { icon: <People />, value: '500+', label: 'Community Members' },
    { icon: <LocationOn />, value: '10+', label: 'Venues' },
  ];

  return (
    <Box>
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <Box>
                <Typography
                  variant="h2"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    lineHeight: 1.2,
                  }}
                >
                  Discover Amazing Events in Your Community
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    opacity: 0.9,
                    fontWeight: 300,
                    fontSize: { xs: '1.1rem', md: '1.3rem' },
                  }}
                >
                  Connect, explore, and participate in local events that bring
                  our community together.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/events')}
                    sx={{
                      bgcolor: 'white',
                      color: theme.palette.primary.main,
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.9)',
                      },
                    }}
                  >
                    Explore Events
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255,255,255,0.1)',
                      },
                    }}
                  >
                    Learn More
                  </Button>
                </Stack>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    width: { xs: 300, md: 400 },
                    height: { xs: 300, md: 400 },
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <CalendarToday
                    sx={{ fontSize: { xs: 80, md: 120 }, opacity: 0.8 }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid size={{ xs: 6, md: 3 }} key={index}>
              <Card
                sx={{
                  textAlign: 'center',
                  py: 3,
                  height: '100%',
                  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <CardContent>
                  <Box sx={{ color: theme.palette.primary.main, mb: 2 }}>
                    {stat.icon}
                  </Box>
                  <Typography
                    variant="h4"
                    component="div"
                    gutterBottom
                    fontWeight="bold"
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {featuredEvents.length > 0 && (
        <Box sx={{ bgcolor: theme.palette.grey[50], py: 8 }}>
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              component="h2"
              textAlign="center"
              gutterBottom
              sx={{ mb: 6, fontWeight: 'bold' }}
            >
              Featured Events
            </Typography>
            <Grid container spacing={4}>
              {featuredEvents.map((event) => (
                <Grid size={{ xs: 12, md: 4 }} key={event.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition:
                        'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.shadows[8],
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={event.imageUrl || '/api/placeholder/400/200'}
                      alt={event.title}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Box sx={{ mb: 2 }}>
                        <Chip
                          label={new Date(event.date).toLocaleDateString(
                            'en-US',
                            {
                              month: 'short',
                              day: 'numeric',
                            },
                          )}
                          size="small"
                          color="primary"
                          sx={{ mb: 1 }}
                        />
                      </Box>
                      <Typography
                        variant="h6"
                        component="h3"
                        gutterBottom
                        fontWeight="bold"
                      >
                        {event.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {event.description}
                      </Typography>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
                      >
                        <LocationOn
                          sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {event.location}
                        </Typography>
                      </Box>
                      <Button
                        component={Link}
                        to={`/events/${event.id}`}
                        variant="contained"
                        fullWidth
                        sx={{ mt: 'auto' }}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <Button
                component={Link}
                to="/events"
                variant="outlined"
                size="large"
                sx={{ px: 4, py: 1.5 }}
              >
                View All Events
              </Button>
            </Box>
          </Container>
        </Box>
      )}

      {upcomingEvents.length > 0 && (
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            gutterBottom
            sx={{ mb: 6, fontWeight: 'bold' }}
          >
            What's On This Month
          </Typography>
          <Grid container spacing={3}>
            {upcomingEvents.slice(0, 6).map((event) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={event.id}>
                <Card
                  sx={{
                    display: 'flex',
                    height: 140,
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[4],
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 120, objectFit: 'cover' }}
                    image={event.imageUrl || '/api/placeholder/120/140'}
                    alt={event.title}
                  />
                  <CardContent sx={{ flex: 1, p: 2 }}>
                    <Typography
                      variant="subtitle2"
                      color="primary"
                      gutterBottom
                    >
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </Typography>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        mb: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {event.title}
                    </Typography>
                    <Button
                      component={Link}
                      to={`/events/${event.id}`}
                      size="small"
                      sx={{
                        mt: 1,
                        p: 0,
                        minWidth: 'auto',
                        fontSize: '0.75rem',
                      }}
                    >
                      Learn More →
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            fontWeight="bold"
          >
            Join Our Community
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Stay updated with the latest events and connect with like-minded
            people in your area.
          </Typography>
          <Button
            component={Link}
            to="/auth/signup"
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'white',
              color: theme.palette.primary.main,
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.9)',
              },
            }}
          >
            Get Started Today
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
