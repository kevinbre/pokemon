import { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { Card, Container, Button, Row, Col, Text } from "react-bootstrap";

function PokemonInfo() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const pokemonData = JSON.parse(localStorage.getItem("pokemonCaptured"));
    setPokemonList(pokemonData);
  }, []);

  return (
    <>
      <Head>
        <title className="text-capitalize">My pokemons</title>
        <meta name="description" content="Pokemon captured" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Card.Text
          className="d-flex justify-content-center mt-5"
          style={{ fontWeight: 800, fontSize: 26, color: "#8a78e8" }}
        >
          {" "}
          My pokemons{" "}
        </Card.Text>
        <Row>
          {pokemonList?.map((pokemon, i) => (
            <Col key={i} md={3} className="d-flex justify-content-center mt-4">
              <Card style={{ width: "12rem", height: "13rem", border: "none" }}>
                <Card.Body className="d-flex flex-column align-items-center bg-dark rounded">
                  <Card.Title className="text-light pb-3 text-capitalize">
                    {pokemon.name}
                  </Card.Title>
                  <Image
                    src={pokemon.image}
                    alt={pokemon.name}
                    width={60}
                    height={60}
                  />
                  <Button
                    href={`/pokemon/${pokemon.id}`}
                    variant="light"
                    className="mt-4"
                  >
                    Pokemon info
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Container className="d-flex justify-content-center mt-5 mb-5">
        <Button href="/" variant="dark">
          {" "}
          Home{" "}
        </Button>
      </Container>
    </>
  );
}

export default PokemonInfo;
