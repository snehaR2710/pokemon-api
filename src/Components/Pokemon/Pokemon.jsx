import { Link } from "react-router-dom";
import "./Pokemon.css";

function Pokemon({ name, image, id }) {
  return (
    <div className="pokemons-wrapper">
      <Link style={{textDecoration: 'none'}} to={`/pokemon/${id}`}>
        <div className="pokemons-name">{name}</div>

        <div className="pokemon-img">
          <img src={image} />
        </div>
      </Link>
    </div>
  );
}

export default Pokemon;
