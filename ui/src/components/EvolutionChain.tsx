import { Card, Grid, Typography } from "@mui/material"
import { Chain } from "../common/types/pokemon";
import PokemonThumb from "./PokemonThumb";

type PropsEvolutionChain = {
    evolutionChain: Chain | undefined
}

function EvolutionChain(props: PropsEvolutionChain){
    const { evolutionChain } = props;

    const pokemonsInChain = []
    let currentChain = evolutionChain
    do {
        if(currentChain?.species?.name) pokemonsInChain.push(currentChain?.species?.name)
        currentChain = currentChain?.evolves_to && currentChain?.evolves_to.length > 0 ? currentChain?.evolves_to[0] : undefined
    }while(currentChain?.species?.name)
        
    return pokemonsInChain && pokemonsInChain.length > 0 ? <>
        <Typography variant="h5" style={{ marginTop: 30 }} >Evolution Chain</Typography>
        <Grid container>
            { pokemonsInChain?.map(p => <Grid xs={4}><PokemonThumb name={p as string} /></Grid>) }
        </Grid></> : <></>
}

export default EvolutionChain