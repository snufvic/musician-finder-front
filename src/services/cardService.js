import httpService from "./httpService";
import config from "../config.json";

export function getCards() {
  return httpService.get(`${config.apiUrl}/musicians/CardsList`);
}

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

export function removeLikeTable(cardId) {
  return httpService.delete(`${config.apiUrl}/like/?cardId=${cardId}`);
}

export function addLikeTable(cardId) {
  return httpService.put(`${config.apiUrl}/like`, { cardId });
}

export function removeCardById(cardId) {
  return httpService.patch(`${config.apiUrl}/musician_card/remove`, { cardId });
}

const cardService = {
  getCards,
  getConnectedMusician,
  getRestOfCards,
  getLikesAmount,
  removeLikeTable,
  addLikeTable,
  removeCardById,
};

export default cardService;
