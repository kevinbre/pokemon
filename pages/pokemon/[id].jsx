import { useRouter } from "next/router";
import axios from "axios"
import { useEffect, useState } from "react";
import { Card, Col, Button, Row } from "react-bootstrap";
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
      <Card>
        <Card.Body>
          <Card.Title>{myPokemon.name}</Card.Title>
          <Row>
            <Image src={pokeImg} width={50} height={50} alt={myPokemon.name}/>
            {}
          </Row>
          <Link href="/captured">Volver</Link>
          <Link href="/">Capturar otro</Link>
        </Card.Body>
      </Card>
    }
      
  
     
      <Col md={3} className="d-flex justify-content-center">
        <Card style={{ width: '12rem', height: '13rem', border: 'none' }}>
        <Card.Body className="d-flex flex-column align-items-center bg-dark rounded">
          <Card.Title className="text-light pb-3"></Card.Title>
          <Button variant="light" className="mt-4">
              Pokemon info 
          </Button>
        </Card.Body>
       
      </Card>
      </Col>
   
     

      
    </>
  )
}

export default Pokemon