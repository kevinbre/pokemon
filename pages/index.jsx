import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link' 
import pokedex from '../styles/Pokedex.module.css'
import axios from "axios";
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { Button, InputGroup, Form } from "react-bootstrap";


export default function Home() {
  const [initialPokemon, setInitialPokemon] = useState('pikachu')
  const [pokemon, setPokemon] = useState({})
  const [pokemonInput, setPokemonInput] = useState('')
  const [pokeballCount, setPokeballCount] = useState(0)
  const [error, setError] = useState(false)
  const [throwPokeball, setThrowPokeball] = useState(false)
  const [randomValue, setRandomValue] = useState(1)
  const [favoritePokemon, setFavoritePokemon] = useState([])

  useEffect(() => {
    pokemonData();
  }, [initialPokemon])

    const pokemonData = async () => {
    const max = 5;
    const min = 1;
    const number = Math.floor(Math.random() * (max - min) + min); 

      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${initialPokemon}`);
        setPokemon({
          id: response.data.id,
          name: response.data.forms[0].name,
          image: response.data.sprites.versions['generation-v']['black-white'].animated.front_default,
          captureValue: number
        })
        setError(false)
      } catch(error) {
        if(error) {
          toast.warning(`El pokemon no existe`, {theme: "dark"})
        }
      }
    } 
    
    const pokemonId = async () => {
    const max = 3;
    const min = 1;
    const number = Math.floor(Math.random() * (max - min) + min);
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
      setPokemon({
        id: response.data.id,
        name: response.data.forms[0].name,
        image: response.data.sprites.versions['generation-v']['black-white'].animated.front_default,
        captureValue: number
      })
    }

    useEffect(() => {
      const favPokemon = localStorage.getItem('pokemon');
      if(favPokemon?.length > 0) {
        setInitialPokemon(favPokemon)
      }
    }, [])

  const handleChange = (e) => {
    const newPokemon = e.target.value.toLowerCase()
    setPokemonInput(newPokemon)
 
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setInitialPokemon(pokemonInput)
    e.target.reset()
  }

  const nextPokemon = () => {
    pokemon.id += 1
    pokemonId()
  }


  const lastPokemon = () => {
    if(pokemon.id > 1) {
      pokemon.id -= 1
      pokemonId()
    }
  }

  const defaultPokemon = () => {
    setInitialPokemon(pokemon.name)
    localStorage.setItem('pokemon', pokemon.name);
  }

   const pokeball = () => {
    capturePokemon()
    setPokeballCount(pokeballCount + 1)
    setThrowPokeball(true)

    setTimeout(() => {
      if(randomValue === pokemon.captureValue) {
        const pokemonData = JSON.parse(localStorage.getItem('pokemonCaptured'))
        const newPokemonData = {id: pokemon.id, name: pokemon.name, image: pokemon.image}
        toast.success(`Capturaste a ${pokemon.name}!`, {theme: "dark"})

        if(pokemonData !== null) {
          localStorage.setItem('pokemonCaptured', JSON.stringify([...pokemonData, newPokemonData]))
        } else {
          localStorage.setItem('pokemonCaptured', JSON.stringify([newPokemonData]))
        }
      } else {
        toast.error(`${pokemon.name} escapó`, {theme: "dark"})
      }
      setThrowPokeball(false)
    }, 5000)
   }

  const capturePokemon = () => {
    const max = 5;
    const min = 1;
    const number = Math.floor(Math.random() * (max - min) + min);
    setRandomValue(number)
  }

  return (
    <div>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Pokedex game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container d-flex justify-content-center align-items-center flex-column position-relative">
        <div className={pokedex.logo}>
          <Image src="/pokemon_logo.png" alt="Logo" width={200} height={76}/>
        </div>
        <div className="container justify-content-center text-center d-flex position-relative">
          <div className={`${pokedex.pokedexContainer} container position-absolute`}>
            <Image src="/pokedex.png" alt="pokedex" width={425} height={647}/>
          {!error ? 
            <div className={`${pokedex.pokedexContainer, pokedex.pokemonContainer} container position-absolute`}>
              <div className={`${pokedex.pokemonNumber} d-flex align-items-center justify-content-end`}>
                <h1>#{pokemon.id}</h1>
              </div>
              <div className="d-flex justify-content-center">
                {pokemon.image && (<Image className={pokedex.pokemon} src={pokemon.image} alt={pokemon.name} width={100} height={82}/>)}
              </div>
              <div className={`${pokedex.pokeballs} container d-flex justify-content-end `}>
                <span className={pokedex.pokeballs}>
                  <div className={throwPokeball ? pokedex.pokeballAnim : "" }>
                  <Image src="/pokeball_default.png"  width={20} height={20} alt="pokeball" />
                  </div>
                  x{100 - pokeballCount}
                </span>
              </div>
              <div className={`${pokedex.pokemonName} d-flex justify-content-center`}>
                <span className={pokedex.name}>{pokemon.name}</span>
              </div>
              {favoritePokemon.map((pokemon, index) => {
              <div className='container d-flex position-absolute'> 
                <h1 key={index}>{pokemon.name}</h1>
              </div>
              })}
            </div> 
            : 
            null
            }
          <div className={`${pokedex.pokedexContainer, pokedex.formContainer} container position-absolute`}>
            <form onSubmit={handleSubmit}>
              <input type="search" className={pokedex.search} onChange={handleChange} placeholder="Buscar pokemon"/>
            </form>
            <Button onClick={defaultPokemon} variant="dark" className="m-1">Set a default</Button>
            <Button onClick={pokeball} {...pokeballCount >= 15 ? {disabled:true} : throwPokeball === true ? {disabled:true} : "" } variant="dark" className="m-1">Capture Pokemon</Button>
            <div className="container d-flex justify-content-center">
              <Button variant="dark" className="m-1"  onClick={lastPokemon}>Last</Button>
              <Button variant="dark" className="m-1" onClick={nextPokemon}>Next</Button>
              <Button href="/captured" variant="dark" className="m-1">My pokemons</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>  
  )
}
