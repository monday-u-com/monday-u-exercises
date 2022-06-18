// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)
const backEndUrl = "http://localhost:8080"

class ItemClient {
  constructor() {
    this.api = backEndUrl
  }

  async getItems() {
    const response = await axios.get(`${this.api}/items`)
    return response.data
  }

  async addItem(item) {
    const response = await axios.post(`${this.api}/api/pokemon/${item}`, {
      item,
    })
    return response.data
  }

  async deleteItem(item) {
    const response = await axios.delete(`${this.api}/items/${item}`)
    return response.data
  }

  async deleteItems() {
    const response = await axios.delete(`${this.api}/items`)
    return response.data
  }

  async getItem(item) {
    const response = await axios.get(`${this.api}/items/${item}`)
    return response.data
  }

  // async checkingDuplicate(item) {
  //   const response = await axios.get(`${this.api}/items/${item}`)
  //   return response.data
  // }
}
