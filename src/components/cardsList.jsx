import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import cardService from "../services/cardService";
import Card from "./card";
import PageHeader from "./common/pageHeader";

class CardsList extends Component {
  state = {
    cards: [],
  };

  //   async componentDidMount() {
  //     const { data } = await cardService.getCards();

  //     if (data.length) {
  //       this.setState({
  //         cards: data,
  //       });
  //     }
  //   }

  render() {
    const { cards } = this.state;

    return (
      <div className="container">
        <PageHeader
          title={
            <>
              <i className="bi bi-person-badge"></i> My Cards Page
            </>
          }
        />

        <div className="row">
          <div className="col-12">
            <p>Your cards are listed below:</p>
          </div>
        </div>

        {/* <div className="row">
          <Link to="/create-card">Create a New Card</Link>
        </div> */}

        <div className="row">
          {cards.length ? (
            cards.map((card) => <Card key={card.id} card={card} />)
          ) : (
            <p>No cards yet...</p>
          )}
        </div>
      </div>
    );
  }
}

export default CardsList;
