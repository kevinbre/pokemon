import { useEffect, useState } from "react"
import Image from 'next/image'
import { Card, Container, Button, Row, Col} from "react-bootstrap";


function PokemonInfo() { 
  const [pokemonList, setPokemonList] = useState ([])

  useEffect(() => {
    const pokemonData = JSON.parse(localStorage.getItem('pokemonCaptured'))
    setPokemonList(pokemonData)
  }, [])

  return (
    <>
    <Container>
    <h1> Mis pokemon </h1>
      <Row>
      {pokemonList.map((pokemon, i) =>
      <Col key={i} md={3} className="d-flex justify-content-center">
        <Card style={{ width: '12rem', height: '13rem', border: 'none' }}>
        <Card.Body className="d-flex flex-column align-items-center bg-dark rounded">
          <Card.Title className="text-light pb-3">{pokemon.name}</Card.Title>
          <Image src={pokemon.image} alt={pokemon.name} width={60} height={60} />
          <Button href={`/pokemon/${pokemon.id}`} variant="light" className="mt-4">
              Pokemon info 
          </Button>
        </Card.Body>
       
      </Card>
      </Col>
    )}
      </Row>
    </Container>
    <Container className="d-flex justify-content-center mt-5">
      <Button href="/" variant="dark"> Capturar Pokemon </Button>
    </Container>
   </>
  )
}

export default PokemonInfo