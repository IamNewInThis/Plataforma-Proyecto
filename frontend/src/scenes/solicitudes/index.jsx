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
  TextField,
  Alert
} from "@mui/material";

import Header from "components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";

const Solicitudes = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%", // Cambiar el ancho del modal
    maxHeight: "60%", // Cambiar la altura máxima del modal
    bgcolor: "background.paper",
    border: "2px solid #fff",
    boxShadow: 24,
    p: 4,
  };

  function generarSolicitud(boletas) {
    const solicitudes = []; // arreglo vacío para almacenar las solicitudes

    // Recorrer las boletas
    for (let i = 0; i < boletas.length; i++) {
      const boleta = boletas[i];

      // Extraer los datos de la boleta
      const sucursal = boleta.sucursal;
      const idBoleta = boleta.idBoleta;
      const fechaBoleta = boleta.fechaBoleta;
      const productosString = boleta.productos;

      // Crear un objeto de solicitud
      const solicitud = {
        sucursal: sucursal,
        idBoleta: idBoleta,
        fechaBoleta: fechaBoleta,
        productos: []
      };

      // Dividir la cadena de productos y agregarlos al arreglo de productos de la solicitud
      const productsArray = productosString.split('\n')
        .map((product) => product.trim())
        .filter((product) => product !== '');

      for (let j = 0; j < productsArray.length; j++) {
        const productData = productsArray[j].split('- Cantidad:');
        const productName = productData[0].trim();
        const productQuantity = parseInt(productData[1]);

        if (productName && !isNaN(productQuantity)) {
          solicitud.productos.push({
            nombre: productName,
            cantidad: productQuantity
          });
        }
      }

      solicitudes.push(solicitud); // Agregar la solicitud al arreglo de solicitudes
    }

    return solicitudes; // Retornar el arreglo de solicitudes
  }




  const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local


  const [boletas, setBoletas] = useState([]); // Estado inicial vacío

  useEffect(() => {
    axios
      .get("http://25.64.187.92:5000/api/productos/listarBodega", {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token, // Incluir el token en el encabezado como 'Authorization'
        },
      })
      .then((response) => {
        const jsone = response.data; // Guardar la respuesta en una variable
        console.log("estoy adentro", jsone.boletas);


        const generatedSolicitudes = generarSolicitud(jsone.boletas);
        setBoletas(generatedSolicitudes);
      })
      .catch((error) => {
        console.error(error); // Manejar los errores de la consulta
      });
  }, [token]);


  //VALIDACIONES

  const [showAlert, setShowAlert] = useState(false);

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  //inputs
  const [formData, setFormData] = useState({
    nombre: { value: '' },
    direccion: { value: '' },
    nombreDestino: { value: '' },
  });

  //inputs
  const handleInputChange = (event, fieldName) => {
    const value = event.target.value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: {
        value: value,
      },
    }));
  };



  const [modalBoleta, setModalBoleta] = useState(null);

  //enviar codigo de seguimiento
  const enviarSeguimiento = (responseData) => {
    console.log(responseData);
  
    const postData = {
      codigo_seguimiento: responseData.codigo_seguimiento
    };
    
    
  
    axios.post('https://api.example.com/seguimiento', postData)
      .then((response) => {
        // Manejar la respuesta de la solicitud POST
        console.log('Solicitud de seguimiento enviada correctamente:', response.data);
        // Realizar acciones adicionales si es necesario
      })
      .catch((error) => {
        // Manejar los errores de la solicitud POST
        console.error('Error al enviar la solicitud de seguimiento:', error);
        // Realizar acciones adicionales en caso de error
      });
  };
  
  // Ejemplo de uso
  const exampleResponseData = {
    // Datos de la respuesta que deseas enviar en la solicitud de seguimiento
    // Ajusta esto según la estructura de la respuesta
  };
  
  enviarSeguimiento(exampleResponseData);
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validación de campos vacíos
    if (!formData.nombre.value || !formData.direccion.value || !formData.nombreDestino.value) {
      setShowAlert(true);
      return;
    }
    // Limpiar los productod para posteriormente enviarlo en comentario
    const comentario = modalBoleta.productos
      .map((producto) => `producto: ${producto.nombre} cantidad: ${producto.cantidad}`)
      .join("\n");
    // Preparar los datos para enviar a la API
    const data = {
      nombre_origen: formData.nombre.value,
      direccion_origen: modalBoleta.sucursal,
      direccion_destino: formData.direccion.value,
      nombre_destino: formData.nombreDestino.value,
      comentario: comentario,
      info: "cyberEdge",

    };

    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local

    // Hacer la solicitud HTTP a la API para enviar los detalles
    axios.post("https://musicpro.bemtorres.win/api/v1/transporte/solicitud", data)
      .then((response) => {
        const responseData = response.data;

        console.log(responseData);
        console.log("solicitud enviada correctamente");
        enviarSeguimiento(responseData);
        // Realizar cualquier acción adicional después de enviar los detalles
      })
      .catch((error) => {
        // Manejar los errores de la solicitud HTTP
        console.error(error);
      });

    // Actualizar el stock de cada producto
    for (let i = 0; i < modalBoleta.productos.length; i++) {
      const nombreProducto = modalBoleta.productos[i].nombre;
      const cantidadRestar = modalBoleta.productos[i].cantidad;

      actualizarStockProductoPorNombre(nombreProducto, cantidadRestar, token)
        .then((data) => {
          console.log("Stock actualizado:", data);
          // Realizar las acciones necesarias después de actualizar el stock
        })
        .catch((error) => {
          console.error("Error al actualizar el stock:", error);
          // Manejar el error de manera adecuada
        });
    }

    handleClose();
    //  window.location.reload();
  };


  const actualizarStockProductoPorNombre = async (nombreProducto, cantidadRestar, token) => {
    try {
      // Obtener el producto por nombre
      const response = await axios.get(`http://localhost:3001/api/productos/nombre/${nombreProducto}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token, // Incluir el token en el encabezado como 'Authorization'
        },
      });

      const producto = response.data;


      if (producto) {
        // Restar la cantidad al stock existente
        const nuevoStock = producto.stock - cantidadRestar;

        // Actualizar el stock del producto
        await axios.put(
          `http://localhost:3001/api/productos/${producto._id}`,
          { stock: nuevoStock },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": token, // Incluir el token en el encabezado como 'Authorization'

            },
          }
        );

        return nuevoStock;
      } else {
        console.error("No se encontró el producto");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };


  const handleOpen = (boleta) => {
    setModalBoleta(boleta);
    setOpen(true);
  };

  const handleClose = () => {
    setModalBoleta(null); // Actualizar el estado a null
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
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  onClick={() => handleOpen(boleta)}
                >
                  Detalle
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}

      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{showAlert && (
          <Alert severity="error" onClose={() => setShowAlert(false)}>
            Todos los campos son requeridos
          </Alert>
        )}
          {modalBoleta && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                {modalBoleta.productos.map((producto, index) => (
                  <Typography key={index}>
                    <span style={{ color: theme.palette.secondary[400] }}>
                      Producto:
                    </span>{" "}
                    {producto.nombre}
                  </Typography>
                ))}
              </Grid>

              <Grid item xs={12} md={6}>
                {modalBoleta.productos.map((producto, index) => (
                  <Typography key={index}>
                    <span style={{ color: theme.palette.secondary[400] }}>
                      Cantidad:
                    </span>{" "}
                    {producto.cantidad}
                  </Typography>
                ))}
              </Grid>

              <Grid item xs={12} md={6} marginTop={"1rem"}>
                <Typography>
                  <span style={{ color: theme.palette.secondary[400] }}>
                    Fecha Compra:
                  </span>{" "}
                  {modalBoleta.fechaBoleta}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} marginTop={"1rem"}>
                <Box display="flex" alignItems="center">
                  <Typography variant="h6">
                    <span style={{ color: theme.palette.secondary[400] }}>
                      Nombre:
                    </span>{" "}
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Nombre"
                    value={formData.nombre.value}
                    onChange={(e) => handleInputChange(e, "nombre")}
                    type="text"
                    sx={{ marginLeft: "1rem" }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6} marginTop={"1rem"}>
                <Box display="flex" alignItems="center" >
                  <Typography variant="h6" >
                    <span style={{ color: theme.palette.secondary[400] }}>
                      Dirección:
                    </span>{" "}
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Dirección"
                    value={formData.direccion.value}
                    onChange={(e) => handleInputChange(e, "direccion")}
                    sx={{ marginLeft: "1rem" }}
                    type="text"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6} marginTop={"1rem"}>

                <Box display="flex" alignItems="center" >
                  <Typography variant="h6">
                    <span style={{ color: theme.palette.secondary[400] }}>
                      Nombre destino:
                    </span>{" "}
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Nombre Destino"
                    value={formData.nombreDestino.value}
                    type="text"
                    onChange={(e) => handleInputChange(e, "nombreDestino")}
                    sx={{ width: "100%" }}

                  />
                </Box>
              </Grid>
              <Grid item xs={12} >
                <Box sx={{ marginTop: "2rem" }}>
                  <Card sx={{ borderRadius: "0.55rem" }}>
                    <CardContent>
                      <Box display="flex" alignItems="center">
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth
                          type="submit"
                          onClick={handleSubmit}
                        >
                          Enviar Detalle
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          fullWidth
                          onClick={handleClose}
                          sx={{ marginLeft: "10px" }}
                        >
                          Cancelar
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          )}
        </Box>
      </Modal>


    </Box>
  );


};

export default Solicitudes;