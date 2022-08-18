import React from 'react'

/*make a card component to make it to make use of map function */
const Card = ({pokemon}) => {
  return (
    <div className='card'>
        <div className='card-image'>
            <img src={pokemon.sprites.front_default} alt="the image of pokemon"/>
            </div>
    </div>
  )
}

export default Card