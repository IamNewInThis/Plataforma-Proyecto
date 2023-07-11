import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "components/Header";
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  useTheme,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Swal from "sweetalert2";

const SolicitudesBodega = () => {
  const theme = useTheme();

  // ADAPTART PANTALLA
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box m={"1.5rem 2.5rem"}>
      <Header titulo={"Solicitudes"}></Header>
      <form>
        <Box
          mt="20px"
          display={"grid"}
          gridTemplateColumns={"repeat(1, minmax(0, 2fr))"}
          justifyContent={"space-between"}
          rowGap={"20px"}
          columnGap={"1.33%"} //SEPARACION DEL MEDIO DE LAS CARD
          noValidate
          autoComplete="off"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
          }}
        >
          <Card
            sx={{
              backgroundColor: theme.palette.background.alt,
              borderRadius: "0.55rem",
            }}
          >
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5" component="div" marginRight="10px">
                    Nombre Producto:
                  </Typography>
                  <TextField
                    color="success"
                    variant="outlined"
                    type="text"
                    name="nombre"
                    placeholder="Nombre Producto"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5" component="div" marginRight="10px">
                    Cantidad:
                  </Typography>
                  <TextField
                    color="success"
                    variant="outlined"
                    type="text"
                    name="nombre"
                    fullWidth
                    placeholder="Cantidad"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    onClick={() => console.log("Enviar solicitud")}
                  >
                    Enviar Solicitud
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </form>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        justifyContent="space-between"
        rowGap="20px"
        columnGap="1.33%"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        <Card
          sx={{
            backgroundColor: theme.palette.background.alt,
            borderRadius: "0.55rem",
          }}
        >
          <CardContent>
            <Typography variant="h5" component={"div"} marginRight={"10px"}>
              ID:
            </Typography>

            <Typography
              variant="h5"
              component="div"
              sx={{ mb: "1.5rem" }}
              color={theme.palette.secondary[400]}
            >
              Hola
            </Typography>

            <Typography variant="h5" component={"div"} marginRight={"10px"}>
              Sucursal:
            </Typography>

            <Typography
              variant="h5"
              component="div"
              sx={{ mb: "1.5rem" }}
              color={theme.palette.secondary[400]}
            >
              Hola
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Button variant="contained" color="success" fullWidth>
                Detalle
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default SolicitudesBodega;
