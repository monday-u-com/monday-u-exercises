// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)
import axios from "axios"
const backEndUrl = "http://localhost:8080"

export class ItemClient {
  constructor() {
    this.api = backEndUrl
  }

  async getItems() {
    const response = await axios.get(`${this.api}/items`)
    return response.data
  }

  async addItem(item) {
    const response = await axios.post(`${this.api}/items`, { item })
    return response.data
  }

  async deleteItem(item) {
    const response = await axios.delete(`${this.api}/items/${item}`)
    return response.data
  }

  async checkingDuplicate(item) {
    const response = await axios.get(`${this.api}/items/${item}`)
    return response.data
  }
}
