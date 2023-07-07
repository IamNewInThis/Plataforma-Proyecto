import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  useTheme,
  Modal,
  TextField,
  Grid,
} from "@mui/material";

import Header from "components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import Swal from "sweetalert2";

// Método para consultar los productos en la base de datos
const Solicitudes = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%", // Cambiar el ancho del modal
    maxHeight: "50%", // Cambiar la altura máxima del modal
    bgcolor: "background.paper",
    border: "2px solid #fff",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [boletas, setBoletas] = useState([]);

  useEffect(() => {
    fetchBolestas();
  }, []);

  // METODO LISTAR
  const fetchBolestas = () => {
    axios
      .get("http://25.64.187.92:5000/api/productos/listarBodega", {})
      .then((res) => {
        setBoletas(res.data.boletas);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

    //METODO MODAL PRODUCTOS
    const [modalBoleta, setModalBoleta] = useState(null);

    const handleSubmit = (event) => {
      event.preventDefault();
      axios
        .put(`http://25.64.187.92:5000/api/productos/listarBodega${modalBoleta.idBoleta}`, {
          productos: modalBoleta.productos,
          total: modalBoleta.total,
          fechaBoleta: modalBoleta.fechaBoleta
        })
        .then((response) => {
          console.log(response);
          handleClose();
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    };

  const [verProduct, setVerProduct] = useState(null);
  // Metodo ABRIR modal
  const handleOpen = (boleta) => {
    setModalBoleta(boleta);
    setOpen(true);
  };

  // Metodo CERRAR modal
  const handleClose = () => {
    setVerProduct(null);
    setOpen(false);
  };

  return (
    <Box m="1.5rem 2.5rem" sx={{ isnonmobile: isNonMobile.toString() }}>
      <Header titulo={"Solicitudes"}></Header>
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
        {boletas.map((boleta, index) => (
          <Card
            key={index}
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
                {boleta.idBoleta}
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
                {boleta.sucursal}
              </Typography>
              <Box display="flex" justifyContent="space-between">
                <Button variant="contained" color="success" fullWidth onClick={() => handleOpen(boleta)}>
                  Detalle
                </Button>
              </Box>
            
            {/* MODAL */}
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography>
                        <span style={{ color: theme.palette.secondary[400] }}>Producto: </span>{modalBoleta?.productos}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography>
                        <span style={{ color: theme.palette.secondary[400] }}>Total: $</span>{modalBoleta?.total}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography>
                        <span style={{ color: theme.palette.secondary[400] }}>Fecha Compra:</span> {modalBoleta?.fechaBoleta}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Box sx={{marginTop: "2rem" , }}> 
                    <Card
                      sx={{
                        borderRadius: "0.55rem"
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
                            Enviar Detalle
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            fullWidth
                            type="submit"
                            onClick={handleClose}
                            sx={{ marginLeft: "10px" }}
                          >
                            Cancelar
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </Box>
              </Modal>

            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Solicitudes;
