import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  Grid

} from "@mui/material";

import Header from "components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";

// MÃ©todo para consultar los productos en la base de datos
const ProductosBodega = () => {

  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  //METODO LISTAR
  const fetchProducts = () => {
    const token = localStorage.getItem("token"); // Obtener el token del almacenamiento local

    axios
      .get("http://localhost:3001/apiF/productos", {
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
    <Box m="1.5rem 2.5rem" sx={{ isnonmobile: isNonMobile.toString() }}>
      <Header titulo={"Productos"}></Header>
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
              <Typography
                sx={{ fontSize: 14 }}
                color={theme.palette.secondary[500]}
                gutterBottom
              >
                {product.categoria}
              </Typography>

              <Typography variant="h5" component="div" mt={1}>
                {product.nombre}
              </Typography>

              <Typography
                sx={{ mb: "1.5rem" }}
                color={theme.palette.secondary[400]}
                mt={1}
              >
                ${product.precio}
              </Typography>

              <Grid item xs={12} md={6}>
                  <Typography>
                    <span style={{ color: theme.palette.secondary[400] }}>
                      Stock:
                    </span>{" "}
                    {product.stock}
                  </Typography>
              </Grid>

              <Box maxWidth="200px" margin="0 auto" mt={2}>
                <img
                  src={product.imagen}
                  width="200px"
                  style={{
                    maxWidth: isNonMobile ? "200px" : "100%",
                    height: "200px",
                    width: "200px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "1rem",
                  }}
                  alt="Product"
                />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ProductosBodega;