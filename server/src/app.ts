import axios from "axios";
import express from "express";

const PORT = process.env.PORT || 8080;
const app = express();
const POKEMON_API_URL = 'https://pokeapi.co/api/v2/';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/pokemon/all', async (_req, res) => {
  try {
    const { offset, limit } = _req.query;
    const { query, location, size, height } = _req.body;
    const response: any = await axios.get(POKEMON_API_URL + `pokemon/?limit=${limit}&offset=${offset}`, {});
    const { results, count } = response.data
    const pokemons = []
    for(const p of results){
      const pokemon = await axios.get(POKEMON_API_URL + `pokemon/${p.name}`)
      pokemons.push(pokemon.data);
    }
    
    return res.status(200).json({ total: count, data: pokemons });
    
    //res.status(200).json({ total: count, data: results.map((p: any) => ({ name: p.name })) });

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error to obtain pokemon list info' });
  }
});

app.get('/pokemon/:name', async (_req, res) => {
  try {
    const { name } = _req.params;
    const response: any = await axios.get(POKEMON_API_URL + `pokemon/${name}`, {});
    const image = response.data?.sprites?.other?.home?.front_default ? response.data?.sprites?.other?.home?.front_default : response.data?.sprites?.front_default;

    let evolutionChain = {}
    try {
      //load pokemon chain
      const responseSpecie = await axios.get(POKEMON_API_URL + `pokemon-species/${name}`)
      const chainUrl = responseSpecie?.data?.evolution_chain?.url;
      
      if(chainUrl){
        const responseChain = await axios.get(chainUrl)
        evolutionChain = responseChain?.data?.chain
      } 
    } catch (error) {
      console.log(error)
      console.log('error to obtain specie chain' + name)
    }

    res.status(200).json({ data: {...response.data, image, evolutionChain } });

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error to obtain pokemon data' });
  }
});

app.get('/types/:type?', async (_req, res) => {
  try {
    const { type } = _req.params;
    const { offset, limit } = _req.query;
    const isType = type && type !== '' ? true : false;
    const url = isType ? `type/${type}` : `type?limit=${limit}&offset=${offset}`;
    const response: any = await axios.get(POKEMON_API_URL + url, {});
    res.status(200).json(
      isType ?
      {
        total: response.data?.pokemon.length, 
        data: response.data?.pokemon.map((p: any) => ({ name: p.pokemon.name }))
      } :
        {
          total: response.data?.count,
          data: response.data?.results 
        }
  );
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error to obtain type info" });
  }
});

app.get('/locations/:location?', async (_req, res) => {
  try {
    const { location } = _req.params;
    const { offset, limit } = _req.query;
    const isLocation = location && location !== '' ? true : false
    const url = isLocation ? `location-area/${location}` : `location-area?limit=${limit}&offset=${offset}`;
    const response: any = await axios.get(POKEMON_API_URL + url, {});
    res.status(200).json({
      ...(!isLocation ? { total: response.data?.count } : {}),
      data: isLocation ? response.data?.pokemon_encounters.map((p: any) => ({ name: p.pokemon.name})) : response.data?.results
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error to obtain location info" });
  }
});


app.get('/_health', (_req, res) => {
  res.send('Server is running!')
})

app.listen(PORT, () => {
  console.log(`App Listening on Port: ${PORT}`);
});
