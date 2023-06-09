import {useEffect, useState} from "react";
import "../styles/Home.css"
import SearchBar from "../images/search_bar.png";
import HeadingRM from "../images/headingR&M.png"
import CharacterCard from "../components/CharacterCard";
import { Link } from "react-router-dom";
import GoogleLogin from "../components/GoogleLogin";

const API_URL = "https://rickandmortyapi.com/api/character/?name="

const Home = () => {
  
  const defaultSearch = async(title) => {
    const response = await fetch(`${API_URL}${title}`)
    const data = await response.json();
    setFirstLoad(data.results.sort((a, b) => a.name.localeCompare(b.name)));
  };

  const [firstLoad, setFirstLoad] = useState([defaultSearch("")]);
  const [characters, setCharaters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchCharacters = async(title) => {
    const response = await fetch(`${API_URL}${title}`)
    const data = await response.json();
    setCharaters(data.results.sort((a, b) => a.name.localeCompare(b.name)));
  };

  useEffect(() => {
    const data = window.localStorage.getItem('Characters');
    if (data !== null) setCharaters(JSON.parse(data))
  }, []);

  useEffect(() => {
    window.localStorage.setItem('Characters', JSON.stringify(characters))
  }, [characters]);
  
  // Search on pressed Enter key
  function handleKeyDown(e) {
    if(e.keyCode === 13) { 
      searchCharacters(searchTerm)
    }
  }

  return (
    <div className="main">
      <GoogleLogin />

      <img 
        className="heading"
        src = {HeadingRM}
        alt="heading"
        onClick={() => {searchCharacters("")}}
      />

      <div className="search-container">
        <img className="search-bar"
          src = {SearchBar}
          alt="searh-bar"
          onClick={() => {searchCharacters(searchTerm)}}
      />

        <input 
          className="input-search"
          placeholder="Filter by name..."
          value = {searchTerm}
          onKeyDown={handleKeyDown}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
        
      {characters?.length > 0 ? (

        <div className="container">
          {characters.map((character) => (
            <Link to={`/character/${character.id}`}>
              <CharacterCard key={character.id} className="element" character ={character} />
            </Link>))
          }
        </div>
        ) : (
          <div className="container">
          {firstLoad.map((load) => (
            <Link to={`/character/${load.id}`}>
              <CharacterCard key={load.id} className="element" character ={load} />
            </Link>))
          }
        </div>
            )
      }      
    </div>
  ); 
}

export default Home;