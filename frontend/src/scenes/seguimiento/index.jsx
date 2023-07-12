import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  useTheme,
  Modal,
  Grid,
  LinearProgress
} from "@mui/material";
import axios from "axios";

import Header from "components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import {CheckCircle,Flight,LocalShipping, QueryBuilder} from "@mui/icons-material"

const Seguimiento = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [pedidoEstado, setPedidoEstado] = useState("En proceso");
  const [barraProgreso, setBarraProgreso] = useState(31);

  const [codigo, setCodigo] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  //METODO LISTAR
  const fetchProducts = () => {

    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local

    axios
    .get("http://localhost:3001/api/seguimiento/", {
      headers: {
        "auth-token": token, // Incluir el token en el encabezado como 'Authorization'
      },
    })
    .then((res) => {
      setCodigo(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  };
  const handleOpen = async () => {
    try {
      const response = await axios.get("URL_DE_TU_API");
      const codigoSeguimiento = response.data.codigo_seguimiento;
  
      // Realiza cualquier acción con el código de seguimiento obtenido
      console.log(codigoSeguimiento);
    } catch (error) {
      // Maneja cualquier error de la solicitud HTTP
      console.error(error);
    }
  
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEstadoClick = (estado) => {
    setPedidoEstado(estado);
    switch (estado) {
        case "En proceso":
          setBarraProgreso(31);
          break;
        case "En camino":
          setBarraProgreso(50);
          break;
        case "Entregado":
          setBarraProgreso(100);
          break;
        default:
          setBarraProgreso(0);
          break;
      }
  };

  const renderEstadoIcon = (estado) => {
    switch (estado) {
      case "En proceso":
        return <QueryBuilder/>;
      case "En camino":
        return <LocalShipping/>;
      case "Entregado":
        return <CheckCircle/>;
      default:
        return null;
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header titulo={"Seguimiento"}></Header>
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
        {codigo.map((codigo, index) => (
        <Card
          sx={{
            backgroundColor: theme.palette.background.alt,
            borderRadius: "0.55rem",
          }}
        >
          <CardContent>
            <Typography variant="h5" component={"div"} marginRight={"10px"}>
              Codigo de Seguimiento:
            </Typography>

            <Typography
              mt="10px"
              variant="h5"
              component="div"
              sx={{ mb: "1.5rem" }}
              color={theme.palette.secondary[400]}
            >
              {codigo.codigo_seguimiento}
            </Typography>

            <Box display="flex" justifyContent="space-between">
              <Button variant="contained" color="success" fullWidth onClick={handleOpen}>
                Consultar
              </Button>
            </Box>
          </CardContent>
        </Card>) )}
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: "600px",
            bgcolor: "#000",
            borderRadius: "0.55rem",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                component="div"
                color={theme.palette.common.white}
                textAlign="center"
              >
                Estado del Pedido
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" alignItems="center">
                {renderEstadoIcon(pedidoEstado)}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <LinearProgress variant="determinate" value={barraProgreso} color="success" />
            </Grid>

            <Grid item xs={4}>
              <Button
                variant={pedidoEstado === "En proceso" ? "contained" : "outlined"}
                color="success"
                fullWidth
                onClick={() => handleEstadoClick("En proceso")}
              >
                En proceso
              </Button>
            </Grid>

            <Grid item xs={4}>
              <Button
                variant={pedidoEstado === "En camino" ? "contained" : "outlined"}
                color="success"
                fullWidth
                onClick={() => handleEstadoClick("En camino")}
              >
                En camino
              </Button>
            </Grid>

            <Grid item xs={4}>
              <Button
                variant={pedidoEstado === "Entregado" ? "contained" : "outlined"}
                color="success"
                fullWidth
                onClick={() => handleEstadoClick("Entregado")}
              >
                Entregado
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
};

export default Seguimiento;
