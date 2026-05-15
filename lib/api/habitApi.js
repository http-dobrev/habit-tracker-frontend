import { request, jsonHeaders, authHeaders } from './client';

export async function getHabits(token) {
  return request('/habits', {
    method: "GET",
    headers: authHeaders(token),
  });
}

export async function createHabit(habitData, token) {
  return request('/habits', {
    method: "POST",
    headers: jsonHeaders(token),
    body: JSON.stringify(habitData),
  });
}

export async function updateHabit(id, habitData, token) {
  return request(`/habits/${id}`, {
    method: "PUT",
    headers: jsonHeaders(token),
    body: JSON.stringify(habitData),
  });
}

export async function deleteHabit(id, token) {
  const response = await fetch(`/habits/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  if (!response.ok) throw new Error("Failed to delete habit");
  return true;
}