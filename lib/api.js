// lib/api.js
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.apiUrl;

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

    return response.json();
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

    console.log("GET /auth/me status:", response.status);
    console.log("GET /auth/me data:", data);

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