import { AbstractPokemon } from "./AbstractPokemon";
// @ts-expect-error
export class Pokemon extends AbstractPokemon {
  // TODO: Implement This Class
  image: string
  evolutionList: [string]

  constructor(data: any){
    super(data);
    this.image = data.image;
    this.evolutionList = data.evolutionList;
  }

  getName(): string{
    return this.name;
  }

  getTypesString(): string[]{
    return this.types;
  }
  //getTypes(): unknown[];
  getWeight(): number{
    return this.weight;
  }
  getHeight(): number{
    return this.height;
  }
  getOrder(): number{
    return this.order;
  }
  //abstract getEvolutions(): unknown;
  
  // getNextEvolutionName(): string{
  //   return 
  // }
}