const API = {
  base: import.meta.env.VITE_API_BASE || 'http://localhost:4000/api',
  async get(path, token) {
    const res = await fetch(this.base + path, { headers: token ? { Authorization: 'Bearer ' + token } : {} })
    return res.json()
  },
  async post(path, body, token) {
    const res = await fetch(this.base + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: 'Bearer ' + token } : {}) },
      body: JSON.stringify(body)
    })
    return res.json()
  }
}
export default API
