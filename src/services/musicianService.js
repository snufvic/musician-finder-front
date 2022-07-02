import httpService from "./httpService";
import config from "../config.json";
import jwtDecode from "jwt-decode";

const TOKEN_KEY = "token";

httpService.setDefaultHeaders("x-auth-token", getJwtToken());

export function createMusician(musician) {
  return httpService.post(`${config.apiUrl}/signup`, musician);
}

export function getConnectedMusician() {
  return httpService.get(`${config.apiUrl}/signup/me`);
}

export async function login(email, password) {
  const { data } = await httpService.post(`${config.apiUrl}/auth`, {
    email,
    password,
  });
  localStorage.setItem(TOKEN_KEY, data.token);
  return data;
}

export function getJwtToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getMusician() {
  try {
    const token = getJwtToken();
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export async function getAllDistricts() {
  return await httpService.get(`${config.apiUrl}/district`);
}

export async function getAllInstruments() {
  return await httpService.get(`${config.apiUrl}/instruments`);
}

export async function updateMusician(musician) {
  return await httpService.patch(`${config.apiUrl}/musician_card`, musician);
}

export async function updateItemsInTable(body, routName) {
  return await httpService.post(
    `${config.apiUrl}/musician_card/items?route=${routName}`,
    body
  );
}

export async function resetPassword(email) {
  return await httpService.post(`${config.apiUrl}/reset_password`, email);
}

export async function createNewEnctyptedPassword(
  email,
  verificationCode,
  password
) {
  return await httpService.patch(`${config.apiUrl}/reset_password`, {
    email,
    verificationCode,
    password,
  });
}

export async function uploadImage(formData) {
  return await httpService.patch(
    `${config.apiUrl}/musician_card/uploadfile`,
    formData
  );
}

const musicianService = {
  createMusician,
  login,
  getJwtToken,
  logout,
  getMusician,
  getConnectedMusician,
  getAllDistricts,
  getAllInstruments,
  updateMusician,
  updateItemsInTable,
  resetPassword,
  createNewEnctyptedPassword,
  uploadImage,
};

export default musicianService;
