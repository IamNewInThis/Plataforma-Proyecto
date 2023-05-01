import React,{useState} from 'react'
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
    useMediaQuery,
}from "@mui/material"

import Header from 'components/Header'
import imagen from '../../assets/bajo-electrico-de-5-cuerdad-ibanez-sr505e-bm-211606-1.webp'

const Productos = () => {
    const theme = useTheme();
    const isNonMobile = useMediaQuery("(min-width:1000px)")
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
                    <Card sx={{
                        backgroundColor: theme.palette.background.alt,
                        borderRadius:"0.55rem"
                    }}>
                        <CardContent>
                            <Typography sx={{fontSize:14}} color={theme.palette.secondary[700]} gutterBottom>Bajo Electrico</Typography>
                            <Typography variant='h5' component={"div"}>Bajo eléctrico Ibanez SR505E 5 cuerdas - Brown Mahogany</Typography>
                            <Typography sx={{mb:"1.5rem"}} color={theme.palette.secondary[400]}>$799.900</Typography>
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
                            <img src={imagen} width={"200px"}></img>
                            <Button variant="contained" color='success'>Outlined</Button>
                            <Button variant="contained" color='success'>Outlined</Button>
                        </CardContent>
                    </Card>
            </Box>
        </Box>
    )
}

export default Productos