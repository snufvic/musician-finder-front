import React, { Component } from "react";
import cardService from "../services/cardService";
import { toast } from "react-toastify";
import Card from "./common/card";
import PageHeader from "./common/pageHeader";
import { NavLink } from "react-router-dom";
import Searchbar from "./common/searchbar";
import { AnimatePresence } from "framer-motion";

class CardsList extends Component {
  state = {
    connectedMusician: "",
    cards: [],
    searchField: "",
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
          likedByConnected: musician.data.likedByConnected,
          timesLiked: musician.data.timesLiked,
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
  }
  async getRestMusiciansAndUpdateState() {
    try {
      const { data } = await cardService.getRestOfCards();
      if (data.length) {
        this.setState({ ...this.state, cards: data });
      }
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

  search(cards, is_liked) {
    const { searchField } = this.state;
    const filteredPersons = cards.filter((card) => {
      if (
        card.selected_districts.length &&
        card.likedByConnected === is_liked
      ) {
        for (let i = 0; i < card.selected_districts.length; i++) {
          if (
            card.selected_districts[i].name
              .toLowerCase()
              .includes(searchField.toLowerCase())
          )
            return true;
        }
      }
      if (
        card.selected_instruments.length &&
        card.likedByConnected === is_liked
      ) {
        for (let i = 0; i < card.selected_instruments.length; i++) {
          if (
            card.selected_instruments[i].name
              .toLowerCase()
              .includes(searchField.toLowerCase())
          )
            return true;
        }
      }

      return (
        (card.first_name.toLowerCase().includes(searchField.toLowerCase()) ||
          card.last_name.toLowerCase().includes(searchField.toLowerCase())) &&
        card.likedByConnected === is_liked
      );
    });
    return filteredPersons;
  }

  handleChange = (e) => {
    this.setState({
      searchField: e.target.value,
    });
  };

  render() {
    const { cards, connectedMusician } = this.state;
    let filteredCardsLiked = null;
    let filteredCardsNotLiked = null;
    if (cards) {
      filteredCardsLiked = this.search(cards, true);
      filteredCardsNotLiked = this.search(cards, false);
    }

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

        <Searchbar
          title="Search Cards"
          handleChange={this.handleChange}
          placeholder="type to search by first or last name, instruments or districts"
        />
        <hr />

        <h4 className="text-center mt-2">Your Favorite Musician Cards:</h4>

        <div className="container">
          <div className="row">
            <AnimatePresence>
              {filteredCardsLiked.length ? (
                filteredCardsLiked.map((card) => (
                  <Card
                    key={card.id}
                    card={card}
                    onCheckLikeAndUpdate={this.checkLikeAndUpdate}
                    onRemove={this.handleRemoveCard}
                  />
                ))
              ) : (
                <p>No cards found</p>
              )}
            </AnimatePresence>
          </div>
        </div>
        <hr />
        <h4 className="text-center mt-2">Other Musician Cards:</h4>

        <div className="container">
          <div className="row">
            <AnimatePresence>
              {filteredCardsNotLiked.length ? (
                filteredCardsNotLiked.map((card) => (
                  <Card
                    key={card.id}
                    card={card}
                    onCheckLikeAndUpdate={this.checkLikeAndUpdate}
                    onRemove={this.handleRemoveCard}
                  />
                ))
              ) : (
                <p>No cards found</p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </>
    );
  }
}

export default CardsList;
