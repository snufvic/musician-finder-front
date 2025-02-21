import Joi from "joi";
import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import musicianService from "../services/musicianService";
import Form from "./common/formBuilder/form";
import PageHeader from "./common/pageHeader";
import withRouter from "./common/withRouter";

class ConfirmCode extends Form {
  state = {
    form: {
      verificationCode: "",
      password: "",
    },
    email: "",
  };

  schema = {
    verificationCode: Joi.string().length(8).required(),
    password: Joi.string()
      .min(8)
      .max(255)
      .regex(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]{4,})(?=.*[-_^@$#!%*&])[A-Za-z0-9-_^@$#!%*&]{8,}/
      )
      .required()
      .messages({
        "string.pattern.base":
          "Must have one lowercase letter, one capital letter, at least 4 digits, and at least one of the *_-&^%$#@! signs",
      }),
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      email: localStorage.getItem("email"),
    });
  }

  async doSubmit() {
    const {
      email,
      form: { password, verificationCode },
    } = this.state;

    try {
      await musicianService.createNewEnctyptedPassword(
        email,
        verificationCode,
        password
      );
      toast.success(`Password reset successfully`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.removeItem("email");
      this.props.navigate("/signin");
    } catch ({ response }) {
      if (response && response.status === 400) {
        this.setState({ errors: { verificationCode: response.data } });
        toast.error(response.data, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Could not set the new password", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }

  render() {
    if (musicianService.getMusician()) {
      return <Navigate to="/" />;
    }
    return (
      <>
        <PageHeader Header="Reset your Password" />
        <div className="row text-center mb-3">
          <div className="col-12">
            <div>Enter your confirmation code and choose a new password</div>
          </div>
        </div>

        <form
          className="row"
          onSubmit={this.handleSubmit}
          noValidate
          autoComplete="off"
        >
          {this.renderInput({
            name: "verificationCode",
            label: "Verification Code",
            required: true,
          })}
          {this.renderInput({
            name: "password",
            label: "New Password",
            type: "password",
            required: true,
          })}

          <div className="my-2">
            {this.renderButton("Confirm new Password")}
          </div>
        </form>
      </>
    );
  }
}

export default withRouter(ConfirmCode);
