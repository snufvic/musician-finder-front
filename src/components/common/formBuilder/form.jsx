import React, { Component } from "react";
import Input from "./input";
import Joi from "joi";
import Dropdown from "./dropdown";
import FileInput from "./fileInput";
import config from "../../../config.json";

class Form extends Component {
  state = {};

  removeEmptyKeys(obj) {
    for (const key in obj) {
      if (obj[key] === "") {
        delete obj[key];
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validateForm();

    this.setState({
      errors,
    });
    if (errors) {
      return;
    }
    this.doSubmit();
  };

  validateInput(name, value) {
    const data = { [name]: value };
    const schema = Joi.object({ [name]: this.schema[name] });

    const { error } = schema.validate(data);
    return error ? error.details[0].message : null;
  }

  validateImage(name, value, size) {
    const maxSize = config.imageMaxSize;

    if (size > maxSize) {
      return `File size exceeds max limit of ${maxSize / 1000000}MB`;
    }
    return null;
  }

  validateForm() {
    const {
      schema,
      state: { form },
    } = this;
    // console.log(form);
    const { error } = Joi.object({ ...schema }).validate(form, {
      abortEarly: false,
    });
    if (!error) {
      return null;
    }

    const errors = {};
    for (const detail of error.details) {
      errors[detail.path[0]] = detail.message;
    }
    return errors;
  }

  handleChange = async ({ target: { value, name } }) => {
    const { form, errors } = this.state;
    await this.setState({
      form: {
        ...form,
        [name]: value,
      },
      errors: {
        ...errors,
        [name]: this.validateInput(name, value),
      },
    });
  };

  handleImage = async ({ target: { files, value, name } }) => {
    console.dir(files[0]);
    const error = this.validateImage(name, value, files[0].size);

    const { form, errors } = this.state;
    await this.setState({
      form: {
        ...form,
        [name]: files[0],
      },
      errors: {
        ...errors,
        [name]: error ? error : null,
      },
    });
  };

  renderInput({ name, label, type = "text", required }) {
    const { form, errors } = this.state;

    return (
      <Input
        label={label}
        name={name}
        type={type}
        required={required}
        value={form?.[name] || ""}
        onChange={this.handleChange}
        error={errors?.[name]}
      />
    );
  }

  renderFileInput({ name, label, type = "file", required, accept }) {
    const { errors } = this.state;

    return (
      <FileInput
        label={label}
        name={name}
        type={type}
        required={required}
        onChange={this.handleImage}
        error={errors?.[name]}
        accept={accept}
      />
    );
  }

  renderDropdown({
    name,
    stateKey,
    arraySelection,
    handleAddState,
    firstOption,
    required,
  }) {
    return (
      <Dropdown
        name={name}
        arraySelection={arraySelection}
        handleAddState={handleAddState}
        firstOption={firstOption}
        stateKey={stateKey}
        required={required}
      />
    );
  }

  renderCheckedItems(selectedItems, stateKey) {
    if (!selectedItems.length) {
      return (
        <div className="mb-2 text-danger">Must choose AT LEAST one item</div>
      );
    }

    return (
      <div className="d-flex flex-wrap mb-2">
        {selectedItems.map((selectedItem) => {
          return (
            <div key={selectedItem.id} className="p-1 border me-2 mb-2">
              {selectedItem.name}
              <button
                type="button"
                className="btn btn-danger btn-sm m-2"
                onClick={() => {
                  this.removeState(selectedItem.id, stateKey);
                }}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          );
        })}
      </div>
    );
  }

  renderButton(label) {
    return (
      <button
        type="submit"
        disabled={this.validateForm()}
        className="btn btn-info"
      >
        {label}
      </button>
    );
  }
}

export default Form;
