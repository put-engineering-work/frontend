import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  const theme = useTheme();

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80vh', 
          mt: '-64px',
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" gutterBottom>
          Oops! The page you're looking for doesn't exist.
        </Typography>
        <Link to="/" style={{ marginTop: theme.spacing(3), textDecoration: 'none', color: theme.palette.primary.main }}>
          Go back home
        </Link>
      </Box>
    </Container>
  );
}
