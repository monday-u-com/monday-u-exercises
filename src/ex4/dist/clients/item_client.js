API_BASE = "http://localhost:8080/item";

class ItemClient {

    async getTodos() {
        try {
            const { data } = await axios.get(API_BASE)
            return data;
        } catch (error) {
            console.log('Error:', error)
        }
    }

    async setTodo(todo) {
        try {
            const { data } = await axios.post(API_BASE, { value: todo })
            return data;
        } catch (error) {
            console.log('Error:', error)
        }
    }

    async deleteTodo(value) {
        try {
            const { data } = await axios.delete(`${API_BASE}/${value}`);
            return data;
        } catch (error) {
            console.log('Error:', error)
        }
    }

    async deleteAll() {
        try {
            await axios.delete(`${API_BASE}`);
        } catch (error) {
            console.log('Error:', error)
        }
    }
}