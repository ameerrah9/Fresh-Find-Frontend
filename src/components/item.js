class Item {
    constructor(item) {
      this.id = item.id
      this.list_id = item.list_id
      this.content = item.content
    }

    static createItem(e){
        e.preventDefault()
        const itemInput = e.target.children.input.value
        const itemList = document.getElementById("item-list")
        const listId = e.target.parentElement.dataset.id
        Item.postItems(itemInput, itemList, listId)
    
        e.target.reset()
    }

    static postItems(item, itemList, listId) {
        fetch(itemsURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: item, 
                list_id: listId
            })
        })
        .then(resp => resp.json())
        .then(item => {
            let newItem = new Item(item)
            newItem.createItemCard(itemList)
        })
        .catch(err => alert(err))
    }

    //renderComment
    createItemCard(itemList) {
        const li = document.createElement('li')
        li.dataset.id = this.list_id
        li.className = "py-4 col-span-10 my-2 px-2 bg-green-200 grid grid-cols-2 fst-italic"
        li.innerHTML = `${this.content}`
    
        const deleteBtn = document.createElement('button')
        deleteBtn.innerHTML = `<a href="#" class="my-4 text-right"><i class="fa fa-trash-alt"></i></a></div>`
        deleteBtn.addEventListener("click", this.deleteItem)
        li.appendChild(deleteBtn)
        itemList.appendChild(li)

    }

    deleteItem() {
        const itemId = this.parentElement.dataset.id

        fetch(`${itemsURL}/${itemId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        this.parentElement.remove()
    }
}