class ListsAdapter {
    constructor() {
        this.listURL = "http://localhost:3000/lists"
    }

    getLists() {
        return fetch(this.listURL)
        .then(resp => resp.json())
        .then(json => json.data)
    }

    postLists(data) {
        return fetch(this.listURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .catch(err => alert(err))
    }

    deleteLists(id) {
        return fetch(`${this.listURL}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => resp.json())
    }
    
}