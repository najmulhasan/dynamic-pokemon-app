import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function PokemonCard({ pokemon }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    // Fetch detailed Pokémon data
    axios
      .get(pokemon.url)
      .then((response) => setDetails(response.data))
      .catch((error) => console.error(error));
  }, [pokemon.url]);

  if (!details) {
    return (
      <div className="bg-white border rounded shadow p-4 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded shadow p-4 text-center">
      <img
        src={details.sprites.front_default}
        alt={details.name}
        className="w-24 h-24 mx-auto mb-2"
      />
      <h3 className="text-lg font-bold capitalize">{details.name}</h3>
      <div className="flex justify-between items-center mt-4">
        <Link
          to={`/pokemon/${details.name}`}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          View Details
        </Link>
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded"
          onClick={() => {
            const existingFavorites =
              JSON.parse(localStorage.getItem("favorites")) || [];
            if (!existingFavorites.find((fav) => fav.name === details.name)) {
              localStorage.setItem(
                "favorites",
                JSON.stringify([...existingFavorites, details])
              );
            }
          }}
        >
          Favorite
        </button>
      </div>
    </div>
  );
}

export default PokemonCard;
