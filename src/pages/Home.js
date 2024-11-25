import { DataComponent, Home, NavigationBar } from "../components/component";
import { SearchBar } from "../components/searchBar";
import { ThemeProvider } from "styled-components";
import Pagination from "react-js-pagination";
import { useEffect, useState } from "react";
import { darkTheme, lightTheme } from "../components/theme";
import { ThemeModeButton } from "../components/toggle";
import '../styles/App.css';
import axios from "axios";
import Loading from "./loading";

function HomePage() {
  //Data fetch
    const [loading, setLoading] = useState(true);
    const [pokemonData, setPokemonData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [displayedData, setData] = useState([]);

    const fetchPokemon = async () => {
      const baseURL = "https://pokeapi.co/api/v2";

      const allPokemonData = [];
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

      setPokemonData(allPokemonData);
      setLoading(false);

      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
      fetchPokemon();
      console.log("fetch 완료")
    },[]);


    //serarch 기능
    const [search, setSearch] = useState("");
    const onChange = (e) => {
      setSearch(e.target.value);
    }

    useEffect(()=>{
      const filterType = pokemonData.filter(p => {
        for(const type of p["type"])
        {
          if(type.includes(search))
            return true;
        }
        return false;
      })

      setFilteredData(filterType);
    }, [search, pokemonData])
 

      //pagination
      const [page, setPage] = useState(1);
      const changePageHandler = (page) => {
        setPage(page);
      }
    
      useEffect(() => {
        setData(filteredData.slice((page-1)*20, page * 20));
      }, [page, filteredData])
    

    //다크모드 구현 + localStorage 이용해 새로고침 후에도 상태 유지
    const [themeMode, setThemeMode] = useState("lightTheme");
    const theme = themeMode === "lightTheme" ? lightTheme : darkTheme;

    const toggleTheme = () => {
        themeMode === "lightTheme" ? setThemeMode("darkTheme") : setThemeMode("lightTheme");
        localStorage.removeItem('activeTheme');
        if(themeMode === "lightTheme")
        {
          localStorage.setItem('activeTheme', "darkTheme");
          setThemeMode("darkTheme");
        }else{
          localStorage.setItem('activeTheme', "lightTheme");
          setThemeMode("lightTheme");
        }
      }    

    useEffect(() => {
      let themeData = localStorage.getItem("activeTheme");
      if(themeData === "darkTheme")
        setThemeMode("darkTheme");
      localStorage.removeItem('activeTheme');
    }, [])

    //UI
    if(loading === true)
      return (<Loading/>);
    else{
      return (
        <ThemeProvider theme={theme}>
          <Home>
            <header className="App-header">
              <img src='./header.png' className="App-logo" alt="header" />
              <NavigationBar>
                <SearchBar search={search} onChange={onChange} />
                <ThemeModeButton toggleTheme={toggleTheme} themeMode={themeMode}/>
              </NavigationBar>
            </header>

            <div className="Content">
              {displayedData.map((data, index) => (
                <DataComponent key={index} data={data}/>
              ))}
            </div>

            <Pagination
              activePage={page}
              itemsCountPerPage={20}
              totalItemsCount={pokemonData.length}
              pageRangeDisplayed={5}
              prevPageText={"<"}
              nextPageText={">"}
              onChange={changePageHandler}
            />
          </Home>
        </ThemeProvider>
    );
    }

}

export default HomePage;