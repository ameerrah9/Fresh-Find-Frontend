class List {    
    static listNames = []
    
    constructor(list){
        this.id = list.id
        this.name = list.attributes.name
        this.items = list.attributes.items
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
        li.className = "my-2 px-4 bg-green-200"
    
        // const h1 = document.createElement('h1')
        // h1.className = "text-2xl semibold border-b-4 border-blue"
        // h1.innerHTML = "My First Item!"

        const p = document.createElement('p')
        p.className = "text-2xl semibold border-b-2"
        p.innerHTML = `<br>${this.name}<br><br>`
    
        const deleteBtn = document.createElement("button")
        deleteBtn.innerHTML = `<br><div class="text-2xl semibold border-b-4 border-red">Delete List <a href="#" class="my-4 text-right"><i class="fa fa-trash-alt"></i></a></div>`
        deleteBtn.addEventListener("click", this.deleteList)
    
        const itemList = document.createElement('ul')
        itemList.setAttribute("id", "item-list")
        this.items.forEach(item => {
            let itemObj = new Item(item)
            itemObj.createItemCard(itemList)
        })
    
        const itemForm = document.createElement('form')
        itemForm.innerHTML += 
        `
        <br>
        <div class="text-2xl">Add an Item Here:</div>
        <input type="text" name="input" id="item-input" class="flex-1 p-3" placeholder="New Item"/>
        <button type="submit" class="flex-none"><i class="fa fa-plus p-4 z--1 bg-green-400"></i></button>
        </div>
        <br>
        <br>
        `
        itemForm.addEventListener("submit", Item.createItem)

        li.append(p, itemList, deleteBtn, itemForm)
    
        listUL.appendChild(li)
        
        listForm.reset()
    }

    static postLists() {
        event.preventDefault()
        fetch(listsURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: listInput.value})
        })
        .then(resp => resp.json())
        .then(listData => {
            let newList = new List(listData.data)
            newList.createListCard()
        })
        .catch(err => alert(err))
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