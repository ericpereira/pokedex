import { Button, Card, Grid, Skeleton, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from "react-router-dom";
import { useSharedData } from "./SharedData";
import { Pokemon, PokemonInfo } from "../common/types/pokemon";
import { loadPokemonInfo } from "../common/utils";


const Image = styled('img')({
    width: '100%',
});

type PokemonThumbProps = {
    name: string,
    setPokemonParentInfo?: React.Dispatch<React.SetStateAction<PokemonInfo | undefined>>
}

const typeColors: { [key: string]: string } = {
    normal: '#A8A77A',
    fighting: '#C22E28',
    flying: '#A98FF3',
    poison: '#A33EA1',
    ground: '#E2BF65',
    rock: '#B6A136',
    bug: '#A6B91A',
    ghost: '#735797',
    steel: '#B7B7CE',
    fire: '#EE8130',
    water: '#6390F0',
    grass: '#7AC74C',
    electric: '#F7D02C',
    psychic: '#F95587',
    ice: '#96D9D6',
    dragon: '#6F35FC',
    dark: '#705746',
    fairy: '#D685AD',
    unknown: '#000000',
    shadow: '#000000',
};
  
function getTypeColor(typeName: string): string {
    return typeColors[typeName] || '#ffffff';
}

function PokemonThumb(props: PokemonThumbProps){
    const { name, setPokemonParentInfo } = props;
    const { myPokemons, handleCatchPokemon, viewedPokemons, handleViewPokemon } = useSharedData();
    const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [isCaught, setIsCaught] = useState(false);
    const [isViewed, setIsViewed] = useState(false);

    useEffect(() => {
        if(name && name !== '') loadPokemonInfo(setPokemonInfo, setIsLoading, name)
        if(myPokemons?.filter((mp: string) => mp === name).length > 0){
            setIsCaught(true)
        }

        if(viewedPokemons?.filter((mp: string) => mp === name).length > 0){
            setIsViewed(true)
        }

    }, [name, myPokemons, viewedPokemons]);

    useEffect(() => {
        setPokemonParentInfo && setPokemonParentInfo(pokemonInfo)
    }, [pokemonInfo])
    

    return <>
         <Card>
            <Grid container style={{ paddingTop: 15, paddingLeft: 15 }}>
            { pokemonInfo?.types.map((t: any) => <Button key={t.type.name} style={{ backgroundColor: getTypeColor(t.type.name), color: '#fff', marginRight: 5 }} size="small">{t.type.name}</Button>) }
            </Grid>
            { isLoading ? <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" /> : <Link to={`/pokemon/${name}`}><Image src={pokemonInfo?.image} alt='' /></Link> }
            { isLoading ? <Skeleton width="100%">
            <Typography>.</Typography>
            </Skeleton> : <Link to={`/pokemon/${name}`}><Typography variant="h5" gutterBottom align="center" >
                { name }
            </Typography></Link>}
            <Grid container style={{ justifyContent: 'center' }} >
                {!isLoading && <Button style={{ marginBottom: 10, marginRight: 5 }} onClick={() => handleCatchPokemon(name) } variant={isCaught ? "contained" : 'outlined'} color='error' ><CatchingPokemonIcon />{ isCaught ? 'captured' : 'catch' }</Button> }
                {!isLoading && <Button style={{ marginBottom: 10 }} onClick={() => handleViewPokemon(name) } variant={isViewed ? "contained" : 'outlined'} color='info' ><VisibilityIcon />{ isViewed ? 'viewed' : 'view' }</Button> }
            </Grid>
        </Card>
    </>;
}

export default PokemonThumb;
