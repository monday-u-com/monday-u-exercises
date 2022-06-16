const API_BASE = 'http://localhost:5500';
class ItemClient {
	async getTodos() {
		try {
			const response = await axios.get(`${API_BASE}/todo`);
			const todoItems = response.data;

			return todoItems;
		} catch (error) {
			console.log(error);
		}
	}

	async addTodo(todo) {
		try {
			const response = await axios.post(`${API_BASE}/todo`, todo);
			const newTodo = response.data;

			return newTodo;
		} catch (errors) {
			console.error(errors);
		}
	}

	async deleteTodo(todoId) {
		try {
			const response = await axios.delete(`${API_BASE}/todo/${todoId}`);

			return response.data;
		} catch (errors) {
			console.error(errors);
		}
	}
}
