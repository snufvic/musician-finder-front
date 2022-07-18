import React, { Component } from "react";

class AddInput extends Component {
  state = { formInput: "", error: "" };

  handleFormInputChange = (e) => {
    this.setState({ error: "", formInput: e.target.value });
  };

  handleSubmit = () => {
    const { formInput } = this.state;

    const {
      onSubmit = () => {},
      validation = (input) => {
        return input < 2 ? "must enter at least two characters" : "";
      },
      tableName,
    } = this.props;

    const error = validation(formInput);

    if (error) {
      this.setState({ error });
      return;
    }

    onSubmit(formInput, tableName);
    this.setState({ formInput: "" });
  };

  render() {
    const { preMessage, submitButtonText } = this.props;
    const { error, formInput } = this.state;

    return (
      <>
        <hr />
        <div className="col-7">
          <div className="input-group mb-3">
            {preMessage ? (
              <span className="input-group-text" id="basic-addon3">
                {preMessage}
              </span>
            ) : null}
            <input
              type="text"
              className={["form-control", error ? "is-invalid" : null].join(
                " "
              )}
              onInput={this.handleFormInputChange}
              value={formInput}
            />
            <button
              onClick={this.handleSubmit}
              className="btn btn-outline-success"
              type="button"
            >
              {submitButtonText ? submitButtonText : "submit"}
            </button>
            <div className="invalid-feedback">{error}</div>
          </div>
        </div>
      </>
    );
  }
}

export default AddInput;
