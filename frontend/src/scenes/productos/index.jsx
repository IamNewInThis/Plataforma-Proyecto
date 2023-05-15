import React, { useState, useEffect } from "react";
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
  Modal,
  TextField,
  Grid,
} from "@mui/material";

import Header from "components/Header";
import imagen from "../../assets/bajo-electrico-de-5-cuerdad-ibanez-sr505e-bm-211606-1.webp";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";

//metodo para consultar los productos en la base de datos
const Productos = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    Maxwidth: 800,
    Maxheight: 550,
    bgcolor: "background.paper",
    border: "2px solid #fff",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = () => {
    axios
      .get("http://localhost:3001/api") //api de la base de datos
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //$Metodo para eliminar productos por ID

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/api/${id}`).then(() => {
      setProducts(products.filter((products) => products.id !== id));
      window.location.reload();
    });
  };

  //$metodo para actualizar producto
  const [editedProduct, setEditedProduct] = useState(null);

  const handleOpen = (producto) => {
    setEditedProduct(producto);
    setOpen(true);
  };

  const handleClose = () => {
    setEditedProduct(null);
    setOpen(false); // cerrar modal
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3001/api/${editedProduct._id}`, {
        nombre: editedProduct.nombre,
        precio: editedProduct.precio,
        marca: editedProduct.marca,
        stock: editedProduct.stock,
        imagen: editedProduct.imagen,
        categoria: editedProduct.categoria,
        subcategoria: editedProduct.subcategoria,
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

        {products.map((producto, index) => (
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
                color={theme.palette.secondary[700]}
                gutterBottom
              >
                Bajo Electrico
              </Typography>
              <Typography variant="h5" component={"div"}>
                {producto.nombre}
              </Typography>
              <Typography
                sx={{ mb: "1.5rem" }}
                color={theme.palette.secondary[400]}
              >
                {producto.precio}
              </Typography>
              <Box maxWidth={"200px"} margin={"0 auto"}>
                <img
                  src={producto.imagen}
                  width={"200px"}
                  style={{
                    maxWidth: isNonMobile ? "200px" : "100%", // Utiliza maxWidth y height para asegurarte de que la imagen no se estire en dispositivos móviles
                    height: "200px",
                    width: "200px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "1rem",
                  }}
                ></img>
              </Box>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Button
                  variant="contained"
                  onClick={() => handleOpen(producto)}
                  color="success"
                >
                  Editar
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(producto._id)}
                  sx={{ width: "87.75px" }}
                >
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
                  <form onSubmit={handleSubmit}>
                    {/* <h3>Formulario</h3> */}
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography>Nombre:</Typography>
                        <TextField
                          placeholder="nombre"
                          label="Nombre"
                          value={
                            setEditedProduct.nombre ||
                            (editedProduct && editedProduct.nombre) ||
                            ""
                          }
                          onChange={(e) =>
                            setEditedProduct({
                              ...editedProduct,
                              nombre: e.target.value,
                            })
                          }
                          margin="normal"
                          fullWidth
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Typography>Precio:</Typography>
                        <TextField
                          placeholder="precio"
                          label="precio"
                          value={
                            setEditedProduct.precio ||
                            (editedProduct && editedProduct.precio) ||
                            ""
                          }
                          onChange={(e) =>
                            setEditedProduct({
                              ...editedProduct,
                              precio: e.target.value,
                            })
                          }
                          margin="normal"
                          fullWidth
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Typography>Stock:</Typography>
                        <TextField
                          placeholder="0"
                          label="stock"
                          value={
                            setEditedProduct.stock ||
                            (editedProduct && editedProduct.stock) ||
                            ""
                          }
                          onChange={(e) =>
                            setEditedProduct({
                              ...editedProduct,
                              stock: e.target.value,
                            })
                          }
                          margin="normal"
                          fullWidth
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Typography>Imagen:</Typography>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const reader = new FileReader();
                            const file = e.target.files[0];
                            reader.readAsDataURL(file);
                            reader.onload = () => {
                              setEditedProduct({
                                ...editedProduct,
                                imagen: reader.result,
                              });
                            };
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography>Categoría:</Typography>
                        <TextField
                          placeholder="Categoría"
                          label="categoria"
                          value={
                            setEditedProduct.categoria ||
                            (editedProduct && editedProduct.categoria) ||
                            ""
                          }
                          onChange={(e) =>
                            setEditedProduct({
                              ...editedProduct,
                              categoria: e.target.value,
                            })
                          }
                          margin="normal"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} md={6} marginBottom={"6rem"}>
                        <Typography>SubCategoría:</Typography>
                        <TextField
                          placeholder="Subcategoría"
                          label="subcategoria"
                          value={
                            setEditedProduct.subcategoria ||
                            (editedProduct && editedProduct.subcategoria) ||
                            ""
                          }
                          onChange={(e) =>
                            setEditedProduct({
                              ...editedProduct,
                              subcategoria: e.target.value,
                            })
                          }
                          margin="normal"
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </form>
                  <Box>
                    <Card
                      sx={{
                        
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
                            onClick={handleSubmit}
                          >
                            Modificar
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            fullWidth
                            type="submit"
                            onClick={handleClose}
                            sx={{marginLeft: "10px"}}
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

export default Productos;
