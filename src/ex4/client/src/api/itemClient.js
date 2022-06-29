class ItemClient {

    constructor() {
        this.url = 'http://localhost:3030/todo';
    }

    async getItems() {
        try {
            const res = await fetch(this.url)
            if (res.status) {
                const items = await res.json()
                return items
            } else {
                alert('Something went wrong :(')
                return
            }
        } catch (e) {
            console.log(e)
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
            const res = await fetch(this.url, options)
            return res
        } catch (e) {
            console.log(e)
        }
    }

    async deleteItem(item) {

        const options = {
            method: "DELETE",
        }

        try {
            const res = await fetch(this.url + `/${item}`, options)
            console.log(res)
            return res
        } catch (e) {
            console.log(e)
        }
    }

    async statusChanged(item) {
        const options = {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }

        try {
            const res = await fetch(this.url + `/status/${item.item}`, options)
            return res
        } catch (e) {
            console.log(e)
        }
    }

}

export default ItemClient