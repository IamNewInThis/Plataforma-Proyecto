import React, { useState } from "react";
import axios from 'axios'
import Header from "components/Header";
import Inputs from "components/Inputs";
import InputList from "components/InputList";
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  useTheme,
  TextField,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LeyendaError from "components/LeyendaError"; // Importar LeyendaError

const Agregar = () => {
  //COLORES
  const theme = useTheme();

  // ADAPTART PANTALLA
  const isNonMobile = useMediaQuery("(min-width:600px)");

  //Opciones
  const options = [
    { label: "Guitarra Electrica", value: 1 },
    { label: "Guitarra Acústica", value: 2 },
    { label: "Guitarra Electroacústica", value: 3 },
  ];

  //Opciones 2
  const options2 = [
    { label: "Guitarras", value: 1 },
    { label: "Percusión", value: 2 },
    { label: "Pianos", value: 3 },
    { label: "Bajos", value: 4 },
    { label: "Baterías Acústicas", value: 5 },
    { label: "Baterías Electrónica", value: 6 },
    { label: "Amplificadores", value: 7 },
    { label: "Accesorios", value: 8 },
  ];

  // Funcion para subir imagenes
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  //inputs
  const [formData, setFormData] = useState({
    nombre: { value: "", isValid: false },
    precio: { value: "", isValid: false },
    marca: { value: "", isValid: false },
  });

  //Expresiones de validacion
  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    precio: /^\d{4,9}$/,
    marca: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "precio") {
      const isValid = parseFloat(value) >= 1; // Verifica si el valor es un número mayor o igual a 1

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: { value, isValid },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: { value, isValid: expresiones[name].test(value) },
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar si todos los campos son válidos
    const isFormValid = Object.values(formData).every((field) => field.isValid);
    if (isFormValid) {
      // Realizar acciones con los datos del formulario si es válido
      console.log("Formulario válido", formData);
    } else {
      // Mostrar mensajes de error o tomar otras acciones si es inválido
      console.log("Formulario inválido");
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header titulo={"Agregar Productos"}></Header>

      <form onSubmit={handleSubmit}>
        <Box
          margin={""}
          mt="20px"
          display={"grid"}
          gridTemplateColumns={"repeat(2, minmax(0, 1fr))"}
          justifyContent={"space-between"}
          rowGap={"20px"}
          columnGap={"1.33%"} //SEPARACION DEL MEDIO DE LAS CARD
          noValidate
          autoComplete="off"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {/* Container */}
          <Card
            sx={{
              backgroundColor: theme.palette.background.alt,
              borderRadius: "0.55rem",
            }}
          >
            {/* NOMBRE */}
            <CardContent>
              <Box display="flex" alignItems="center">
                <Typography variant="h5" component={"div"} marginRight={"10px"}>
                  Nombre:
                </Typography>
                <TextField
                  color="success"
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="nombre"
                  value={formData.nombre.value}
                  onChange={handleChange}
                  placeholder="Nombre"
                />
              </Box>
              {!formData.nombre.isValid && (
                <span style={{ color: "red" }}>Error en el Nombre</span>
              )}
            </CardContent>

            {/* PRECIO */}
            <CardContent>
              <Box display="flex" alignItems="center">
                <Typography variant="h5" component={"div"} marginRight={"21px"}>
                  Precio:
                </Typography>
                <TextField
                  color="success"
                  fullWidth
                  variant="outlined"
                  type="number"
                  name="precio"
                  value={formData.precio.value}
                  onChange={handleChange}
                  placeholder="Precio"
                />
              </Box>
              {!formData.precio.isValid && (
                <span style={{ color: "red" }}>Error en el Precio</span>
              )}
            </CardContent>

            {/* IMAGEN */}
            <CardContent>
              <Box display="flex" alignItems="center">
                <Typography variant="h5" component={"div"}>
                  Imagen:
                </Typography>
                <input
                  type="file"
                  id="imagenInput"
                  accept="image/"
                  onChange={handleImageChange}
                ></input>
              </Box>
            </CardContent>
          </Card>

          {/* Container */}
          <Card
            sx={{
              backgroundColor: theme.palette.background.alt,
              borderRadius: "0.55rem",
            }}
          >
            {/* MARCA */}
            <CardContent>
              <Box display="flex" alignItems="center">
                <Typography
                  variant="h5"
                  component={"div"}
                  marginRight={"1.1rem"}
                >
                  Marca:
                </Typography>
                <TextField
                  color="success"
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="marca"
                  value={formData.marca.value}
                  onChange={handleChange}
                  placeholder="Marca"
                ></TextField>
              </Box>
              {!formData.marca.isValid && (
                <span style={{ color: "red" }}>Error en la Marca</span>
              )}
            </CardContent>

            <CardContent>
              <Box display="flex" alignItems="center">
                <Typography variant="h5" component={"div"} marginRight={"8px"}>
                  Categoria:
                </Typography>
                <InputList options={options2} label={"Categorias"} />
              </Box>
            </CardContent>

            <CardContent>
              <Box display="flex" alignItems="center">
                <Typography variant="h5" component={"div"} marginRight={"-8px"}>
                  Sub Categoria:
                </Typography>
                <InputList options={options2} label={"Categorias"} />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </form>

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
  );
};

export default Agregar;