import { Button, Card, Grid, Skeleton, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from "react-router-dom";
import { useSharedData } from "./SharedData";


const Image = styled('img')({
    width: '100%',
});

type PokemonThumbProps = {
    name: string
}

type PokemonInfo = {
    image: string;
}

const loadPokemonInfo = async (
    setPokemonInfo: React.Dispatch<React.SetStateAction<PokemonInfo | undefined>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    name: string) => {
        
    await axios.get(`/pokemon/${name}`) 
        .then(response => {
            setTimeout(() => {}, 3000)
            setPokemonInfo(response.data.data)
            setIsLoading(false)
        })
    
}

function PokemonThumb(props: PokemonThumbProps){
    const { name } = props;
    const { myPokemons, handleCatchPokemon, viewedPokemons, handleViewPokemon } = useSharedData();
    const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [isCaught, setIsCaught] = useState(false);
    const [isViewed, setIsViewed] = useState(false);

    useEffect(() => {
        loadPokemonInfo(setPokemonInfo, setIsLoading, name)
        if(myPokemons?.filter((mp: string) => mp === name).length > 0){
            setIsCaught(true)
        }

        if(viewedPokemons?.filter((mp: string) => mp === name).length > 0){
            setIsViewed(true)
        }

    }, [name, myPokemons, viewedPokemons]);

    return <>
        <Grid item md={4} sm={4}>
        <Card>
            { isLoading ? <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" /> : <Link to={`pokemon/${name}`}><Image src={pokemonInfo?.image} alt='' /></Link> }
            { isLoading ? <Skeleton width="100%">
                <Typography>.</Typography>
                </Skeleton> : <Link to={`pokemon/${name}`}><Typography variant="h5" gutterBottom align="center" >
                    { name }
                </Typography></Link>}
                <Grid container style={{ justifyContent: 'center' }} >
                    {!isLoading && <Button style={{ marginBottom: 10, marginRight: 5 }} onClick={() => handleCatchPokemon(name) } variant={isCaught ? "contained" : 'outlined'} color='error' ><CatchingPokemonIcon />{ isCaught ? 'captured' : 'catch' }</Button> }
                    {!isLoading && <Button style={{ marginBottom: 10 }} onClick={() => handleViewPokemon(name) } variant={isViewed ? "contained" : 'outlined'} color='info' ><VisibilityIcon />{ isViewed ? 'viewed' : 'view' }</Button> }
                </Grid>
            </Card>
        </Grid>
    </>;
}

export default PokemonThumb;
