import React, { useState, useEffect } from 'react'
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Typography,
    Rating,
    useTheme,
} from "@mui/material"

import Header from 'components/Header'
import imagen from '../../assets/bajo-electrico-de-5-cuerdad-ibanez-sr505e-bm-211606-1.webp'
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';

const Productos = () => {

    const theme = useTheme();
    const isNonMobile = useMediaQuery("(min-width:600px)")
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetchProducts();
    }, []);
    const fetchProducts = () => {
        axios
            .get('http://localhost:3001/api')
            .then((res) => {
                console.log(res);
                setProducts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (

        <Box m="1.5rem 2.5rem">


            <Header titulo={"Productos"}></Header>
            <Box
                mt="20px"
                display={"grid"}
                gridTemplateColumns={"repeat(4, minmax(0, 1fr))"}
                justifyContent={"space-between"}
                rowGap={"20px"}
                columnGap={"1.33%"}
                sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                }}>
                {/* CONTAINER */}

                {products.map((producto, index) => (
                    <Card key={index} sx={{
                        backgroundColor: theme.palette.background.alt,
                        borderRadius: "0.55rem"
                    }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color={theme.palette.secondary[700]} gutterBottom>Bajo Electrico</Typography>
                            <Typography variant='h5' component={"div"}>{producto.nombre}</Typography>
                            <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>{producto.precio}</Typography>
                            <Box maxWidth={'200px'} margin={'0 auto'}>
                                <img src={producto.imagen} width={"200px"}></img>
                            </Box>
                            <Box display={'flex'} justifyContent={'space-between'}>
                                <Button variant="contained" color='success'>Editar</Button>
                                <Button variant="contained" color='error' sx={{ width: '87.75px' }}>Eliminar</Button>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
                

                
        
            </Box>
        </Box>
    )
}

export default Productos