// lib/api.js
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.apiUrl;
if (!API_URL) throw new Error("API_URL is not configured");

export async function login(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || "Login failed");
    }

    return data;
}

export async function register(name, email, password) {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
            password
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || "Registration failed");
    }

    return data;
}

export async function getCurrentUser(token) {
    const response = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || "Could not get current user");
    }

    return data;
}

export async function getHabits(token) {
    const response = await fetch(`${API_URL}/habits`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || "Could not fetch habits");
    }

    return data;
}

export async function deleteHabit(id, token) {
  const response = await fetch(`${API_URL}/habits/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to delete habit")
  }

  return true
}