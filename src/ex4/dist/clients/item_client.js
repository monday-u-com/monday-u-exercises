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

    async updateStatus(id, status) {
        try {
            const { data } = await axios.put(`${API_BASE}/${id}`, { status });
            return data;
        } catch (error) {
            console.log('Error:', error)
        }
    }

    async deleteTodo(id) {
        try {
            const { data } = await axios.delete(`${API_BASE}/${id}`);
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