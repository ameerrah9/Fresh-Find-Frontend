class Item {
    constructor(item) {
      this.id = item.id
      this.list_id = item.list_id
      this.content = item.content
      this.li = document.createElement('li')
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
            let newItem = new Item(item.data.attributes)
            newItem.createItemCard(itemList)
        })
        .catch(err => alert(err))
    }

    createItemCard(itemList) {
        this.li.dataset.id = this.list_id
        this.li.className = "py-4 subpixel-antialiased font-medium col-span-10 my-2 px-2 bg-white w-1/5 md:w-1/7 rounded border-green-300 shadow-inner fst-italic"
        this.li.innerHTML = `${this.content}`
    
        const deleteBtn = document.createElement('button')
        deleteBtn.className = "ml-4 px-1 float-right hover:opacity-50"
        deleteBtn.innerHTML = `<i class="fa fa-trash-alt"></i>`
        deleteBtn.addEventListener("click", (_event) => { this.deleteItem() })
        this.li.appendChild(deleteBtn)
        itemList.appendChild(this.li)
    }

    deleteItem() {
        fetch(`${itemsURL}/${this.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        this.li.remove()
    }
}
