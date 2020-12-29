class Item {
    constructor(item) {
      this.id = item.id
      this.list_id = item.list_id
      this.content = item.content
      this.itemsAdapter = new ItemsAdapter()
      this.listsAdapter = new ListsAdapter()
    }

    static createItem(e){
        e.preventDefault()
        const itemInput = e.target.children[0].value
        const itemList = e.target.nextElementSibling
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
        li.innerHTML = `<br>${this.content}`
    
        const deleteBtn = document.createElement('button')
        deleteBtn.innerHTML = `<a href="#" class="my-4 text-right"><i class="fa fa-trash-alt"></i></a>`
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