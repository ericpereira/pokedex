import { Box, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

type PropsPokemonDetails = {

}

function PokemonDetails(props: PropsPokemonDetails){
    let { name } = useParams();
    return (
        <Container maxWidth="md" >
            <Box sx={{ flexGrow: 1 }}>
                <Navbar />
                {name}
            </Box>
        </Container>
    )
}

export default PokemonDetails;