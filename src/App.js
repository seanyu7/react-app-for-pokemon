import { useEffect, useState} from "react";
import "./App.css";
import { getAllPokemon } from "./utils/pokemon";

function App() {
 const initialURL = "https://pokeapi.co/api/v2/pokemon/";
 /*このURLのことをエンドポイントと言う。またこのエンドポイントのURLを叩くことで、データを引っ張って来ることが出来る。*/ 

const [loading,setLoading] = useState(true);

useEffect(() => {
  const fetchPokemonData = async () => {
    //全てのポケモンのデータを取得する
    let res = await getAllPokemon(initialURL);
    console.log(res);
    setLoading(false);
}
fetchPokemonData();
},[]);
 
 return (<div className="App">
  {loading ? (<h1>Loading...</h1> ): (<><h1>Pokemon data feched</h1></>)}
 </div>
 );
}

export default App;
