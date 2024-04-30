export type Species = {
  name: string;
}

export type Chain = {
  evolves_to: [Chain]
  species: Species
}

export interface Pokemon {
  name: string,
  types: string[],
  weight: number,
  height: number,
  order: number,
}

export interface PokemonInfo {
  image: string;
  types: Object[];
  id: number;
  weight: number;
  height: number;
  abilities: Object[];
  evolutionChain: Chain
}