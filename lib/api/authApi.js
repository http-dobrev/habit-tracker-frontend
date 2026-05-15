import { request, jsonHeaders, authHeaders } from './client';

export async function login(email, password) {
  return request('/auth/login', {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify({ email, password }),
  });
}

export async function register(name, email, password) {
  return request('/auth/register', {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify({ name, email, password }),
  });
}

export async function getCurrentUser(token) {
  return request('/auth/me', {
    method: "GET",
    headers: authHeaders(token),
  });
}