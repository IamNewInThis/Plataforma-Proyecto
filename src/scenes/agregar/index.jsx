import React,{useState} from 'react'
import Header from 'components/Header'
import Inputs from 'components/Inputs'
import InputList from 'components/InputList' 
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
    useMediaQuery,
}from "@mui/material"

const Agregar = () => {
    const theme = useTheme();

    const isNonMobile = useMediaQuery("(min-width:1000px)")

    const options = [
        { label: 'Guitarra Electrica', value: 1 },
        { label: 'Guitarra Acústica', value: 2 },
        { label: 'Guitarra Electroacústica', value: 3 },
    ];

    const options2 = [
        { label: 'Guitarras',value: 1 },
        { label: 'Percusión',value: 2 },
        { label: 'Pianos', value: 3},
        { label: 'Bajos', value: 4 },
        { label: 'Baterías Acústicas', value: 5},
        { label: 'Baterías Electrónica',value: 6},
        { label: 'Amplificadores',value:7 },
        { label: 'Accesorios', value: 8},
    ];

    const [error, setError] = useState(null);

    const [showErrors, setShowErrors] = useState(false);

    const handleClick = () => {
        setShowErrors(true);
    };

    // Funcion para subir imagenes
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    
    return (
        <Box m="1.5rem 2.5rem">
            <Header titulo={"Agregar Productos"}></Header>
            
            <Box
                margin={""}
                mt="20px" 
                display={"grid"} 
                gridTemplateColumns={"repeat(2, minmax(0, 1fr))"}
                justifyContent={"space-between"}
                rowGap={"20px"}
                columnGap={"1.33%"} //SEPARACION DEL MEDIO DE LAS CARD
                sx={{
                    "& > div":{ gridColumn: isNonMobile ? undefined : "span 4"}
                }}>
                    {/* Container */}
                    <Card sx={{
                        backgroundColor: theme.palette.background.alt,
                        borderRadius:"0.55rem",

                    }}>
                        <CardContent>
                            <Box display="flex" alignItems="center" >
                                <Typography variant='h5' component={"div"} margin={'-6px'}>Nombre:</Typography>
                                <Inputs placeholder={"Nombre"}></Inputs>
                            </Box>
                        </CardContent>

                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <Typography variant='h5' component={"div"}>Precio:</Typography>
                                <Inputs placeholder={"Precio"}></Inputs>
                            </Box>
                        </CardContent>

                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <Typography variant='h5' component={"div"} marginRight={'17px'}>Marca:</Typography>
                                <InputList options={options} label={'Marcas'}/>
                            </Box>
                        </CardContent>

                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <Typography variant='h5' component={"div"} marginRight={'3px'}>Stock:</Typography>
                                <Inputs placeholder={"Stock"}></Inputs>
                            </Box>
                        </CardContent>

                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <Typography variant='h5' component={"div"}>Imagen:</Typography>
                                <input type='file' id='imagenInput' accept='image/' onChange={handleImageChange}></input>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Container */}
                    <Card sx={{
                        backgroundColor: theme.palette.background.alt,
                        borderRadius:"0.55rem"
                    }}>
                         <CardContent>
                            <Box display="flex" alignItems="center">
                                <Typography variant='h5' component={"div"} marginRight={'1.1rem'}>Marca:</Typography>
                                <Inputs placeholder={"Marca"}></Inputs>
                            </Box>
                        </CardContent>

                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <Typography variant='h5' component={"div"}  marginRight={'1.3rem'}>Stock:</Typography>
                                <Inputs placeholder={"Stock"} ></Inputs>
                            </Box>
                        </CardContent>

                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <Typography variant='h5' component={"div"} marginRight={'8px'}>Categoria:</Typography>
                                <InputList options={options2} label={'Categorias'} />
                            </Box>
                        </CardContent>

                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <Typography variant='h5' component={"div"} marginRight={'-8px'}>Sub Categoria:</Typography>
                                <InputList options={options2}label={'Categorias'} />
                            </Box>
                        </CardContent>

                    </Card>
            </Box>
                
            {/* Boton */}
            <Box
                margin={""}
                mt="20px" 
                display={"grid"} 
                gridTemplateColumns={"repeat(1, minmax(0, 1fr))"}
                justifyContent={"space-between"}
                rowGap={"20px"}
                columnGap={"1.33%"} //SEPARACION DEL MEDIO DE LAS CARD
                sx={{
                    "& > div":{ gridColumn: isNonMobile ? undefined : "span 4"}
                }}>
                <Card sx={{
                        backgroundColor: theme.palette.background.alt,
                        borderRadius:"0.55rem"
                    }}>
                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <Button variant="contained" color='success' fullWidth type='submit' onClick={()=>setShowErrors(true)}>Agregar</Button>
                            </Box>
                            {error && <Typography color="error">{error}</Typography>}
                        </CardContent>
                    </Card>
            </Box>
        </Box>
    )
}

export default Agregar