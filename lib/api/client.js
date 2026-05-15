import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.apiUrl;
if (!API_URL) throw new Error("API_URL is not configured");

export async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, options);
  const contentType = response.headers.get("content-type");
  const data = contentType?.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) throw new Error(data?.message || "Request failed");

  return data;
}

export function authHeaders(token) {
  return { Authorization: `Bearer ${token}` };
}

export function jsonHeaders(token) {
  return {
    "Content-Type": "application/json",
    ...(token ? authHeaders(token) : {}),
  };
}