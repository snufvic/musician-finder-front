import { Link } from "react-router-dom";
import React, { Component } from "react";
import config from "../../config.json";
import musicianService from "../../services/musicianService";

class Card extends Component {
  state = { btnValue: true };

  connectedMusician = musicianService.getMusician();

  btnValueCollapse() {
    this.setState({ ...this.state, btnValue: !this.state.btnValue });
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
        likedByConnected,
        timesLiked,
      },
      onCheckLikeAndUpdate,
      onRemove,
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
              <label className="mt-3 mx-2">{timesLiked}</label>
              <button
                type="button"
                className={
                  likedByConnected
                    ? "btn btn-sm btn-outline-dark btn-info mt-3 mx-2"
                    : "btn btn-sm btn-outline-dark btn-light mt-3 mx-2"
                }
                onClick={() => onCheckLikeAndUpdate(likedByConnected, id)}
              >
                {likedByConnected ? (
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
              {id === this.connectedMusician.id ? (
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
                </div>
              ) : null}
              {id === this.connectedMusician.id ||
              this.connectedMusician.access_level === 1 ? (
                <div>
                  <button
                    type="button"
                    onClick={() => onRemove(id)}
                    title="Delete"
                    className="btn btn-sm btn-outline-dark mt-3 btn-danger mx-2"
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
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
