import { Card, Grid, Skeleton, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';


const Image = styled('img')({
    width: '100%',
});

type PokemonThumbProps = {
    name: string;
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
    const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        loadPokemonInfo(setPokemonInfo, setIsLoading, name)
    }, [name])

    return <>
        <Grid item md={4} sm={4}>
        <Card>
            { isLoading ? <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" /> : <Image src={pokemonInfo?.image} alt='' /> }
            { isLoading ? <Skeleton width="100%">
                <Typography>.</Typography>
                </Skeleton> : <Typography variant="h5" gutterBottom align="center" >
                    { name }
                </Typography>}
            </Card>
        </Grid>
    </>;
}

export default PokemonThumb;
