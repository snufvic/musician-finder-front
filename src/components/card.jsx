import { Link } from "react-router-dom";
import React, { Component } from "react";
import config from "../config.json";
import cardService from "../services/cardService";
import { toast } from "react-toastify";

class Card extends Component {
  state = { btnValue: true };

  async componentDidMount() {
    await this.getLikesAmountAndUpdateState(this.props.card.id);
  }

  async getLikesAmountAndUpdateState(cardId) {
    try {
      const likeAmount = await cardService.getLikesAmount(cardId);

      if (likeAmount.data.length) {
        for (let i = 0; i < likeAmount.data.length; i++) {
          if (likeAmount.data[i].m_id === this.props.connectedId) {
            this.setState({
              ...this.state,
              likedByConnected: true,
            });
            break;
          }
        }
        this.setState({
          ...this.state,
          timesLiked: likeAmount.data.length,
        });
        return;
      }
      this.setState({
        ...this.state,
        timesLiked: "",
        likedByConnected: false,
      });
    } catch {
      toast.error("Failed to retrieve Musician Cards Info from server", {
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

  btnValueCollapse() {
    this.setState({ ...this.state, btnValue: !this.state.btnValue });
  }

  async checkLikeAndUpdate() {
    if (this.state.likedByConnected) {
      // need to do unlike
      try {
        await cardService.removeLikeTable(this.props.card.id);
      } catch {
        toast.error("Failed to update amount of Likes", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      // need to do like
      try {
        await cardService.addLikeTable(this.props.card.id);
      } catch {
        toast.error("Failed to update amount of Likes", {
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
    this.setState({
      ...this.state,
      likedByConnected: !this.state.likedByConnected,
      // timesLiked: this.state.timesLiked + 1,
    });
    await this.getLikesAmountAndUpdateState(this.props.card.id);
  }

  render() {
    const {
      card: {
        id,
        first_name,
        email,
        last_name,
        age,
        phone,
        selected_districts,
        profileImage,
        selected_instruments,
      },
      connectedId,
    } = this.props;
    return (
      <div className="col-6 col-md-3 col-lg-4 mt-3">
        <div className="card">
          <img
            src={config.apiUrl + "/" + profileImage}
            alt={first_name + " " + last_name}
          />
          <div className="card-body">
            <p className="card-title">
              <b> First Name:</b> {first_name}
            </p>
            <p className="card-title">
              <b>Last Name:</b> {last_name}
            </p>
            <div className="d-flex border-top mb-2">
              <label className="mt-3 mx-2">{this.state.timesLiked}</label>
              <button
                type="button"
                className={
                  this.state.likedByConnected
                    ? "btn btn-sm btn-outline-dark btn-info mt-3 mx-2"
                    : "btn btn-sm btn-outline-dark btn-light mt-3 mx-2"
                }
                onClick={() => this.checkLikeAndUpdate()}
              >
                {this.state.likedByConnected ? (
                  <>
                    <i className="bi bi-bookmark-star-fill"></i>
                  </>
                ) : (
                  <>
                    <i className="bi bi-bookmark-star"></i>
                  </>
                )}
              </button>
              <button
                type="button"
                data-bs-placement="top"
                className="btn btn-outline-secondary btn-sm mt-3 mx-3 ms-auto"
                data-bs-toggle="collapse"
                data-bs-target={"#" + first_name + id}
                title={this.state.btnValue ? "Expand Info" : "Collapse Info"}
                onClick={() => this.btnValueCollapse()}
              >
                {this.state.btnValue ? (
                  <>
                    <i className="bi bi-chevron-double-down"></i>
                  </>
                ) : (
                  <>
                    <i className="bi bi-chevron-double-up"></i>
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="card-body collapse" id={first_name + id}>
            <p className="card-text border-top">
              <b>Age: </b> {age}
            </p>
            <p className="card-text border-top">
              <b>Email: </b> <a href={`mailto:${email}`}>{email}</a>
            </p>
            <p className="card-text border-top">
              <b>Tel: </b> <a href={`tel:${phone}`}>{phone}</a>
            </p>
            <div className="card-text border-top">
              <b>Plays following instruments: </b> <br />
              {
                <ul>
                  {selected_instruments.map((instrument) => (
                    <li key={instrument.id}>{instrument.name}</li>
                  ))}
                </ul>
              }
            </div>
            <div className="card-text border-top">
              <b>Available at: </b> <br />
              {
                <ul>
                  {selected_districts.map((district) => (
                    <li key={district.id}>{district.name}</li>
                  ))}
                </ul>
              }
            </div>
            <div className="d-flex justify-content-end border-top mb-2">
              {/* <button
                type="button"
                className="btn btn-sm btn-outline-dark mt-3 btn-info mx-2"
              >
                <i className="bi bi-star"></i>
              </button> */}
              {id === connectedId ? (
                <div>
                  <Link to="/card">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-dark mt-3 btn-warning mx-2"
                      title="Edit"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                  </Link>
                  <Link to="/card">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-dark mt-3 btn-danger mx-2"
                    >
                      <i className="bi bi-trash3"></i>
                    </button>
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
