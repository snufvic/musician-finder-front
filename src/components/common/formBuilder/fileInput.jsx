function FileInput({
  required = false,
  name,
  label,
  error,
  type,
  value,
  ...rest
}) {
  return (
    <div className="form-group col-sm-6 my-1">
      <label htmlFor={name}>
        {required && <span className="text-danger me-2">*</span>}
        {label}
      </label>
      <input
        {...rest}
        type={type}
        id={name}
        name={name}
        className="form-control"
      />
      {error && <span className="text-danger">{error}</span>}
    </div>
  );
}

export default FileInput;
