import httpService from "./httpService";
import config from "../config.json";

// export function createCard(card) {
//   return httpService.post(`${config.apiUrl}/cards`, card);
// }

export function getCards() {
  return httpService.get(`${config.apiUrl}/musicians/CardsList`);
}

// export function getCard(id) {
//   return httpService.get(`${config.apiUrl}/cards/${id}`);
// }

// export function editCard({ _id, ...card }) {
//   return httpService.put(`${config.apiUrl}/cards/${_id}`, card);
// }

// export function deleteCard(id) {
//   return httpService.delete(`${config.apiUrl}/cards/${id}`);
// }

export function getConnectedMusician() {
  return httpService.get(`${config.apiUrl}/musician_card/me`);
}

export function getImage() {
  return httpService.get(`${config.apiUrl}/musician_card`);
}

export function getRestOfCards() {
  return httpService.get(`${config.apiUrl}/musician_card/`);
}

export function getLikesAmount(cardId) {
  return httpService.get(`${config.apiUrl}/like/?cardId=${cardId}`);
}

// export function updateLikeTable(cardId, likedByConnected) {
//   return httpService.patch(`${config.apiUrl}/like`, {
//     cardId: cardId,
//     likedByConnected: likedByConnected,
//   });
// }
export function removeLikeTable(cardId) {
  return httpService.delete(`${config.apiUrl}/like/?cardId=${cardId}`);
}
export function addLikeTable(cardId) {
  return httpService.put(`${config.apiUrl}/like`, { cardId });
}

const cardService = {
  //   createCard,
  getCards,
  getConnectedMusician,
  getRestOfCards,
  getLikesAmount,
  // updateLikeTable,
  removeLikeTable,
  addLikeTable,
  //   getCard,
  //   editCard,
  //   deleteCard,
};

export default cardService;
