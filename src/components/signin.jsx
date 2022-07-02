import Form from "./common/formBuilder/form";
import PageHeader from "./common/pageHeader";
import Joi from "joi";
import musicianService from "../services/musicianService";
import withRouter from "./common/withRouter";
import { Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

class Signin extends Form {
  state = {
    form: {
      email: "",
      password: "",
    },
  };

  schema = {
    email: Joi.string()
      .min(5)
      .max(50)
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(6).required(),
  };

  async doSubmit() {
    const { email, password } = this.state.form;
    try {
      await musicianService.login(email, password);
      window.location = "/";
    } catch ({ response }) {
      if (response && response.status === 400) {
        this.setState({ errors: { email: response.data } });
      }
    }
  }

  render() {
    if (musicianService.getMusician()) {
      return <Navigate to="/" />;
    }

    return (
      <>
        <PageHeader Header="Sign In" />
        <div className="row text-center mb-3">
          <div className="col-12">
            <div>Sign In to your account</div>
            <p>
              Not Registred?{" "}
              <span>
                <NavLink to="/signup">Register here</NavLink>
              </span>
            </p>
          </div>
        </div>
        <form
          className="row"
          onSubmit={this.handleSubmit}
          noValidate
          autoComplete="off"
        >
          {this.renderInput({
            name: "email",
            label: "Email",
            type: "email",
            required: true,
          })}
          {this.renderInput({
            name: "password",
            label: "Password",
            type: "password",
            required: true,
          })}

          <div className="my-2">{this.renderButton("Sign In")}</div>

          {/* <NavLink className="nav-link" to="/"></NavLink> */}
        </form>

        <div className="row text-center">
          <div className="col-12">
            <p>
              Forgot your password?{" "}
              <span>
                <NavLink to="/reset_password">Click here</NavLink>
              </span>
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Signin);
