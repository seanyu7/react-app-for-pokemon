import React from "react";

/*make a card component to make it to make use of map function */
const Card = ({ pokemon }) => {
  return (
    <div className="card">
      <div className="card-image">
        <img src={pokemon.sprites.front_default} alt="the image of pokemon" />
      </div>
      <h3 className="cardName">{pokemon.name}</h3>
      <div className="cardTypes">
        <div>タイプ</div>
        {pokemon.types.map((type) => {
          return (
            <div>
              <span className="typeName">{type.type.name}</span>
            </div>
          );
        })}
      </div>
      <div className="cardInfo">
        <div className="cardData">
          <p className="title">Weight : {pokemon.weight}</p>
        </div>
        <div className="cardData">
          <p className="title">Height : {pokemon.height}</p>
        </div>
        <div className="cardData">
          <p className="title">Ability : {pokemon.abilities[0].ability.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
