import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import {
  Card,
  Col,
  Button,
  Row,
  ProgressBar,
  Container,
} from "react-bootstrap";
import Image from "next/image";
// import pokemonType from "../mockup";

function Pokemon() {
  const [myPokemon, setMyPokemon] = useState({});
  const [typeImage, setTypeImage] = useState();

  const router = useRouter();
  const pokemonId = Number(router.query.id);

  const pokemonInfo = async () => {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );
    setMyPokemon({
      data: response.data,
      name: response.data.name,
      image:
        response.data.sprites.versions["generation-v"]["black-white"].animated
          .front_default,
      type: response.data.types[0].type.name,
      weight: response.data.weight,
      stats: response.data.stats,
    });
  };

  // const images = useCallback(() => {
  //   const pokeType = myPokemon.type;
  //   {
  //     pokemonType
  //       .filter((pokemon) => pokemon.type === pokeType)
  //       .map((filteredPokemon) => setTypeImage(filteredPokemon.image));
  //   }
  // }, [myPokemon.type]);

  useEffect(() => {
    pokemonInfo();
    if (!router.isReady) return;
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  // useEffect(() => {
  //   images();
  // }, [images]);

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", maxHeight: "100%" }}
    >
      {!myPokemon ? (
        "cargando..."
      ) : (
        <Card
          className="d-flex flex-column align-items-center rounded"
          style={{
            width: "100%",
            padding: 20,
            maxWidth: 700,
            background: "rgba(0, 0, 0, 0.7)",
          }}
        >
          <Card.Body className="text-light text-capitalize d-flex flex-column align-items-center">
            <Card.Title className="text-uppercase">{myPokemon.name}</Card.Title>
            <Row className="d-flex justify-content-center mt-4">
              <Image
                src={myPokemon.image}
                width={100}
                height={100}
                alt={myPokemon.name}
              />
              <Row className="d-flex text-center mt-4">
                <Card.Title style={{ fontSize: 24, fontWeight: 700 }}>
                  Tipo
                </Card.Title>
                <Col className="d-flex justify-content-center">
                  {myPokemon.type}
                  {/* <Image
                    src={typeImage}
                    width={25}
                    height={25}
                    alt={myPokemon.type}
                  /> */}
                </Col>
              </Row>
              <Row className="d-flex justify-content-center flex-column">
                <Col
                  className="text-center"
                  style={{ fontSize: 24, fontWeight: 700 }}
                >
                  Peso
                </Col>
                <Col className="text-center">{myPokemon.weight}</Col>
              </Row>

              <Card.Title
                className="text-center"
                style={{ fontSize: 24, fontWeight: 700 }}
              >
                STATS
                {myPokemon.stats?.map((base, i) => (
                  <Row key={i}>
                    {" "}
                    <ProgressBar
                      className="p-0 mt-4 text-center"
                      animated
                      variant="danger"
                      now={base.base_stat}
                      label={base.stat.name + " " + base.base_stat + ""}
                      key={1}
                    />
                  </Row>
                ))}
              </Card.Title>
            </Row>
            <Row className="d-flex justify-content-center">
              <Button href="/captured" variant="light" className="mt-2">
                Volver
              </Button>
              <Button href="/" variant="light" className="mt-2">
                Capturar otro
              </Button>
            </Row>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default Pokemon;
