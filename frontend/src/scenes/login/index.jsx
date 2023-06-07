import React, { useState }  from 'react'
import{ TextField, Button, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    
      const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleButtonClick = () => {
        navigate('/dashboard');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes realizar la lógica de autenticación, como enviar los datos al servidor para verificar el inicio de sesión.
        // Puedes utilizar el valor de 'username' y 'password' para eso.
        // Por ahora, solo mostraremos los valores en la consola.
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <Container maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Iniciar sesión
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: '100%',
              marginTop: 1,
            }}
          >
            <form>
             <TextField
              label="Usuario"
              variant="outlined"
              value={username}
              onChange={handleUsernameChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Contraseña"
              variant="outlined"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              fullWidth
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              onClick={handleButtonClick}
            >
              Iniciar sesión
            </Button>
            </form>
          </Box>
        </Box>
      </Container>
    )
}

export default Login