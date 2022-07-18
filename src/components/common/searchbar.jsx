function Searchbar({ title, placeholder, handleChange }) {
  return (
    <>
      <div className="row text-center">
        <h2>{title}</h2>
        <p>{placeholder}</p>
      </div>
      <div className="row justify-content-center">
        <input
          style={{ width: "40%" }}
          type="search"
          placeholder="Type to search Cards"
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default Searchbar;
