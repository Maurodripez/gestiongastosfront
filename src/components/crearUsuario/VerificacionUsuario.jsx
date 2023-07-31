import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { validateTokenEmail } from '../Extras/Validations';
const VerificacionUsuario = () => {
  const [verificado, setVerificado] = useState(null);

  useEffect(() => {
    // Obtener el valor del token del query parameter
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');

    if (token) {
      validarTokenEnBackend(token);
    } else {
      // Manejar el caso en que no se haya proporcionado el token en la URL
      setVerificado(false);
    }
  }, []);

  const validarTokenEnBackend = async (token) => {
    console.log(token);
    try {
      const status =await validateTokenEmail(token);
      if (status === 200) {
        setVerificado(true);
      } else {
        setVerificado(false);
      }
    } catch (error) {
      setVerificado(false);
    }
  };

  return (
    <Container maxWidth="sm">
      {verificado === null && (
        <Typography variant="h4" align="center" gutterBottom>
          Verificando...
        </Typography>
      )}
      {verificado === true && (
        <>
          <Typography variant="h4" align="center" gutterBottom>
            ¡Correo Verificado!
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            Gracias por verificar tu correo electrónico. Ahora puedes acceder a todas las funcionalidades de nuestro sitio.
          </Typography>
        </>
      )}
      {verificado === false && (
        <>
          <Typography variant="h4" align="center" gutterBottom>
            ¡Error de Verificación!
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            Ha ocurrido un error al verificar tu correo electrónico. Por favor, verifica que el enlace sea válido o inténtalo más tarde.
          </Typography>
        </>
      )}
    </Container>
  );
};

export default VerificacionUsuario;
