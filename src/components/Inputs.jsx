import React from 'react';
import { Box, TextField } from '@mui/material';

const Inputs = ({ placeholder }) => {
    return (
        <Box marginLeft={'1rem'} width={'100%'}>
            <TextField
                variant="outlined"
                placeholder={placeholder}
                sx={{width:'100%'}}
                />
        </Box>
    );
};

export default Inputs;
