import { useEffect, useState } from "react"
import Image from 'next/image'
import Link from 'next/link'


function Index () { 
  const [pokemonList, setPokemonList] = useState ([])

  useEffect(() => {
    const pokemonData = JSON.parse(localStorage.getItem('pokemonCaptured'))
    setPokemonList(pokemonData)
  }, [])

  return (
    <div>
       {pokemonList.map((pokemon, i) =>
       <div key={i}>
        <Image src={pokemon.image} alt={pokemon.name} width={40} height={40} />
        <h1 > {pokemon.name} </h1>
        <Link href={`/pokemon/${pokemon.id}`}> Pokemon info </Link>
        </div>
    )}

    <Link href="/"> Capturar Pokemon </Link>
    </div>
   
  )
}

export default Index