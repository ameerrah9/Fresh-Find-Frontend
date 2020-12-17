// lists.map(list => {
//     new List(list)
//     })
// method that iterates over list
fetchLists() {
    fetch(listURL)
    .then(resp => resp.json())
    .then(lists => {
        for(let list of lists){
            let newList = new List(lists)
        }
        this.renderList()
    })
}

renderList() {
    const listForm =
    `
    <form id="list-form" method="get" class="clearfix mt-4">
        <div class="mb-3">
            <p>Enter Your List Name</p>
            <button type="submit" class="block float-right w-2/12"><i class="fa fa-plus p-4 z--1 bg-black-400"></i></button>
            <input type="text" name="name" class="block float-left w-10/12 p-3" id="list-name" placeholder="Enter List Name"><br>
        </div>
    </form><br></br>
    `
    const itemForm =
    `
    <form id="item-form" method="get" class="clearfix mt-4">
        <div class="mb-3">
        <p>Enter Your Item</p>
        <button type="submit" class="block float-right w-2/12"><i class="fa fa-plus p-4 z--1 bg-black-300"></i></button>
        <input type="text" name="name" class="block float-left w-10/12 p-3" id="item-content" placeholder="Enter Item"><br><br>
        <br>
        </div>
    </form>`;

    const listMarkup = 
    `
    <div data-id=${list.id}>
    <h3>${list.data.attributes.name}</h3>
    <li id="lists">${list.data.attributes? list.data.attributes.items.map(myItem).join("") : null} </li>
        ${itemForm}
    <a href="#" class="my-4 text-left"><i onclick="deleteList(${list.id})"class="fa fa-trash-alt">Delete List</i></a>
    </div>
    <br><br>
    `;

    deleteList.addEventListener("click", this.deleteList)
    itemForm.addEventListener("submit", Item.createItem)
    listForm.addEventListener("submit", this.createList)

    const listsUL = document.getElementById("all-lists")
    listsUL.appendChild(listMarkup)

    const listContainer = document.getElementById("lists-container")
    listContainer.appendChild(listForm)
    
    listForm.reset()
}

submitList(){
    event.preventDefault()
    const configObj = {
        method: "POST", 
        headers: {
            "Content-type": "application/json", 
            "Accept": "application/json"
        }, 
        body: JSON.stringify({
            content: listInput.value
        })
    }

    fetch(listURL, configObj)
    .then(resp => resp.json())
    .then(data => {
        let newList = new List(data.data)
        newList.renderList()
    })

}

deleteList(){
    const listId = this.parentElement.dataset.id

    fetch(`${listURL}/${listId}`, {
        method: "DELETE"
    })

    this.parentElement.remove()
}

class List {
    constructor(list) {
        //console.log(list)
        this.name = list.name
    }

    static renderLists(){
        for(let list of this.allLists){
            list.renderList()
        }
    }

}