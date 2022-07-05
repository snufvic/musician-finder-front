import React, { Component } from "react";
import cardService from "../services/cardService";
import { toast } from "react-toastify";
import Card from "./card";
import PageHeader from "./common/pageHeader";
import config from "../config.json";
import { NavLink } from "react-router-dom";

class CardsList extends Component {
  state = {
    connectedMusician: "",
    cards: [],
  };

  async getUserAndUpdateState() {
    try {
      const musician = await cardService.getConnectedMusician();
      this.setState({
        connectedMusician: {
          ...this.state.form,
          email: musician.data.email,
          first_name: musician.data.first_name,
          last_name: musician.data.last_name,
          phone: musician.data.phone,
          profileImage: config.apiUrl + "/" + musician.data.profileImage,
          selected_districts: musician.data.districts,
          selected_instruments: musician.data.instruments,
          is_card: musician.data.is_card,
        },
      });
    } catch {
      toast.error("Failed to retrieve Musician Card from server", {
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

  async componentDidMount() {
    this.getUserAndUpdateState();
    // const profileImage = await cardService.getImage();
    // const { data } = await cardService.getCards();
    // if (data.length) {
    //   this.setState({
    //     cards: data,
    //   });
    // }
  }

  render() {
    const { cards, connectedMusician } = this.state;
    console.log(cards);
    return (
      <>
        <PageHeader Header="Welcome to the Musician Cards Page" />

        {connectedMusician.is_card === 1 ? (
          <div className="row justify-content-center">
            <h4 className="text-center mt-2">Your Card</h4>
            <Card card={connectedMusician} />
          </div>
        ) : (
          <p className="text-center">
            <span>
              <NavLink to="/card">Create a Musician Card</NavLink>
            </span>{" "}
            to display your Musician Card here!
          </p>
        )}

        <div className="container">
          {/* <PageHeader
          title={
            <>
              <i className="bi bi-person-badge"></i> My Cards Page
            </>
          }
        /> */}

          {/* <div className="row">
            <div className="col-12">
              <p>Your cards are listed below:</p>
            </div>
          </div> */}

          {/* <div className="row">
          <Link to="/create-card">Create a New Card</Link>
        </div> */}

          {/* <div className="row">
            {cards.length ? (
              cards.map((card) => <Card key={card.id} card={card} />)
            ) : (
              <p>No cards yet...</p>
            )}
          </div> */}
        </div>
      </>
    );
  }
}

export default CardsList;
