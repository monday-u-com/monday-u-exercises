export default class ItemClient {
    constructor() {
        this._API_BASE = 'http://localhost:3001/api';
        this._HEADERS = { Accept: 'application/json', 'Content-Type': 'application/json' };
    }

    async getAllTodos(sortBy) {
        const queryString = sortBy ? `?sortBy=${sortBy}` : '';
        try {
            const response = await fetch(`${this._API_BASE}/todos${queryString}`);
            return this._handleResponse(null, response);
        } catch (error) {
            return this._handleResponse(error);
        }
    }

    async getTodo(todoId) {
        try {
            const response = await fetch(`${this._API_BASE}/todo/${todoId}`);
            return this._handleResponse(null, response);
        } catch (error) {
            return this._handleResponse(error);
        }
    }

    async getPendingTodos() {
        try {
            const response = await fetch(`${this._API_BASE}/pending-todos`);
            return this._handleResponse(null, response);
        } catch (error) {
            return this._handleResponse(error);
        }
    }

    async addTodo(todo) {
        try {
            const response = await fetch(`${this._API_BASE}/todo`, {
                method: "POST",
                headers: this._HEADERS,
                body: JSON.stringify({ todo })
            });
            return this._handleResponse(null, response);
        } catch (error) {
            return this._handleResponse(error);
        }
    }

    async editTodo(id, todo) {
        try {
            const response = await fetch(`${this._API_BASE}/todo/${id}`, {
                method: "PUT",
                headers: this._HEADERS,
                body: JSON.stringify({todo})
            });
            return this._handleResponse(null, response);
        } catch (error) {
            return this._handleResponse(error);
        }
    }

    async deleteTodo(id) {
        try {
            const response = await fetch(`${this._API_BASE}/todo/${id}`, {
                method: "DELETE",
                headers: this._HEADERS
            });
            return this._handleResponse(null, response);
        } catch (error) {
            return this._handleResponse(error);
        }
    }

    async deleteAllTodos() {
        try {
            const response = await fetch(`${this._API_BASE}/todos`, {
                method: "DELETE",
                headers: this._HEADERS
            });
            return this._handleResponse(null, response);
        } catch (error) {
            return this._handleResponse(error);
        }
    }

    async _handleResponse(error, response) {
        const res = { success: true };
        if (error) {
            res.error = error.toString();
            res.success = false;
            return res;
        }
        res.status = response.status;
        res.body = await response.json();
        return res;
    }
}

