import { request, authHeaders, jsonHeaders } from './client';

export async function getTodayHabits(token) {
    return request('/daily-habits', {
        method: "GET",
        headers: authHeaders(token),
    });
}

export async function updateHabitCompletion(habitId, completed, token) {
    return request(`/daily-habits/${habitId}/completion`, {
        method: "PATCH",
        headers: jsonHeaders(token),
        body: JSON.stringify({ completed }),
    });
}