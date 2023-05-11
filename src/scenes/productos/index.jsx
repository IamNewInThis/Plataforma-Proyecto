import React, { useState } from "react";
import {
<<<<<<< Updated upstream
    Box,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Typography,
    Rating,
    useTheme,
}from "@mui/material"

import Header from 'components/Header'
import imagen from '../../assets/bajo-electrico-de-5-cuerdad-ibanez-sr505e-bm-211606-1.webp'
import useMediaQuery from '@mui/material/useMediaQuery';

const Productos = () => {

    const theme = useTheme();

    const isNonMobile = useMediaQuery("(min-width:600px)")
    
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
                    "& > div":{ gridColumn: isNonMobile ? undefined : "span 4"}
                }}>
                    {/* CONTAINER */}
                    <Card sx={{
                        backgroundColor: theme.palette.background.alt,
                        borderRadius:"0.55rem"
                    }}>
                        
                        <CardContent>
                            <Typography sx={{fontSize:14}} color={theme.palette.secondary[700]} gutterBottom>Bajo Electrico</Typography>
                            <Typography variant='h5' component={"div"}>Bajo eléctrico Ibanez SR505E 5 cuerdas - Brown Mahogany</Typography>
                            <Typography sx={{mb:"1.5rem"}} color={theme.palette.secondary[400]}>$799.900</Typography>
                            <Box maxWidth={'200px'} margin={'0 auto'}>
                                <img src={imagen} width={"200px"}></img>
                            </Box>
                            <Box display={'flex'} justifyContent={'space-between'}>
                                <Button variant="contained" color='success'>Editar</Button>
                                <Button variant="contained" color='success'>Eliminar</Button>
                            </Box>
                        </CardContent>
                    </Card>

                    <Card sx={{
                        backgroundColor: theme.palette.background.alt,
                        borderRadius:"0.55rem"
                    }}>
                        <CardContent>
                            <Typography sx={{fontSize:14}} color={theme.palette.secondary[700]} gutterBottom>Bajo Electrico</Typography>
                            <Typography variant='h5' component={"div"}>Bajo eléctrico Ibanez SR505E 5 cuerdas - Brown Mahogany</Typography>
                            <Typography sx={{mb:"1.5rem"}} color={theme.palette.secondary[400]}>$799.900</Typography>
                            <Box maxWidth={'200px'} margin={'0 auto'}>
                                <img src={imagen} width={"200px"}></img>
                            </Box>
                            <Box display={'flex'} justifyContent={'space-between'}>
                                <Button variant="contained" color='success'>Editar</Button>
                                <Button variant="contained" color='error' sx={{width:'87.75px'}}>Eliminar</Button>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* CONTAINER */}
                    <Card sx={{
                        backgroundColor: theme.palette.background.alt,
                        borderRadius:"0.55rem"
                    }}>
                        <CardContent>
                            <Typography sx={{fontSize:14}} color={theme.palette.secondary[700]} gutterBottom>Bajo Electrico</Typography>
                            <Typography variant='h5' component={"div"}>Bajo eléctrico Ibanez SR505E 5 cuerdas - Brown Mahogany</Typography>
                            <Typography sx={{mb:"1.5rem"}} color={theme.palette.secondary[400]}>$799.900</Typography>
                            <Box maxWidth={'200px'} margin={'0 auto'}>
                                <img src={imagen} width={"200px"}></img>
                            </Box>
                            <Box display={'flex'} justifyContent={'space-between'}>
                                <Button variant="contained" color='success'>Editar</Button>
                                <Button variant="contained" color='success'>Eliminar</Button>
                            </Box>
                        </CardContent>
                    </Card>

                    <Card sx={{
                        backgroundColor: theme.palette.background.alt,
                        borderRadius:"0.55rem"
                    }}>
                        <CardContent>
                            <Typography sx={{fontSize:14}} color={theme.palette.secondary[700]} gutterBottom>Bajo Electrico</Typography>
                            <Typography variant='h5' component={"div"}>Bajo eléctrico Ibanez SR505E 5 cuerdas - Brown Mahogany</Typography>
                            <Typography sx={{mb:"1.5rem"}} color={theme.palette.secondary[400]}>$799.900</Typography>
                            <Box maxWidth={'200px'} margin={'0 auto'}>
                                <img src={imagen} width={"200px"}></img>
                            </Box>
                            <Box display={'flex'} justifyContent={'space-between'}>
                                <Button variant="contained" color='success'>Editar</Button>
                                <Button variant="contained" color='success'>Eliminar</Button>
                            </Box>
                        </CardContent>
                    </Card>
=======
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  Modal,
  TextField,
  Grid,
} from "@mui/material";

import Header from "components/Header";
import imagen from "../../assets/bajo-electrico-de-5-cuerdad-ibanez-sr505e-bm-211606-1.webp";
import useMediaQuery from "@mui/material/useMediaQuery";

const Productos = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 550,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const theme = useTheme();

  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box m="1.5rem 2.5rem" isNonMobile>
      <Header titulo={"Productos"}></Header>
      <Box
        mt="20px"
        display={"grid"}
        gridTemplateColumns={"repeat(4, minmax(0, 1fr))"}
        justifyContent={"space-between"}
        rowGap={"20px"}
        columnGap={"1.33%"}
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        {/* CONTAINER */}
        <Card
          sx={{
            backgroundColor: theme.palette.background.alt,
            borderRadius: "0.55rem",
          }}
        >
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color={theme.palette.secondary[700]}
              gutterBottom
            >
              Bajo Electrico
            </Typography>
            <Typography variant="h5" component={"div"}>
              Bajo eléctrico Ibanez SR505E 5 cuerdas - Brown Mahogany
            </Typography>
            <Typography
              sx={{ mb: "1.5rem" }}
              color={theme.palette.secondary[400]}
            >
              $799.900
            </Typography>
            <Box maxWidth={"200px"} margin={"0 auto"}>
              <img src={imagen} width={"200px"}></img>
>>>>>>> Stashed changes
            </Box>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Button onClick={handleOpen} variant="contained" color="success">
                Editar
              </Button>
              <Button variant="contained" color="error">
                Eliminar
              </Button>
            </Box>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <form>
                  {/* <h3>Formulario</h3> */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography>Nombre:</Typography>
                      <TextField placeholder="nombre" fullWidth />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography>Precio:</Typography>
                      <TextField placeholder="precio" fullWidth />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography>Stock:</Typography>
                      <TextField placeholder="0" fullWidth />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography>Categoría:</Typography>
                      <TextField placeholder="Categoría" fullWidth />
                    </Grid>
                    <Grid item xs={12} md={6} marginBottom={'6rem'}>
                      <Typography>SubCategoría:</Typography>
                      <TextField placeholder="Subcategoría" fullWidth  />
                    </Grid>
                  </Grid>
                </form>
                <Box>
                  <Card
                    sx={{
                      backgroundColor: 600,
                      borderRadius: "0.55rem",
                      
                    }}
                  >
                    <CardContent>
                      <Box display="flex" alignItems="center">
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth
                          type="submit"
                        >
                          Agregar
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            </Modal>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Productos;
