class List {    
    constructor(name){
        this.name = name
        this.listsAdapter = new ListsAdapter()

    }

    renderLists() {
        const listNames = []
        this.listsAdapter.getLists()
        .then(lists => lists.forEach
            (list => { 
                const listName = list["attributes"]["name"]
                listNames.push(listName)
                listNames.forEach(name => name.createListCard())
            }
        ))
    }

    createListCard() {
        const container = document.querySelector(".list-container")
        console.log(container)
    }

}