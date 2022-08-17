import { useRouter } from "next/router";
import axios from "axios"
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Image from 'next/image'
import Link from 'next/link' 

function Pokemon () {
  const [myPokemon, setMyPokemon] = useState({})
  const [pokeImg, setPokeImg] = useState()
  console.log(pokeImg)
  const router = useRouter();
  const pokemonId = Number(router.query.id)
  const pokemonInfo = async () => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    setMyPokemon(response.data)
    setPokeImg(response.data.sprites.versions['generation-v']['black-white'].animated.front_default)
    }

useEffect(()=>{
    if(!router.isReady) return;
    pokemonInfo()
}, [router.isReady]);

  return (
    <>
    {!myPokemon ? "cargando..." :  
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{myPokemon.name}</Card.Title>
          <Image src={pokeImg} width={50} height={50} alt={myPokemon.name}/>
          <Card.Subtitle className="mb-2 text-muted">{myPokemon.name}</Card.Subtitle>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the cards content.
          </Card.Text>
          <Link href="/captured">Volver</Link>
          <Link href="/">Capturar otro</Link>
        </Card.Body>
      </Card>
    }
      
    </>
  )
}

export default Pokemon