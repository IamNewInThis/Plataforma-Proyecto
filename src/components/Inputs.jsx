import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const Inputs = ({ placeholder, error,type }) => {
  const [inputValue, setInputValue] = useState('');
  const [showErrors, setShowErrors] = useState(false);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const validateInput = () => {
    if (inputValue.trim() === '') {
      return 'Este campo no puede estar vacío';
    } else if (inputValue.length > 30) {
      return 'Este campo no puede tener más de 30 caracteres';
    } else {
      return '';
    }
  };

  const errorMessage = error ? error : (showErrors ? validateInput() : '');

  const handleClick = () => {
    setShowErrors(true);
  };

  return (
    <Box marginLeft={'1rem'} width={'100%'}>
      <TextField
        variant="outlined"
        placeholder={placeholder}
        sx={{ width: '100%' }}
        value={inputValue}
        onChange={handleChange}
      />
    </Box>
  );
};

export default Inputs;
