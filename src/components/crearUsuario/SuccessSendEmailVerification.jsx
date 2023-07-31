import React from 'react';
import { Typography, Container, Box } from '@mui/material';

const SuccessSendEmailVerification = () => {
    return (
        <Container maxWidth="sm">
            <Box sx={{ marginTop: 8, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    ¡Reenvío Exitoso!
                </Typography>
                <Typography variant="body1" gutterBottom>
                    El correo electrónico de verificación ha sido reenviado exitosamente.
                </Typography>
                {/* Puedes agregar aquí otros mensajes o acciones relacionadas con el éxito */}
            </Box>
        </Container>
    );
};

export default SuccessSendEmailVerification;
