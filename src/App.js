import { useEffect } from "react";
import "./App.css";
import { getAllPokemon } from "./utils/pokemon";

function App() {
 const initialURL = "https://pokeapi.co/api/v2/pokemon/";
 /*このURLのことをエンドポイントと言う。またこのエンドポイントのURLを叩くことで、データを引っ張って来ることが出来る。*/ 

useEffect(() => {
  const fetchPokemonData = async () => {
    //全てのポケモンのデータを取得する
    let res = await getAllPokemon(initialURL);
    console.log(res);
}
fetchPokemonData();
},[]);
 
 return <div className="App"></div>
}

export default App;
