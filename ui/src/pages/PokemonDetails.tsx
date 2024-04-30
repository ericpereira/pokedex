import { Box, Card, Container, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import PokemonThumb from "../components/PokemonThumb";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from "react";
import { Pokemon, PokemonInfo } from "../common/types/pokemon";
import EvolutionChain from "../components/EvolutionChain";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
type PropsPokemonDetails = {

}

function PokemonDetails(props: PropsPokemonDetails) {
    let { name } = useParams();
    const [pokemonParentInfo, setPokemonParentInfo] = useState<PokemonInfo | undefined>(undefined)
    
    return (
        <Container maxWidth="md" >
            <Box sx={{ flexGrow: 1 }}>
                <Navbar />
            </Box>
            <Grid container>
                <Grid item md={6} style={{padding: 5}} >
                    <PokemonThumb name={name as string} setPokemonParentInfo={setPokemonParentInfo} />
                </Grid>
                <Grid item md={6} style={{padding: 5}}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                key={'Number'}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    Number
                                </TableCell>
                                <TableCell align="right">{pokemonParentInfo?.id}</TableCell>
                            </TableRow>
                            <TableRow
                                key={'Width'}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    Weight
                                </TableCell>
                                <TableCell align="right">{pokemonParentInfo?.weight}</TableCell>
                            </TableRow>
                            <TableRow
                                key={'Height'}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    Height
                                </TableCell>
                                <TableCell align="right">{pokemonParentInfo?.height}</TableCell>
                            </TableRow>
                            <TableRow
                                key={'Abilities'}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    Abilities
                                </TableCell>
                                <TableCell align="right"><Typography>{
                                    pokemonParentInfo?.abilities.map((a: any, index: number) => a.ability.name + (index < pokemonParentInfo?.abilities.length - 1 ? ', ' : '') )
                                }</Typography></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    </TableContainer>
                </Grid>    
            </Grid>
            <Grid container>
                <EvolutionChain evolutionChain={pokemonParentInfo?.evolutionChain} />
            </Grid>
        </Container>
    )
}

export default PokemonDetails;