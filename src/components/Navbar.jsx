import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">Dynamically Pokémon Explorer</h1>
        <div>
          <Link to="/" className="mx-2">
            Home
          </Link>
          <Link to="/favorites" className="mx-2">
            Favorites
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
