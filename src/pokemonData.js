import axios from "axios";

const fetchPokemon = async () => {
  const baseURL = "https://pokeapi.co/api/v2";

  const allPokemonData = [];
  console.log('fetch 시작')
  try {
    const res = await axios.get(`${baseURL}/pokemon?offset=0&limit=100`);
    const pokemonList = res.data.results; 

    for (const pokemon of pokemonList) {
      const speciesRes = await axios.get(pokemon.url);
      const speciesData = await axios.get(speciesRes.data.species.url);
      const koreanName = speciesData.data.names.find(name => name.language.name === 'ko');
      const typeList = speciesRes.data.types;
      const statList = speciesRes.data.stats;


      const pokemonType = [];
      for(const Type of typeList) {
          const typeRes = await axios.get(Type.type.url);
          const typeName = typeRes.data.names.find(name => name.language.name === 'ko');
          pokemonType.push(typeName.name);
      }

      const pokemonStat =[];
      for(const Stat of statList) {
        const statRes = await axios.get(Stat.stat.url);
        const statName = statRes.data.names.find(name => name.language.name === 'ko');
        const statData = {'stat': statName.name, 'statFigure': Stat.base_stat}
        pokemonStat.push(statData);

      }
    
      allPokemonData.push({
          title: koreanName.name,
          sprite: speciesRes.data.sprites.front_default,
          type: pokemonType,
          stats: pokemonStat,
    });
  }
  console.log('fetch 완료')
  return allPokemonData;

  } catch (err) {
    console.log(err);
  }
};

export const PokemonData = await fetchPokemon();

export default PokemonData;

