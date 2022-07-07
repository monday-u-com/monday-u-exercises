import {objectToQuerystring} from "../utils/url-utils";

export default class ItemClient {
    constructor() {
        this._API_BASE = 'http://localhost:3001/api';
        this._HEADERS = {Accept: 'application/json', 'Content-Type': 'application/json'};
    }

    async getAllTodos(filters) {
        if (filters.status.length == 1) {
            filters.status = filters.status[0].value;
        } else {
            delete filters.status;
        }
        const queryString = objectToQuerystring(filters);
        try {
            const response = await fetch(`${this._API_BASE}/todos${queryString}`);
            return this._handleSuccess(response);
        } catch (error) {
            return this._handleFailure(error);
        }
    }

    async getPendingTodos() {
        try {
            const response = await fetch(`${this._API_BASE}/pending-todos`);
            return this._handleSuccess(response);
        } catch (error) {
            return this._handleFailure(error);
        }
    }

    async addTodo(todo) {
        try {
            const response = await fetch(`${this._API_BASE}/todo`, {
                method: "POST",
                headers: this._HEADERS,
                body: JSON.stringify({todo})
            });
            return this._handleSuccess(response);
        } catch (error) {
            return this._handleFailure(error);
        }
    }

    async editTodo(id, todo) {
        try {
            const response = await fetch(`${this._API_BASE}/todo/${id}`, {
                method: "PUT",
                headers: this._HEADERS,
                body: JSON.stringify({todo})
            });
            return this._handleSuccess(response);
        } catch (error) {
            return this._handleFailure(error);
        }
    }

    async deleteTodo(id) {
        try {
            const response = await fetch(`${this._API_BASE}/todo/${id}`, {
                method: "DELETE",
                headers: this._HEADERS
            });
            return this._handleSuccess(response);
        } catch (error) {
            return this._handleFailure(error);
        }
    }

    async deleteAllTodos() {
        try {
            const response = await fetch(`${this._API_BASE}/todos`, {
                method: "DELETE",
                headers: this._HEADERS
            });
            return this._handleSuccess(response);
        } catch (error) {
            return this._handleFailure(error);
        }
    }

    async _handleSuccess(response) {
        const res = {
            success: true,
            status: response.status
        };
        res.body = await response.json();
        return res;
    }

    async _handleFailure(error) {
        const res = {success: false}
        res.error = error.toString();
        return res;
    }

}

