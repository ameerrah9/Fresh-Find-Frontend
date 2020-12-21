class Item {
    constructor(item) {
      this.list_id = item.list_id
      this.content = item.content
      this.id = item.id; // to grab same id from my data base
    }

    postItems(data) {
        return fetch(this.baseURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .catch(err => alert(err))
    }

    deleteItems(id) {
        return fetch(listURL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => resp.json())
    }

}