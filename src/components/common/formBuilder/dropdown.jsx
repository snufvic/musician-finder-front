function Dropdown({
  required = false,
  name,
  arraySelection,
  handleAddState,
  firstOption,
  stateKey,
}) {
  return (
    <>
      <div className="input-group my-3">
        <label className="input-group-text" htmlFor="inputGroupSelect01">
          {required && <span className="text-danger me-2">*</span>}
          Choose your {name}
        </label>
        <select
          value="hello"
          className="form-select"
          id="inputGroupSelect01"
          onChange={(e) => {
            handleAddState(
              e.target.value,
              e.target[e.target.selectedIndex].id,
              stateKey
            );
          }}
        >
          <option value="">{firstOption}</option>
          {arraySelection.map((item) => {
            return (
              <option key={item.id} id={item.id} value={item.name}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
}

export default Dropdown;
