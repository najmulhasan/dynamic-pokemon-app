import { useState, useEffect } from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";

function HomePage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=50"
      );
      const data = await response.json();
      const detailedPokemon = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return res.json();
        })
      );
      setPokemonList(detailedPokemon);
    };

    fetchPokemon();
  }, []);

  const handleFavorite = (pokemon) => {
    const existingFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    const isAlreadyFavorited = existingFavorites.some(
      (fav) => fav.name === pokemon.name
    );

    if (!isAlreadyFavorited) {
      const updatedFavorites = [...existingFavorites, pokemon];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      alert(`${pokemon.name} added to favorites.`);
    } else {
      alert(`${pokemon.name} is already in favorites.`);
    }
  };

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <h1 className="text-center my-4">Pokémon Explorer</h1>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mb-4"
      />
      <Row>
        {filteredPokemon.map((pokemon) => (
          <Col key={pokemon.name} md={4} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
              />
              <Card.Body>
                <Card.Title className="text-center text-capitalize">
                  {pokemon.name}
                </Card.Title>
                <div className="d-flex justify-content-around">
                  <Button
                    variant="primary"
                    onClick={() => handleFavorite(pokemon)}
                  >
                    Favorite
                  </Button>
                  <Button
                    variant="secondary"
                    as="a"
                    href={`/pokemon/${pokemon.name}`}
                  >
                    View Details
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default HomePage;
