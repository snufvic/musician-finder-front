import React, { Component } from "react";
import cardService from "../services/cardService";
import { toast } from "react-toastify";
import Card from "./card";
import PageHeader from "./common/pageHeader";
import { NavLink } from "react-router-dom";

class CardsList extends Component {
  state = {
    connectedMusician: "",
    cards: [],
  };

  async getConnectedMusicianAndUpdateState() {
    try {
      const musician = await cardService.getConnectedMusician();
      this.setState({
        connectedMusician: {
          ...this.state.form,
          email: musician.data.email,
          first_name: musician.data.first_name,
          last_name: musician.data.last_name,
          age: musician.data.age,
          phone: musician.data.phone,
          profileImage: musician.data.profileImage,
          selected_districts: musician.data.districts,
          selected_instruments: musician.data.instruments,
          is_card: musician.data.is_card,
          id: musician.data.id,
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

  async getRestMusiciansAndUpdateState() {
    try {
      const { data } = await cardService.getRestOfCards();
      if (data.length) {
        this.setState({ ...this.state, cards: data });
      }
    } catch {
      toast.error("Failed to retrieve Musician Cards from server", {
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
    this.getConnectedMusicianAndUpdateState();
    this.getRestMusiciansAndUpdateState();
  }

  render() {
    const { cards, connectedMusician } = this.state;

    return (
      <>
        <PageHeader Header="Welcome to the Musician Cards Page" />
        <hr />
        {connectedMusician.is_card === 1 ? (
          <div className="row justify-content-center">
            <h4 className="text-center mt-2">Your Card</h4>
            <Card card={connectedMusician} connectedId={connectedMusician.id} />
          </div>
        ) : (
          <p className="text-center">
            <span>
              <NavLink to="/card">Create a Musician Card</NavLink>
            </span>{" "}
            to display your Musician Card here!
          </p>
        )}
        <br />
        <hr />
        <h4 className="text-center mt-2">Other Musician Cards:</h4>

        <div className="container">
          <div className="row">
            {cards.length ? (
              cards.map((card) => (
                <Card
                  key={card.id}
                  card={card}
                  connectedId={connectedMusician.id}
                />
              ))
            ) : (
              <p>No cards yet...</p>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default CardsList;
