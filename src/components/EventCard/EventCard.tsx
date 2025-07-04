// src/components/EventCard/EventCard.tsx
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { getEventImage } from '../../utils/imageHelpers';

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  imageUrl?: string;
  description: string;
}

const EventCard = ({
  id,
  title,
  date,
  imageUrl,
  description,
}: EventCardProps) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={getEventImage(imageUrl)}
        alt={title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description.length > 100
            ? `${description.substring(0, 100)}...`
            : description}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2 }}>
        <Button
          component={Link}
          to={`/events/${id}`}
          variant="contained"
          fullWidth
        >
          View Details
        </Button>
      </Box>
      {/* <Box sx={{ p: 2 }}>
        <AddToGoogleCalendarButton event={event} />
      </Box> */}
    </Card>
  );
};

export default EventCard;
