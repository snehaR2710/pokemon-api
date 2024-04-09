import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList() {
  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: "https://pokeapi.co/api/v2/pokemon",
    nextUrl: "",
    prevUrl: "",
  });

  async function downloadPokemons() {
    setPokemonListState((state) => ({ ...state, isLoading: true }));

    // this downloads 20 pokemon lists
    const response = await axios.get(pokemonListState.pokedexUrl);

    // we get the array of pokemons from result;
    const pokemonResults = await response.data.results;
    console.log("pokemon", pokemonResults);
    console.log(pokemonListState);

    // setNext(response.data.next);
    // setPrevUrl(response.data.previous);
    console.log("response is", response.data.pokemon);
    setPokemonListState((state) => ({
      ...state,
      nextUrl: response.data.next,
      prevUrl: response.data.previous,
    }));

    const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));

    // passing that promise array to axios.all
    // and pokemonData has array of 20 pokemon detailed data
    const pokemonData = await axios.all(pokemonResultPromise);
    console.log(pokemonData);

    // now iterate on the data of each pokemon, and extract id, name, image and types
    const pokeListResult = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      // console.log(pokemon);
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        typs: pokemon.types,
      };
    });

    console.log(pokeListResult);
    console.log("list", pokemonListState);
    // setPokemonList(pokeListResult);
    // setIsLoading(false);
    setPokemonListState((state) => ({
      ...state,
      pokemonList: pokeListResult,
      isLoading: false,
    }));
  }


  useEffect(() => {
    downloadPokemons();
  }, [pokemonListState.pokedexUrl])
  
  return [pokemonListState, setPokemonListState];
}

export default usePokemonList;
