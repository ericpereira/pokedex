import axios from 'axios';
import { PokemonInfo } from './types/pokemon';

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

export { loadPokemonInfo }