// src/components/ProtectedRoute/ProtectedRoute.tsx
import { Box, CircularProgress } from '@mui/material';
import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

const ProtectedRoute = ({
  children,
  redirectTo = '/login',
}: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to={redirectTo} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
