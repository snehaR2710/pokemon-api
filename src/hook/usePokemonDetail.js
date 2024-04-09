import axios from "axios";
import { useEffect, useState } from "react";
// import usePokemonList from "./usePokemonList";

function usePokemonDetails(id, pokemonName) {
  const [pokemon, setPokemon] = useState({});

  async function downloadPokemonDetails() {
    try {
      let response;
      if (pokemonName) {
        console.log("feching by name");
        response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
      } else {
        response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      }
      const pokemonOfSameTypes = await axios.get(
        `https://pokeapi.co/api/v2/type/${
          response.data.types ? response.data.types[0].type.name : ""
        }`
      );
      console.log("similar", pokemonOfSameTypes.data.pokemon);
      // console.log(response.data);
      console.log("s", pokemonOfSameTypes);
      setPokemon((state) => ({
        ...state,
        name: response.data.name,
        image: response.data.sprites.other.dream_world.front_default,
        weight: response.data.weight,
        height: response.data.height,
        types: response.data.types.map((t) => t.type.name),
        similarPokemons: pokemonOfSameTypes.data.pokemon.slice(0, 5),
      }));

      console.log(response.data.types);
      setPokemonListState({
        ...pokemonListState,
        type: response.data.types ? response.data.types[0].type.name : "",
      });
    } catch (error) {
        console.log(`Somthing went wrong ${error}`);
    }


  }

//   const [pokemonListState, setPokemonListState] = usePokemonList();
const [pokemonListState, setPokemonListState] = useState({});

  useEffect(() => {
    downloadPokemonDetails();
  }, []);

  return [pokemon];
}

export default usePokemonDetails;
