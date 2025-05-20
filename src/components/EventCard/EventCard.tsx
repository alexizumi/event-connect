// src/components/EventCard/EventCard.tsx
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { Timestamp } from 'firebase/firestore'; // Importe o Timestamp do Firebase
import { Link } from 'react-router-dom';
import AddToGoogleCalendarButton from '../../components/AddToGoogleCalendarButton';
import { type Event } from '../../hooks/useFirestore'; // Importe o tipo Event

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  description: string;
}

const EventCard = ({
  id,
  title,
  date,
  imageUrl,
  description,
}: EventCardProps) => {
  // Crie um objeto event a partir das props individuais
  const event: Event = {
    id,
    title,
    date,
    description,
    imageUrl,
    // Você precisará adicionar os outros campos obrigatórios do tipo Event
    // Se não tiver esses valores, você pode usar valores padrão ou mock
    createdBy: 'Unknown', // Valor padrão
    createdAt: new Timestamp(Date.now() / 1000, 0), // Timestamp atual como fallback
  };

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
        image={imageUrl || '/placeholder-event.jpg'}
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
      <Box sx={{ p: 2 }}>
        <AddToGoogleCalendarButton event={event} />
      </Box>
    </Card>
  );
};

export default EventCard;
