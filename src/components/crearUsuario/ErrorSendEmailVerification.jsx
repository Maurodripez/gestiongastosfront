import React from 'react';
import { Typography, Container, Box } from '@mui/material';

const ErrorSendEmailVerification = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Hubo un problema al enviar el correo electrónico de verificación.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Por favor, verifica que la dirección de correo electrónico sea correcta o inténtalo más tarde.
        </Typography>
        {/* Puedes agregar aquí otros mensajes o acciones relacionadas con el error */}
      </Box>
    </Container>
  );
};

export default ErrorSendEmailVerification;
