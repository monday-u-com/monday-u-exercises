class ItemClient {

    constructor() {
        this.url = 'http://localhost:3030/';
    }

    async getItems() {
        try {
            const items = await (await fetch(this.url)).json()
            return items
        } catch (e) {
            console.log(e)
            return []
        }
    }

    async postItem(itemText) {

        const options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ item: itemText })
        }

        try {
            const items = await (await fetch(this.url, options)).json()
        } catch (e) {
            console.log(e)
            return `There has been an error => ${e}`
        }
    }

    async deleteItem(item) {

        const options = {
            method: "DELETE",
        }

        try {
            await fetch(this.url + `${item}`, options)
        } catch (e) {
            console.log(e)
            return e
        }
    }
}

export default ItemClient