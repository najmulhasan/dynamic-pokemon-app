function SearchBar({ setSearchTerm }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search Pokémon"
        className="w-full px-5 border rounded"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
