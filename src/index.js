// const BASE_URL = 'http://localhost:3000'
const listURL = 'http://localhost:3000/lists'
// const listForm = document.getElementById("list-form");
// const listInput = document.getElementById("list-input");
// const allLists = document.getElementById("lists")
const itemURL = 'http://localhost:3000/items'
// //console.log(listForm);
// //console.log(BASEURL) ^(control) + option + L


// listForm.addEventListener("submit", submitList);
// AJAX requests - fetch requests
// read - fetch lists index - list out all lists

//as soon as the user loads the page we load the DOM
document.addEventListener("DOMContentLoaded", () => {
  //fetchItems()
  fetchLists()
  createItemForm()
})
// read - fetch lists from index
// making a GET request when the browser loads
  function fetchLists() {
  //fetch(`${BASE_URL}/lists`)
  //or
    fetch(listURL) // choose endpoint
    .then(resp => resp.json()) // catch response and turn into json by parsing
    .then(lists => {
      lists.data.forEach(list => {
        const listMarkup = 
        `
          <div data-id=${list.id}>
            <h3>${list.attributes.name}</h3>
            <ul id="lists">${list.attributes.items.map(myItem).join("")}</ul>
            <button class="btn btn-danger btn-sm" onclick="deleteList(${list.id})">Delete List</button>
            <button class="btn btn-danger btn-sm" onclick="editList(${list.id})">Edit List</button>
            </div>
          <br><br>
          `;

          document.querySelector("#lists-container").innerHTML += listMarkup
          const listOption = document.createElement("option")
          listOption.text = list.attributes.name
          listOption.value = list.id
          const listSelect = document.getElementById("list-selection")
          listSelect.appendChild(listOption)
      })
    })
  }

  function myItem(item) {
    return `
    <li>
    <ul id="lists" class="list-none">
        <li class="my-2 px-4 bg-green-200 grid grid-cols-12 sm:grid-cols-6">
        <br>  
          <div class="block float-left w-10/12 p-3">Available</div><br>
          <div>${item.content}</div><br>
          <div>
            <a href="#" class="my-4 text-left"><i onclick="deleteItem(${item.id})"class="fa fa-trash-alt"></i></a>
            <a href="#" class="my-4 text-left"><i onclick="editItem(${item.id})"class="fa fa-pencil-alt"></i></a>
          </div>
        <br>    
        </li>
    </ul>
    </li>
    `
  }


// read - fetch items from index
function fetchItems() {
  //fetch(`${BASE_URL}/lists`)
  //or
  fetch(itemURL)
  .then(resp => resp.json())
  .then(items => {
    items.data.forEach(item => {
      const itemMarkup = 
      `
        <div data-id=${item.id}>
          <h3>${item.attributes.content}</h3>
          <button class="btn btn-light btn-sm" data-id=${item.id}>Edit</button>
          <button class="btn btn-light btn-sm" data-id=${item.id}>Delete</button>
        </div>
        <br><br>
      `;

        document.querySelector("#items-container").innerHTML = itemMarkup
    })
  })
}

// create a list
function createItemForm() {
  let itemForm = document.getElementById("item-form-container")

  itemForm.innerHTML +=
  `
  <form action="index.html" id="item-form" method="get" class="clearfix mt-4">
  <br>
  <div class="mb-3">
    <p>Enter Your List Here:</p>
    <button type="submit" class="block float-right w-2/12"><i class="fa fa-plus p-4 z--1 bg-black-400"></i></button>
    <input type="text" name="content" class="block float-left w-10/12 p-3" id="item-content" placeholder="Enter Your Item"><br><br>
    <br>
    
    <div>
    <p>Select Your List</p>
      <select id="list-selection" name="list">
    
      </select>
      </div>
    </div>
    <br><br>
    
    </div>
  </form><br>
  `

  itemForm.addEventListener("submit", (e) => itemFormHandler(e))

}

// submit list
function itemFormHandler(e) {
  e.preventDefault();
  const content = document.querySelector("#item-content").value;
  const listInput = document.querySelector("#list-selection").value;
  const listID = parseInt(listInput)

  itemPostFetch(content, listID)
}

function itemPostFetch(item_content, list_id) {
  const bodyData = {
    content: item_content,
    list_id: list_id
  }

  const configObj = {
    method: "POST",
    headers:{
        "Content-type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(bodyData)
  }

  fetch(itemURL, configObj)
  .then(resp => resp.json())
  .then(item => {
    fetchItems();
  })
}

// delete - delete a list

function deleteList(id) {
  let listId = parseInt(event.target.dataset.id)

  fetch(`${listURL}/${listId}`, {
      method: "DELETE"
  })

  this.location.reload()
}

function editList() {

}

function editList() {
  
}

function deleteItem(id) {
  //let itemId = parseInt(event.target.dataset.id)

  fetch(`${itemURL}/${id}`, {
      method: "DELETE"
  })

  this.location.reload()
}