import React,{useState} from 'react'
import Header from 'components/Header'
import Inputs from 'components/Inputs'
import InputList from 'components/InputList' 
import {
    Box,
    Card,
    CardContent,
    Button,
    Typography,
    useTheme,
    TextField,
}from "@mui/material"
import useMediaQuery from '@mui/material/useMediaQuery';
import * as yup from "yup";
import { Formik } from 'formik'

    
    //Valores input
    const values = {
        nombre: "nolas",
        marca: "",
        precio:"",
        categoria:"",
        stock: "",
    }
    
    const userSchema = yup.object().shape({
        nombre: yup.string().required("required"),
        marca: yup.string().required("required"),
        precio: yup.number().required("required"),
        categoria: yup.string().required("required"),
        stock: yup.number().required("required"),
    })


const Agregar = () => {
    //COLORES
    const theme = useTheme();

    // ADAPTART PANTALLA
    const isNonMobile = useMediaQuery("(min-width:600px)")

    //Opciones 
    const options = [
        { label: 'Guitarra Electrica', value: 1 },
        { label: 'Guitarra Acústica', value: 2 },
        { label: 'Guitarra Electroacústica', value: 3 },
    ];

    //Opciones 2
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

    // Funcion para subir imagenes
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    // FORM
    const handleFormSubmit = (values) =>{
        console.log(values);
    }


    return (
        <Box m="1.5rem 2.5rem">
            <Header titulo={"Agregar Productos"}></Header>
            
            <Formik validacionSchema={userSchema} onSubmit={handleFormSubmit} initialValues={values}>
                {({values,errors, touched , handleChange, handleSubmit,handleBlur})=>(
                    <form onSubmit={handleSubmit}>
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
                                <Box display="flex" alignItems="center">
                                    <Typography variant='h5' component={"div"}>Nombre:</Typography>
                                    <TextField 
                                    fullWidth 
                                    type='text'  
                                    label="Nombre"
                                    onBlur={handleBlur} // Usar handleBlur en lugar de onBlur
                                    onChange={handleChange}
                                    value={values.nombre}
                                    name='nombre'
                                    error={touched.nombre && !!errors.nombre} // Asegurarse de usar el operador !! para convertir el error en un booleano
                                    helperText={touched.nombre && errors.nombre}
                                    sx={{gridColumn: 'span 2'}}
                                    />
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
                 </form>
                )}
            </Formik>
        

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
                                <Button variant="contained" color='success' fullWidth type='submit'>Agregar</Button>
                            </Box>
                        </CardContent>
                    </Card>
            </Box>
        </Box>
    )
}

export default Agregar