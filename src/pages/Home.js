import { DataComponent, Home, NavigationBar } from "../components/component";
import { SearchBar } from "../components/searchBar";
import { ThemeProvider } from "styled-components";
import Pagination from "react-js-pagination";
import { useEffect, useState } from "react";
import { darkTheme, lightTheme } from "../components/theme";
import { ThemeModeButton } from "../components/toggle";
import '../styles/App.css';
import PokemonData from "../pokemonData";
import { useLocation } from "react-router-dom";
import Splash from "./loading";

function HomePage() {
  //Data fetch

    const [filteredData, setFilteredData] = useState([]);
    const [displayedData, setData] = useState([]);
    const allPokemonData = PokemonData;

    const [splash, setSplash] = useState(true);
    useEffect(() => {
      let splashed = sessionStorage.getItem("splashed");
      if(splashed ==="true")
        setSplash(false);
    }, [])

    const handleSplash = () => {
      setSplash(false);
    }
    //serarch 기능
    const [search, setSearch] = useState("");
    const onChange = (e) => {
      setSearch(e.target.value);
    }

    useEffect(()=>{
      const filterType = allPokemonData.filter(p => {
        for(const type of p["type"])
        {
          if(type.includes(search))
            return true;
        }
        return false;
      })

      setFilteredData(filterType);
    }, [search, allPokemonData])
 

    //pagination
    const [page, setPage] = useState(1);
    
    const location = useLocation();
    useEffect(() => {
      if (location.state?.page != null) {
        setPage(location.state.page);
      }
    }, [location.state]);

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
    if(splash === true)
      return (<Splash finishSplash={handleSplash}/>);
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
                <DataComponent key={index} data={data} page={page}/>
              ))}
            </div>

            <Pagination
              activePage={page}
              itemsCountPerPage={20}
              totalItemsCount={allPokemonData.length}
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