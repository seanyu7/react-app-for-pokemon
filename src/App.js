import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import Card from "./component/Card";
import Navbar from "./component/Navbar";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon/";
  /*このURLのことをエンドポイントと言う。またこのエンドポイントのURLを叩くことで、データを引っ張って来ることが出来る。*/

  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      //全てのポケモンのデータを取得する
      let res = await getAllPokemon(initialURL);
      //各ポケモンの詳細なデータを取得する。
      //取得したデータに関してconstを使用し、resという関数の中に格納し定義している。
      //その格納したデータの中のresultという名前の欄に各ポケモンのURLが存在するから、それを呼び出そうとしている。
      loadPokemon(res.results);
      //loadPokemonという関数にres.resultという変数を代入することによって、ここで渡したURLに対しrてどのような作業をするのかについて書くことが出来る。
      //console.log(res);
      setNextURL(res.next);
      setPrevURL(res.previous);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    //この上の括弧の中に入っているdataは、loadPokemonに代入した、res.resultのことを指しているので、
    //ここではdataの中の一つ一つのデータを取り出して、それにたいして、map関数を回すことで、それぞれのデータに対して、getAllPokemon関数を呼び出して、そのデータを取得することが出来る。
    let _pokemonData = await Promise.all(
      //promise.allに関しては、ひとつひとつのURLにアクセスして、すべてのデータをfetchしなければならないため、そのデータが全て取得し終わるまでは次の行動に移らないということを記している

      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  //console.log(pokemonData);

  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    //console.log(data);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setLoading(false);
  };

  const handlePrevPage = async() => {
if (!prevURL) return;

    setLoading(true);
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            {/*ここでは、pokemonDataの中のデータをmap関数で回すことで、それぞれのデータに対して、Cardコンポネントを呼び出すことが出来る。*/}
            <div className="btn">
              <button onClick={handlePrevPage}>Previous Page</button>
              <button onClick={handleNextPage}>Next Page</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
