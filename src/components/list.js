class List {    
    static listNames = []
    
    constructor(list){
        this.id = list.id
        this.name = list.attributes.name
        this.items = list.attributes.items
        this.itemsAdapter = new ItemsAdapter()
        this.listsAdapter = new ListsAdapter()
        List.listNames.push(this)
    }

    static renderLists() {        
        for(let list of this.listNames){
            list.createListCard()
        }
    }

    static getLists() {
        fetch(listsURL)
        .then(resp => resp.json())
        .then(lists => {
            for(let list of lists) {
                let newList = new List(list.data)
            }
            this.renderLists()
        })
    }

    createListCard() {
        const li = document.createElement('li')
        li.dataset.id = this.id
    
        const p = document.createElement('p')
        p.className = "text-2xl semibold border-b-2"
        p.innerHTML = `<br>${this.name}<br><br>`
    
        const deleteBtn = document.createElement("button")
        deleteBtn.innerHTML = `<a href="#" class="my-4 text-right"><i class="fa fa-trash-alt"></i></a>`
        deleteBtn.addEventListener("click", this.deleteList)
    
        const itemList = document.createElement('ul')
        this.items.forEach(item => {
            let itemObj = new Item(item)
            itemObj.createItemCard(itemList)
        })
    
        const itemForm = document.createElement('form')
        itemForm.innerHTML += 
        `
        <br>
        <input type="text" id="item-input" class="flex-1 p-3" placeholder="New Item"/>
        <button type="submit" class="flex-none"><i class="fa fa-plus p-4 z--1 bg-green-400"></i></button>
        <br>
        `
        itemForm.addEventListener("submit", Item.createItem)

        li.append(p, itemList, deleteBtn, itemForm)
    
        listUL.appendChild(li)
        
        listForm.reset()
    }

    deleteList() {
        const listId = this.parentElement.dataset.id

        fetch(`${listsURL}/${listId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        this.parentElement.remove()
    }
}