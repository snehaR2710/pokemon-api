
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
import usePokemonList from "../../hook/usePokemonList";
import { useEffect } from "react";

function PokemonList() {
  console.log("render", );
  
  const [pokemonListState, setPokemonListState] = usePokemonList(false);

  useEffect(() => {
    console.log("render",);
  },)

  return (
    <div className="pokemon-list-wrapper">

     <div className="pokemon-wrapper">
         {pokemonListState.isLoading ? "Loading.... " :
             pokemonListState.pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />)
         } 
     </div>

     <div className="contrllers">
      <button disabled={pokemonListState.prevUrl == null} onClick={() => {

         const prevUriToSet = pokemonListState.prevUrl;

        setPokemonListState({...pokemonListState, pokedexUrl: prevUriToSet})}}>
          Prev</button>

      <button disabled={pokemonListState.nextUrl == null} onClick={() => {

        const nextUrlToSet = pokemonListState.nextUrl;

        setPokemonListState({ ...pokemonListState,pokedexUrl: nextUrlToSet})}}>Next</button>
     </div>
    </div>
  );
}

export default PokemonList;
