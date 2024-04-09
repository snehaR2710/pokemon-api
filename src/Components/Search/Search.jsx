import useDebounce from '../../hook/useDebounce';
import './Search.css'

function Search({updateSearchTerm}) {

    const debounceCallback = useDebounce((e) => updateSearchTerm(e.target.value));
    return (
        <div className='pokedex-search-wrapper'>
           <input 
             id='pokemon-name-search'
             type="text"
             placeholder="pokemon name..."
             onChange={ (e) => debounceCallback(e)}
          />        
        </div>
    )
}

export default Search;