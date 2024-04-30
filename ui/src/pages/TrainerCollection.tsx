import { Box, Container, Grid, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import { useSharedData } from "../components/SharedData";
import { useEffect, useState } from "react";
import PokemonThumb from "../components/PokemonThumb";

type PropsTrainerCollection = {

}

function TrainerCollection (props: PropsTrainerCollection) {
    const { myPokemons, viewedPokemons } = useSharedData();
    const [pokemons, setPokemons] = useState<string[]>([])

    useEffect(() => {
        const viewedNotCaptured = viewedPokemons.filter(v => !myPokemons.includes(v));
        setPokemons([...myPokemons, ...viewedNotCaptured]);
    }, [myPokemons, viewedPokemons])

    return <Container maxWidth="md" >
        <Box sx={{ flexGrow: 1 }}>
            <Navbar />
            <Typography variant='h5'>Trainer's Collection</Typography>
            <Grid container spacing={2}>
            { pokemons && pokemons.length === 0 && <Typography>No results</Typography> }
            { pokemons && pokemons.length > 0 && pokemons.map(p => <PokemonThumb
                key={p}
                name={p}
                />) }
            </Grid>
        </Box>
    </Container>;
}

export default TrainerCollection;