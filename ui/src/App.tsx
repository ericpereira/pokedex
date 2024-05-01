import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from "axios";
import { Container } from "@mui/material";
import { Pokemon } from "./common/types/pokemon";
import PokemonThumb from "./components/PokemonThumb";
import Navbar from "./components/Navbar";
import LocationList from "./components/LocationList";

const healthCheckPing = async (
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const response = await axios.get("/_health");
    const message = response.data;
    setMessage(message);
  } catch (error) {
    setMessage(
      "Unable to check health of server. Please check that the server is started and that the proxy port matches the server port"
    );
  }
};

type Type = {
  name: string
}

const loadPokemons = async (
  limit: Number,
  offset: Number,
  setPokemons: React.Dispatch<React.SetStateAction<Array<Pokemon>>>,
  setTotalPokemons: React.Dispatch<React.SetStateAction<any>>) => {
  const pokemons = await axios.get<any>(`/pokemon/all?limit=${limit}&offset=${offset}`)
  setPokemons(pokemons.data.data)
  setTotalPokemons(pokemons.data.total)
}

const loadTypes = async (setTypes: React.Dispatch<React.SetStateAction<Type[]>>) => {
  const types = await axios.get<any>(`/types`)
  setTypes(types.data.data)
}

const loadTypePokemons = async (
  selectedType: string,
  setPokemons: React.Dispatch<React.SetStateAction<Array<Pokemon>>>,
  setTotalPokemons: React.Dispatch<React.SetStateAction<any>>
) => {
  const pokemons = await axios.get<any>(`/types/${selectedType}`)
  setPokemons(pokemons.data.data)
  setTotalPokemons(pokemons.data.total)
}

function App() {
  const [loading, setLoading] = useState(false);
  const [healthCheckMessage, setHealthCheckMessage] = useState("Loading...");
  const [selectedArea, setSelectedArea] = useState('');
  const [pokemons, setPokemons] = useState<Array<Pokemon>>([])
  const [totalPokemons, setTotalPokemons] = useState(0);
  const [clearLocation, setClearLocation] = useState(false);
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageOffset, setPageOffset] = useState(0);

  const [selectedType, setSelectedType] = useState('');
  const [types, setTypes] = useState<Type[]>([]);

  const loadRegionPokemons = async (
    pokemons: Pokemon[],
    total: number,
    area: string
  ) => {
    setPokemons(pokemons)
    setTotalPokemons(total)
    setSelectedArea(area)
    setClearLocation(false)
    setSelectedType('')
  }

  useEffect(() => {
    healthCheckPing(setHealthCheckMessage, setLoading);
    loadPokemons(rowsPerPage, pageOffset, setPokemons, setTotalPokemons)
    loadTypes(setTypes)
  }, [rowsPerPage, page, pageOffset]);

  useEffect(() => {
    if(selectedType && selectedType !== ''){
      loadTypePokemons(selectedType, setPokemons, setTotalPokemons);
    }
  }, [selectedType])

  const handleChangeType = (event: SelectChangeEvent) => {
    setSelectedType(event.target.value as string);
    setClearLocation(true)
    setSelectedArea('')
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    if(newPage > page){
      setPageOffset(pageOffset + rowsPerPage);
    }else{
      setPageOffset(pageOffset - rowsPerPage);
    }
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setPageOffset(0);
  };

  const handleClearFilter = () => {
    setSelectedType('')
    setClearLocation(true)
    setSelectedArea('')
    loadPokemons(rowsPerPage, pageOffset, setPokemons, setTotalPokemons)
  }

  return (
    <Container maxWidth="md" >
      <Box sx={{ flexGrow: 1 }}>
        <Navbar />
        <Grid container style={{ paddingTop: 30, paddingBottom: 30, justifyContent: 'space-around' }}>
          <Grid item md={4} sm={4} >
            <FormControl fullWidth>
              <InputLabel id="type">Type</InputLabel>
                <Select
                  labelId="type"
                  id="type-select"
                  value={selectedType}
                  label="Type"
                  onChange={handleChangeType}
                >
                  {types && types.length > 0 && types.map(t => <MenuItem key={t?.name} value={t?.name}>{t?.name}</MenuItem>)}
                </Select>
            </FormControl>
          </Grid>
          <Grid>
            <LocationList loadRegionPokemons={loadRegionPokemons} clearLocation={clearLocation} />
          </Grid>
          <Grid>
            <Button variant="outlined" color="error" onClick={() => handleClearFilter()}>
              Clear Filter
            </Button>
          </Grid>
        </Grid>
       { selectedArea && selectedArea !== '' && <Typography variant='h4' style={{ marginBottom: 30 }}>{selectedArea}</Typography> }
        <Grid container spacing={2}>
          { pokemons && pokemons.length === 0 && <Typography>No results</Typography> }
          { pokemons && pokemons.length > 0 && pokemons.map(p => <Grid item md={4} sm={4}>
            <PokemonThumb
              key={p.name}
              name={p.name}
              /></Grid>) }
        </Grid>

        { !selectedType && selectedArea === '' &&
        <TablePagination
          component="div"
          count={totalPokemons}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> }
      </Box>
    </Container>
  );
}

export default App;
