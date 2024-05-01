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
            <Typography variant='h5' style={{paddingTop: 30, paddingBottom: 30}}>Trainer's Collection</Typography>
            <Grid container spacing={2} >
            { pokemons && pokemons.length === 0 && <Grid item><Typography>No results</Typography></Grid> }
            { pokemons && pokemons.length > 0 && pokemons.map(p =>  <Grid item md={4} sm={4}><PokemonThumb
                key={p}
                name={p}
                /></Grid>) }
            </Grid>
        </Box>
    </Container>;
}

export default TrainerCollection;