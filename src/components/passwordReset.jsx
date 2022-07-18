import Form from "./common/formBuilder/form";
import PageHeader from "./common/pageHeader";
import Joi from "joi";
import musicianService from "../services/musicianService";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import withRouter from "./common/withRouter";

class PasswordReset extends Form {
  state = {
    form: {
      email: "",
    },
  };

  schema = {
    email: Joi.string()
      .min(5)
      .max(50)
      .email({ tlds: { allow: false } })
      .required(),
  };

  async doSubmit() {
    const { email } = this.state.form;

    try {
      await musicianService.resetPassword({ email: email });
      toast.success(
        `Password reset successfully. 
        Check your mail box for a verification email`,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      localStorage.setItem("email", email);
      this.props.navigate("/confirm_code");
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
      } else {
        toast.error("Failed sending new password", {
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
            <div>Enter your mail to reset password</div>
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

          <div className="my-2">{this.renderButton("Reset")}</div>
        </form>
      </>
    );
  }
}

export default withRouter(PasswordReset);
