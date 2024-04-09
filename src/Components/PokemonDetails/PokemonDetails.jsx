
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


import './PokemonDetails.css'
import usePokemonDetails from "../../hook/usePokemonDetail";


function PokemonDetails({ pokemonName }) {
    const {id} = useParams();
    const [pokemon] = usePokemonDetails(id, pokemonName);
    // console.log("pokemon worked", pokemonListState, usePokemonDetails);

    return (
        <div className="pokemon-detail-wrapper">

              <div className="pokemon-details-name">{pokemon.name}</div>

              <img className="pokemon-details-image" src={pokemon.image} alt="Pokemon.Png" />

              <div className="pokemon-details-weight">Weight: {pokemon.weight}</div>

              <div className="pokemon-details-height">Height: {pokemon.height}</div>

              <div className="pokemon-details-types">
                <span>Type:</span>
                {pokemon.types && pokemon.types.map((t) => <div key={t}>{t}</div>)}
              </div>

              {
                pokemon.types && pokemon.similarPokemons && 
                <div>
                    more {pokemon.types[0]} type pokemons

                    <ul>
                        {pokemon.similarPokemons.map((p) => <li key={p.pokemon.url}>{p.pokemon.name}</li>)}
                    </ul>
                </div>
              }


              <Link className="link" style={{textDecoration: 'none'}}  to={'/'}>Back to home</Link>     
        </div>
    )
};

export default PokemonDetails;