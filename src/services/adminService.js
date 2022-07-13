import httpService from "./httpService";
import config from "../config.json";

// export function getLikesAmount(cardId) {
//   return httpService.get(`${config.apiUrl}/like/?cardId=${cardId}`);
// }

// export function removeLikeTable(cardId) {
//   return httpService.delete(`${config.apiUrl}/like/?cardId=${cardId}`);
// }

// export function addLikeTable(cardId) {
//   return httpService.put(`${config.apiUrl}/like`, { cardId });
// }

// export function removeCardById(cardId) {
//   return httpService.patch(`${config.apiUrl}/musician_card/remove`, { cardId });
// }

export function getTable(tableName) {
  return httpService.get(`${config.apiUrl}/admin/?tableName=${tableName}`);
}

export function deleteById(tableName, id) {
  // console.log("tableName", tableName);
  // console.log("id", id);
  return httpService.delete(`${config.apiUrl}/${tableName}/?id=${id}`);
}

export function addItem(item, tableName) {
  return httpService.post(`${config.apiUrl}/${tableName}`, { item });
}

export function demoteAdmin(id) {
  return httpService.patch(`${config.apiUrl}/musicians/demote`, {
    id,
  });
}
export function promoteAdmin(id) {
  return httpService.patch(`${config.apiUrl}/musicians/promote`, {
    id,
  });
}

const adminService = {
  getTable,
  deleteById,
  addItem,
  demoteAdmin,
  promoteAdmin,
};

export default adminService;
