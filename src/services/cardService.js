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

const cardService = {
  //   createCard,
  getCards,
  //   getCard,
  //   editCard,
  //   deleteCard,
};

export default cardService;
