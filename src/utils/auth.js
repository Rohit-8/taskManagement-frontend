// src/utils/auth.js
// Simple auth utility for demo purposes
export function isLoggedIn() {
  // Replace with real auth logic or context
  return localStorage.getItem('isLoggedIn') === 'true';
}

export function login() {
  localStorage.setItem('isLoggedIn', 'true');
}

export function logout() {
  localStorage.setItem('isLoggedIn', 'false');
}
