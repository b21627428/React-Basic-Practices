import React from 'react'

export default function PokemonList({pokemonList}) {
    return (
        <>
          {pokemonList.map(pokemon => {
              return <div key={pokemon}>{pokemon}</div>; 
          })}  
        </>
    )
}
