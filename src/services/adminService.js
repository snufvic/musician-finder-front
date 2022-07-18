import httpService from "./httpService";
import config from "../config.json";

export function getTable(tableName) {
  return httpService.get(`${config.apiUrl}/admin/?tableName=${tableName}`);
}

export function deleteById(tableName, id) {
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
