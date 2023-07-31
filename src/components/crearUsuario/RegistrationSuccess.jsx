import React from 'react';
import { Typography, Box, Container, Paper } from '@mui/material';

const RegistrationSuccess = () => {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3}>
        <Box p={4}>
          <Typography variant="h5" gutterBottom>
            ¡Registro exitoso!
          </Typography>
          <Typography gutterBottom>
            Gracias por registrarte. Se te ha enviado un correo electrónico para validar tu cuenta.
          </Typography>
          <Typography variant="caption" color="textSecondary">
            (Verifica también en la carpeta de spam si no encuentras el correo de validación)
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegistrationSuccess;
