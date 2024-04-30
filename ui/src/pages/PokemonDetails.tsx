import { Box, Container, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import PokemonThumb from "../components/PokemonThumb";

type PropsPokemonDetails = {

}

function PokemonDetails(props: PropsPokemonDetails) {
    let { name } = useParams();
    return (
        <Container maxWidth="md" >
            <Box sx={{ flexGrow: 1 }}>
                <Navbar />
                <PokemonThumb name={name as string} />
            </Box>
        </Container>
    )
}

export default PokemonDetails;