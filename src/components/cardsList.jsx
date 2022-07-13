import React, { Component } from "react";
import cardService from "../services/cardService";
import { toast } from "react-toastify";
import Card from "./common/card";
import PageHeader from "./common/pageHeader";
import { NavLink } from "react-router-dom";

class CardsList extends Component {
  state = {
    connectedMusician: "",
    cards: [],
  };

  async componentDidMount() {
    await this.getConnectedMusicianAndUpdateState();
    await this.getRestMusiciansAndUpdateState();
  }

  async getConnectedMusicianAndUpdateState() {
    try {
      const musician = await cardService.getConnectedMusician();
      this.setState({
        connectedMusician: {
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
          // allLikes: musician.data.allLikes,
          likedByConnected: musician.data.likedByConnected,
          timesLiked: musician.data.timesLiked,
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

  checkLikeAndUpdate = async (likedByConnected, cardId) => {
    if (likedByConnected) {
      // need to do unlike
      try {
        await cardService.removeLikeTable(cardId);
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
        await cardService.addLikeTable(cardId);
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

    if (cardId === this.state.connectedMusician.id) {
      await this.getConnectedMusicianAndUpdateState();
      return;
    }
    await this.getRestMusiciansAndUpdateState();
  };

  handleRemoveCard = async (cardId) => {
    try {
      await cardService.removeCardById(cardId);
      toast.success("Removed Musician Card successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch {
      toast.error("Failed to remove card from server", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (cardId === this.state.connectedMusician.id) {
      await this.getConnectedMusicianAndUpdateState();
      return;
    }
    await this.getRestMusiciansAndUpdateState();
  };

  render() {
    const { cards, connectedMusician } = this.state;

    return (
      <>
        <PageHeader Header="Welcome to the Musician Cards Page" />
        <hr />
        {connectedMusician.is_card === 1 ? (
          <div className="row justify-content-center">
            <h4 className="text-center mt-2">Your Card</h4>
            <Card
              card={connectedMusician}
              fav={true}
              onCheckLikeAndUpdate={this.checkLikeAndUpdate}
              onRemove={this.handleRemoveCard}
            />
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
        <h4 className="text-center mt-2">Favorite Musician Cards:</h4>

        <div className="container">
          <div className="row">
            {cards.length ? (
              cards.map((card) => (
                <Card
                  key={card.id}
                  card={card}
                  fav={true}
                  onCheckLikeAndUpdate={this.checkLikeAndUpdate}
                  onRemove={this.handleRemoveCard}
                />
              ))
            ) : (
              <p>No cards yet...</p>
            )}
          </div>
        </div>
        <hr />
        <h4 className="text-center mt-2">Other Musician Cards:</h4>

        <div className="container">
          <div className="row">
            {cards.length ? (
              cards.map((card) => (
                <Card
                  key={card.id}
                  card={card}
                  fav={false}
                  onCheckLikeAndUpdate={this.checkLikeAndUpdate}
                  onRemove={this.handleRemoveCard}
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
