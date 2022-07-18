import Form from "./common/formBuilder/form";
import PageHeader from "./common/pageHeader";
import Joi from "joi";
import musicianService from "../services/musicianService";
import { toast } from "react-toastify";
import withRouter from "./common/withRouter";
import { Navigate, NavLink } from "react-router-dom";

class Signup extends Form {
  state = {
    form: {
      email: "",
      first_name: "",
      last_name: "",
      phone: "",
      password: "",
    },
  };

  schema = {
    email: Joi.string()
      .min(5)
      .max(50)
      .email({ tlds: { allow: false } })
      .required(),
    phone: Joi.string()
      .allow("")
      .min(9)
      .max(10)
      .regex(/^0(\d{1,2}).*(\d{7})$/)
      .optional(),
    password: Joi.string()
      .min(8)
      .max(255)
      .regex(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]{4,})(?=.*[-_^@$#!%*&])[A-Za-z0-9-_^@$#!%*&]{8,}/
      )
      .required()
      .messages({
        "string.pattern.base":
          "Must have one lowercase letter, one capital letter, at least 4 digits, and at least one of the -_^#@$!%*& signs",
      }),

    first_name: Joi.string().min(2).max(20).allow("").optional(),
    last_name: Joi.string().min(2).max(20).allow("").optional(),
  };

  async doSubmit() {
    const { form } = this.state;
    this.removeEmptyKeys(form);

    try {
      await musicianService.createMusician(form);
      toast.success("Registered Successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      this.props.navigate("/signin");
    } catch ({ response }) {
      if (response && response.status === 400) {
        this.setState({ errors: { email: response.data } });
        toast.error(response.data, {
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
        <PageHeader Header="Sign Up" />
        <div className="row text-center">
          <div className="col-12">
            <p>Create a free account</p>
          </div>
        </div>
        <form
          className="row"
          onSubmit={this.handleSubmit}
          noValidate
          autoComplete="off"
        >
          {this.renderInput({
            name: "first_name",
            label: "First Name",
          })}
          {this.renderInput({
            name: "last_name",
            label: "Last Name",
          })}
          {this.renderInput({
            name: "email",
            label: "Email",
            type: "email",
            required: true,
          })}
          {this.renderInput({
            name: "phone",
            label: "Phone Number",
            type: "number",
          })}
          {this.renderInput({
            name: "password",
            label: "Password",
            type: "password",
            required: true,
          })}

          <div className="my-2">{this.renderButton("Sign Up")}</div>
        </form>

        <div className="row text-center">
          <div className="col-12">
            <p>
              Already have an account?{" "}
              <span>
                <NavLink to="/signin">Sign In</NavLink>
              </span>
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Signup);
