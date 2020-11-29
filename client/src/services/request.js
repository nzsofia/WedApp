import dotenv from "dotenv";
dotenv.config();

export const URL = process.env.REACT_APP_API_URL;

export function get(url) {
  return fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());
}

export function post(url, object) {
  return fetch(url, {
    method: "POST",
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(object)
  }).then(res => res.json());
}
