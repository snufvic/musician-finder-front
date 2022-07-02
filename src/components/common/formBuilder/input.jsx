function Input({ required = false, name, label, error, ...rest }) {
  return (
    <div className="form-group col-sm-6 my-1">
      <label htmlFor={name}>
        {required && <span className="text-danger me-2">*</span>}
        {label}
      </label>
      <input {...rest} id={name} name={name} className="form-control" />
      {error && (
        <span className="text-danger">{error?.replace(name, label)}</span>
      )}
    </div>
  );
}

export default Input;
