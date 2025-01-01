import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import axios from "axios";

function PokemonDetails() {
  const { name } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => setDetails(response.data))
      .catch((error) => console.error(error));
  }, [name]);

  if (!details) {
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    );
  }

  return (
    <Container>
      <Card className="text-center">
        <Card.Img
          variant="top"
          src={details.sprites.front_default}
          alt={details.name}
          className="w-50 mx-auto"
        />
        <Card.Body>
          <Card.Title className="text-capitalize">{details.name}</Card.Title>
          <Card.Text>
            <strong>Abilities:</strong>{" "}
            {details.abilities
              .map((ability) => ability.ability.name)
              .join(", ")}
          </Card.Text>
          <Card.Text>
            <strong>Types:</strong>{" "}
            {details.types.map((type) => type.type.name).join(", ")}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PokemonDetails;
