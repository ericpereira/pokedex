import axios from "axios";
import express from "express";

const PORT = process.env.PORT || 8080;
const app = express();
const POKEMON_API_URL = 'https://pokeapi.co/api/v2/';
import NodeCache from "node-cache";
const cache = new NodeCache({ stdTTL: 60 * 60 }); // TTL de 1 hora

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/pokemon/all', async (_req, res) => {
  try {
    const { offset, limit } = _req.query;
    const cacheKey = `pokemon_all_${offset}_${limit}`;
    let data = cache.get(cacheKey);
    
    if(!data){
      const response: any = await axios.get(POKEMON_API_URL + `pokemon/?limit=${limit}&offset=${offset}`, {});
      const { results, count } = response.data;
      data = { total: count, data: results.map((p: any) => ({ name: p.name })) }
      cache.set(cacheKey, data);
    }
    res.status(200).json(data);

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error to obtain pokemon list info' });
  }
});

app.get('/pokemon/:name', async (_req, res) => {
  try {
    const { name } = _req.params;

    const cacheKey = `pokemon_${name}`;
    let data = cache.get(cacheKey);

    if(!data){
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
        //console.log(error)
        console.log('error to obtain specie chain ' + name)
      }

      data = { data: {...response.data, image, evolutionChain } };
      cache.set(cacheKey, data);
    }

    res.status(200).json(data);

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

    const cacheKey = `types_${url}`;
    let data = cache.get(cacheKey);

    if(!data){
      const response: any = await axios.get(POKEMON_API_URL + url, {});
      data = isType ?
      {
        total: response.data?.pokemon.length, 
        data: response.data?.pokemon.map((p: any) => ({ name: p.pokemon.name }))
      } :
        {
          total: response.data?.count,
          data: response.data?.results 
        }
    }
    res.status(200).json(data);

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

    const cacheKey = `locations_${url}`;
    let data = cache.get(cacheKey);

    if(!data){
      const response: any = await axios.get(POKEMON_API_URL + url, {});
      data = {
        ...(!isLocation ? { total: response.data?.count } : {}),
        data: isLocation ? response.data?.pokemon_encounters.map((p: any) => ({ name: p.pokemon.name})) : response.data?.results
      };
    }
    
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error to obtain location info" });
  }
});


app.get('/_health', (_req, res) => {
  res.send('Server is running!');
})

app.listen(PORT, () => {
  console.log(`App Listening on Port: ${PORT}`);
});
