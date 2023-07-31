import React, { useState } from 'react';
import { TextField, Button, Container, InputAdornment, Grid, Typography, IconButton } from '@mui/material'; // Agrega IconButton aquí
import { AccountCircle, Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material'; // Agrega los iconos necesarios
import { isValidEmail, validateUsername, validateEmail } from '../Extras/Validations';
import { registrarUsuario } from '../../apis/Usuarios';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
const CreateUserForm = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    lastname: '',
    roles: ['USER'],
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [emailValidError, setEmailValidError] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((prevShow) => !prevShow);
  };

  const handleShowRepeatPassword = () => {
    setShowRepeatPassword((prevShow) => !prevShow);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await validateUsername(formData.username)) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }

    if (await validateEmail(formData.email)) {
      setEmailValidError(true);
    } else {
      setEmailValidError(false);
    }

    if (!isValidEmail(formData.email)) {
      console.log("llega2");
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (formData.password !== formData.repeatPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    if (!usernameError && !emailError && !passwordError && !emailValidError) {
      const { repeatPassword, ...formDataToSend } = formData;
      const status = await registrarUsuario(formDataToSend);
      if (status === 201) {
        navigate('/registration-success');
      }
    }
  };


  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Registrate
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre de usuario"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              variant="outlined"
              error={usernameError}
              helperText={usernameError && 'Usuario ya existente'}
              InputProps={{
                startAdornment: <AccountCircle />
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              variant="outlined"
              InputProps={{
                startAdornment: <AccountCircle />
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Apellido"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
              variant="outlined"
              InputProps={{
                startAdornment: <AccountCircle />
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Correo electrónico"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              variant="outlined"
              error={emailError || emailValidError}
              helperText={(emailError || emailValidError) && 'No es un correo valido o ya existe'}
              InputProps={{
                startAdornment: <Email />
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Contraseña"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              InputProps={{
                startAdornment: <Lock />,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Repetir contraseña"
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleChange}
              required
              type={showRepeatPassword ? 'text' : 'password'}
              variant="outlined"
              error={passwordError}
              helperText={passwordError && 'Las contraseñas no coinciden'}
              InputProps={{
                startAdornment: <Lock />,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowRepeatPassword}>
                      {showRepeatPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Registrarse
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateUserForm;
