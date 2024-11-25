import axios from "axios";
import { useEffect, useState } from "react"

const baseURL = "https://pokeapi.co/api/v2";

export const PokemonData = () => {
    const [pokemonData, setPokemonData] = useState([]);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
              const res = await axios.get(`${baseURL}/pokemon?offset=0&limit=100`);
              const pokemonList = res.data.results; 
        
              const allPokemonData = [];
              for (const pokemon of pokemonList) {
                const speciesRes = await axios.get(pokemon.url);
                const speciesData = await axios.get(speciesRes.data.species.url);
                const koreanName = speciesData.data.names.find(name => name.language.name === 'ko');
                const typeList = speciesRes.data.types;
        
                const pokemonType = [];
                for(const Type of typeList) {
                    const typeRes = await axios.get(Type.type.url);
                    const typeName = typeRes.data.names.find(name => name.language.name === 'ko');
                    pokemonType.push(typeName.name);
                }
              
                allPokemonData.push({
                    title: koreanName.name,
                    sprite: speciesRes.data.sprites.front_default,
                    type: pokemonType,
              });
            }

            setPokemonData(allPokemonData);

            } catch (err) {
              console.log(err);
            }
          };

          fetchPokemon();

    },[]);

    const returnData = pokemonData;

    return returnData;
}

