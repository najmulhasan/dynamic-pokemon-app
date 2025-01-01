import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function FavoritesPage() {
  // Fetch favorites from localStorage
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length === 0) {
    return (
      <Container>
        <h1 className="text-center my-4">Favorites</h1>
        <p className="text-center">No Pokémon added to favorites yet.</p>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="text-center my-4">Favorites</h1>
      <Row>
        {favorites.map((pokemon) => {
          // Check if required properties are defined
          if (!pokemon || !pokemon.sprites || !pokemon.sprites.front_default) {
            return null; // Skip invalid Pokémon objects
          }

          return (
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
                  <div className="d-flex justify-content-center">
                    <Link to={`/pokemon/${pokemon.name}`}>
                      <Button variant="primary">View Details</Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default FavoritesPage;
