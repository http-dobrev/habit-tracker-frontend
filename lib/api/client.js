import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = Constants.expoConfig?.extra?.apiUrl;
if (!API_URL) throw new Error("API_URL is not configured");

export async function request (path, options = {}, retry = true) {
  const response = await fetch(`${API_URL}${path}`, options);

  if (response.status === 401 && retry) {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('Unauthorized');

    const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!refreshRes.ok) {
      await AsyncStorage.multiRemove(['token', 'refreshToken']);
      throw new Error('Session expired');
    }

    const { token: newToken } = await refreshRes.json();
    await AsyncStorage.setItem('token', newToken);

    // Retry original request with new token
    const retryOptions = {
      ...options,
      headers: { ...options.headers, Authorization: `Bearer ${newToken}` },
    };
    return request(path, retryOptions, false);
  }

  if (!response.ok) throw new Error(await response.text());
  if (response.status === 204 || response.headers.get('content-length') === '0') return null;
  return response.json();
};

export function authHeaders(token) {
  return { Authorization: `Bearer ${token}` };
}

export function jsonHeaders(token) {
  return {
    "Content-Type": "application/json",
    ...(token ? authHeaders(token) : {}),
  };
}