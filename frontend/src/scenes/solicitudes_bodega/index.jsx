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
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleInputChange = (event) => {
    const { name, value } = event.currentTarget;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: {
        ...prevFormData[name],
        value: value,
        isValid: value.trim() !== "",
      },
    }));
  };
  const [formData, setFormData] = useState({
    nombre: { value: "", isValid: false },
    cantidad: { value: "", isValid: false },
  });
  

  const handlePost = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    if (!formData.nombre.isValid || !formData.cantidad.isValid) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    //crear solicitud
    const postData = new FormData();
    postData.append("name", formData.nombre.value);
    postData.append("cantidad", parseInt(formData.cantidad.value));
    
    try {
      const res = await axios.post(
        "http://localhost:3001/api/solicitudBodega/create",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );


      Swal.fire({
        title: "Producto Agregado",
        text: "El producto fue agregado de forma correcta",
        icon: "success",
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (e) {
      alert(e);
    }
  };
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);


    //METODO LISTAR
    const fetchProducts = () => {

      const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
  
      axios
      .get("http://localhost:3001/api/solicitudBodega", {
        headers: {
          "auth-token": token, // Incluir el token en el encabezado como 'Authorization'
        },
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  
    };


  return (
    <Box m={"1.5rem 2.5rem"}>
      <Header titulo={"Solicitudes a Bodega"}></Header>
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
                    value={formData.nombre.value}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5" component="div" marginRight="10px">
                    Cantidad:
                  </Typography>
                  <TextField
                    color="success"
                    variant="outlined"
                    type="number"
                    name="cantidad"
                    fullWidth
                    placeholder="Cantidad"
                    value={formData.cantidad.value}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    type="submit"
                    onClick={handlePost}
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
       {products.map((product, index) => (
  <Card
    key={index}
    sx={{
      backgroundColor: theme.palette.background.alt,
      borderRadius: "0.55rem",
    }}
  >
    <CardContent>
      <Typography variant="h5" component="div">
        Nombre Producto: {product.name}
      </Typography>

      <Typography
        variant="h5"
        component="div"
        sx={{ mb: "1.5rem" }}
        color={theme.palette.secondary[400]}
      >
        Cantidad: {product.cantidad}
      </Typography>

      <Box display="flex" justifyContent="space-between">
        <Button variant="contained" color="success" fullWidth>
          Detalle
        </Button>
      </Box>
    </CardContent>
  </Card>
))}
      </Box>
    </Box>
  );
};

export default SolicitudesBodega;
