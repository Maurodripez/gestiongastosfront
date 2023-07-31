import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLoginUsuario } from "../apis/Usuarios";
import { useState } from "react";
import { emailIsVerify } from "./Extras/Validations";
import { useNavigate } from "react-router-dom";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        ChanchiGastos
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export function SignIn() {
  const navigate = useNavigate();
  const [isEmailVerified, setEmailIsVerify] = useState(false);
  const loginUsuario = useLoginUsuario();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      username: event.currentTarget.username.value,
      password: event.currentTarget.contrasenia.value,
    };
    setEmailIsVerify(await emailIsVerify(data.username));

    if (isEmailVerified) {
      loginUsuario(data);
    } else {
      navigate(`/resend-email-verification/${data.username}`);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar sesion
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              name="username"
              label="Usuario"
              autoComplete="User"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Contraseña"
              label="Contraseña"
              type="password"
              id="contrasenia"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordar"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar sesion
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link href="crear-usuario" variant="body2">
                  {"¿No tienes usuario? Registrate"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
