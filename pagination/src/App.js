import React,{useState,useEffect} from 'react'
import PokemonList from "./PokemonList";
import axios from "axios";
import Pagination from './Pagination';

export default function App() {
  const [pokemonList,setPokemonList] = useState([]);
  const [currentPageURL,setCurrentPageURL] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextPageURL,setNextPageURL] = useState();
  const [prevPageURL,setPrevPageURL] = useState();

  useEffect(() => {
    axios.get(currentPageURL).then(response => {
      const {next,previous,results} = response.data;
      setNextPageURL(next);
      setPrevPageURL(previous);
      setPokemonList(results.map(p => p.name));
    })
  },[currentPageURL])

  const goToNextPage = () => setCurrentPageURL(nextPageURL);
  const goToPrevPage = () => setCurrentPageURL(prevPageURL);

  return (
    <>
      <PokemonList pokemonList={pokemonList} />
      <Pagination goToNextPage={nextPageURL ? goToNextPage : null} goToPrevPage={prevPageURL ? goToPrevPage : null}/>
    </>
  )
}