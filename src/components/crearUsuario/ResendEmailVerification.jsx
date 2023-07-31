import * as React from 'react';
import { Container, Typography, Button, CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { resendEmailVerification } from '../Extras/Validations';
import { useNavigate } from "react-router-dom";

const ResendEmailVerification = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const username = location.pathname.split('/').pop(); // Obtener el valor del último segmento de la URL (nombre de usuario)
    const [isLoading, setIsLoading] = React.useState(false);

    const handleResendEmail = async () => {
        try {
            setIsLoading(true);
            if (await resendEmailVerification(username) === 200) {
                navigate(`/success-send-email-verification`);
            } else {
                navigate('/error-send-email-verification');
            }
        } catch (error) {
            setIsLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                No has verificado tu correo. Por favor, verifica tu correo o reenvía el correo para verificarlo
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
                Haz clic en el botón para reenviar el correo de verificación.
            </Typography>
            <Button
                onClick={handleResendEmail}
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3 }}
                disabled={isLoading}
            >
                {isLoading ? <CircularProgress size={24} /> : 'Reenviar Correo de Verificación'}
            </Button>
        </Container>
    );
};

export default ResendEmailVerification;
