class Item {
    constructor(content, list_id) {
      this.list_id = list_id
      this.content = content
      this.listsAdapter = new ListsAdapter()
    }

    renderItems() {
        const itemsArr = []
        const createdItems = []
        this.listsAdapter.getLists()
        .then(lists => {lists.forEach
            (list => {
                itemsArr.push(list["attributes"]["items"])
            })
            itemsArr.forEach(item => {item.forEach
                (item => {
                    const createdItem = new Item(item["content"], item["list_id"])
                    createdItems.push(createdItem)
                })
            })
            createdItems.forEach(itemData => {
                itemData.createItemCard()
            })}
        )
    }

    createItemCard() {
        const itemContainer = document.getElementById("list-container")
        const itemLI = document.createElement("li")
        const content = this.content
        //console.log(content)
        const itemListID = this.list_id 
        itemLI.append(content)
        itemContainer.append(itemLI)

        // const addItemBtn = document.createElement("button")
        // addItemBtn.className = "add-item"
        // addItemBtn.textContent = "Add Item"
        //addItemBtn.addEventListener("click", (e) => this.addItem(e))

        // const deleteBtn = document.createElement("button")
        // deleteBtn.className = "delete-item"
        // deleteBtn.textContent = "Delete Item"
        //deleteBtn.addEventListener("click", (e) => this.deleteItem(e))

        // const itemForm = document.createElement("li")
        // itemForm.append(addItemBtn)
        // container.append(listUL, itemForm)
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