import Form from "./common/formBuilder/form";
import PageHeader from "./common/pageHeader";
import Joi from "joi";
import musicianService from "../services/musicianService";
import withRouter from "./common/withRouter";
import { toast } from "react-toastify";
import config from "../config.json";

class UpdateCard extends Form {
  state = {
    form: {
      email: "",
      first_name: "",
      last_name: "",
      age: "",
      phone: "",
      is_card: "",
      profileImage: {},
      selected_districts: [],
      selected_instruments: [],
    },
    districts: [],
    instruments: [],
  };

  schema = {
    age: Joi.string().min(1).max(3).required(),
    email: Joi.string()
      .min(5)
      .max(50)
      .email({ tlds: { allow: false } }),
    first_name: Joi.string().min(2).max(20).required(),
    is_card: Joi.number().min(0).max(1).required(),
    last_name: Joi.string().min(2).max(20).required(),
    phone: Joi.string()
      .min(9)
      .max(10)
      .regex(/^0(\d{1,2}).*(\d{7})$/)
      .required(),
    profileImage: Joi.object()
      // .keys({})
      .label("Image")
      .allow(""),
    selected_districts: Joi.array().required(),
    selected_instruments: Joi.array().required(),
  };

  async getUserAndUpdateInputs() {
    try {
      const musician = await musicianService.getConnectedMusician();
      this.setState({
        form: {
          ...this.state.form,
          email: musician.data.email,
          first_name: musician.data.first_name,
          last_name: musician.data.last_name,
          phone: musician.data.phone,
          age: musician.data.age,
          profileImage: "",
          selected_districts: musician.data.districts,
          selected_instruments: musician.data.instruments,
          is_card: musician.data.is_card,
        },
      });
    } catch ({ response }) {
      if (response && response.status === 400) {
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
        this.setState({
          errors: {
            first_name: "System Error. Failed to retrieve account info",
          },
        });
      }
    }
  }

  async getDistrictsAndUpdateState() {
    try {
      const districts = await musicianService.getAllDistricts();

      this.setState({
        districts: districts.data,
      });
    } catch ({ response }) {
      if (response && response.status === 400) {
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
        this.setState({
          errors: { first_name: "System Error. Failed to connect to server" },
        });
      }
    }
  }

  async getInstrumentsAndUpdateState() {
    try {
      const instruments = await musicianService.getAllInstruments();

      this.setState({
        instruments: instruments.data,
      });
    } catch ({ response }) {
      if (response && response.status === 400) {
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
        this.setState({
          errors: { first_name: "System Error. Failed to connect to server" },
        });
      }
    }
  }

  async componentDidMount() {
    await this.getUserAndUpdateInputs();
    await this.getDistrictsAndUpdateState();
    await this.getInstrumentsAndUpdateState();
  }

  async doSubmit() {
    const {
      form: {
        selected_districts,
        selected_instruments,
        profileImage,
        email,
        is_card,
        ...body
      },
    } = this.state;

    if (!selected_districts.length || !selected_instruments.length) {
      toast.error(
        "Please choose At Least one district and instument to submit",
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
      return;
    }

    if (profileImage) {
      const maxSize = config.imageMaxSize;

      if (profileImage.size > maxSize) {
        this.setState({
          errors: {
            profileImage: `File size exceeds max limit of ${
              maxSize / 1000000
            }MB`,
          },
        });

        toast.error(
          `File size exceeds max limit of ${maxSize / 1000000}MB.
        Choose a smaller file`,
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
        return;
      }

      const formData = new FormData();

      // Update the formData object
      formData.append("myFile", profileImage);

      try {
        await musicianService.uploadImage(formData);
      } catch ({ response }) {
        if (response && response.status === 400) {
          this.setState({ errors: { first_name: response.data } });
        } else {
          this.setState({
            errors: {
              first_name: "failed to comunicate with server. Please try again",
            },
          });
        }
      }
    }

    const arranged_districts = selected_districts.map((a) => {
      return { ...a };
    });
    const arranged_instruments = selected_instruments.map((a) => {
      return { ...a };
    });

    try {
      const musician = await musicianService.getMusician();
      body.id = musician.id.toString();

      this.arrangeIdsToUpdateTable(body.id, arranged_districts);
      this.arrangeIdsToUpdateTable(body.id, arranged_instruments);

      await musicianService.updateMusician(body);

      await musicianService.updateItemsInTable(arranged_districts, "district");
      await musicianService.updateItemsInTable(
        arranged_instruments,
        "instrument"
      );
      toast.success("Successfully created Musician Card", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      this.props.navigate("/cards_list");
    } catch ({ response }) {
      if (response && response.status === 400) {
        this.setState({ errors: { first_name: response.data } });
      } else {
        this.setState({
          errors: {
            first_name: "failed to comunicate with server. Please try again",
          },
        });
      }
    }
  }

  arrangeIdsToUpdateTable(userId, itemIds) {
    for (const item of itemIds) {
      delete item.name;
      item.m_id = userId;
    }
    return itemIds;
  }

  handleAddState = (name, id, stateKey) => {
    id = Number(id);
    if (id === "") {
      return;
    }

    let flag = false;
    for (let i = 0; i < this.state.form[stateKey].length; i++) {
      if (this.state.form[stateKey][i].id === id) {
        flag = true;
      }
    }

    if (!flag) {
      this.setState({
        ...this.state,
        form: {
          ...this.state.form,
          [stateKey]: [...this.state.form[stateKey], { name: name, id: id }],
        },
      });
    }
  };

  removeState = (id, stateKey) => {
    let tempState = [];
    let index = 0;
    for (let i = 0; i < this.state.form[stateKey].length; i++) {
      if (this.state.form[stateKey][i].id === id) {
        continue;
      }
      tempState[index] = this.state.form[stateKey][i];
      index++;
    }

    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [stateKey]: tempState,
      },
    });
  };

  render() {
    const { email, selected_districts, selected_instruments, is_card } =
      this.state.form;
    return (
      <>
        <PageHeader
          Header={is_card ? "Update Musician Card" : "Create Musician Card"}
        />
        <div className="row text-center">
          <div className="col-12">
            <p>
              {is_card
                ? "Update a Musician card for account "
                : "Create a Musician card for account "}
              - {email}
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
            name: "first_name",
            label: "First Name",
            required: true,
          })}
          {this.renderInput({
            name: "last_name",
            label: "Last Name",
            required: true,
          })}
          {this.renderInput({
            name: "phone",
            label: "Phone Number",
            type: "number",
            required: true,
          })}
          {this.renderInput({
            name: "age",
            label: "Age",
            type: "number",
            required: true,
          })}
          {this.renderFileInput({
            name: "profileImage",
            label: "Profile Image",
            accept: "image/png, image/gif, image/jpeg",
          })}

          {this.renderDropdown({
            name: "districts",
            required: true,
            stateKey: "selected_districts",
            arraySelection: this.state.districts,
            handleAddState: this.handleAddState,
            firstOption: "Choose at least one district:",
          })}
          {this.renderCheckedItems(selected_districts, "selected_districts")}
          {this.renderDropdown({
            required: true,
            name: "instruments",
            stateKey: "selected_instruments",
            arraySelection: this.state.instruments,
            handleAddState: this.handleAddState,
            firstOption: "Choose at least one instrument:",
          })}
          {this.renderCheckedItems(
            selected_instruments,
            "selected_instruments"
          )}
          <div className="my-2">
            {this.renderButton(is_card ? "Update" : "Create")}
          </div>
        </form>
      </>
    );
  }
}

export default withRouter(UpdateCard);
