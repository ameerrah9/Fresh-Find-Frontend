class List {    
    constructor(name){
        this.name = name
        this.listsAdapter = new ListsAdapter()

    }

    renderLists() {
        const listNames = []
        const createdListNames = []
        this.listsAdapter.getLists()
        .then(lists => {lists.forEach
            (list => { 
                //console.log(list)
                const listName = list["attributes"]["name"]
                listNames.push(listName)
            })
            listNames.forEach(name => {
                const createdList = new List(name)
                createdListNames.push(createdList)
            })
            createdListNames.forEach(listName => {
                listName.createListCard()
            })}
        )
    }

    createListCard() {
        const container = document.getElementById("list-container")
        const listUL = document.createElement("ul")
        listUL.className = "list-collection"
        const listLI = document.createElement("li")
        const names = this.name
        listLI.append(names)
        listUL.append(listLI)

        const addItemBtn = document.createElement("button")
        addItemBtn.className = "add-item"
        addItemBtn.textContent = "Add Item"
        //addItemBtn.addEventListener("click", (e) => this.addItem(e))

        const deleteListBtn = document.createElement("button")
        deleteListBtn.className = "delete-list"
        deleteListBtn.textContent = "Delete list"
        //deleteBtn.addEventListener("click", (e) => this.deleteItem(e))

        const itemForm = document.createElement("li")
        itemForm.append(addItemBtn)
        container.append(listUL, itemForm, deleteListBtn)
    }

}