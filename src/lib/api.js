export const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export function authHeaders() {
  const token = localStorage.getItem('opps_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`)
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function apiAuthGet(path) {
  const res = await fetch(`${API_BASE}${path}`, { headers: { 'Content-Type': 'application/json', ...authHeaders() } })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function apiAuthPost(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(body)
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function apiAuthPut(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(body)
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}
