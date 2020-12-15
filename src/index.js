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
  fetchItems()
  //fetchLists()
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
        console.log("rails obj", list) 
        const listMarkup = 
        `
          <div data-id=${list.id}>
            <h3>${list.attributes.name}</h3>
            <p>${list.attributes.items.content}</p>
            <button data-id=${list.id}>Edit</button>
            <button data-id=${list.id}>Delete</button>
          </div>
          <br><br>
          `;

          document.querySelector("#lists-container").innerHTML += listMarkup
      })
    })
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
          <button data-id=${item.id}>Edit</button>
          <button data-id=${item.id}>Delete</button>
        </div>
        <br><br>
      `;

        document.querySelector("#items-container").innerHTML += itemMarkup
    })
  })
}

// create a list
function createItemForm() {
  let itemForm = document.getElementById("item-form-container")

  itemForm.innerHTML +=
  `
  <form action="index.html" id="item-form" method="get">
  <br>
  <div class="mb-3">
      <h3>Create Your List Here!</h3>
      <label for="createItems" class="item-form">Item</label>
      <input type="text" name="content" class="form-control" id="item-content" placeholder="Enter Your Item">
    </div>
    <br>
    <div>
    <p>Choose List</p>
      <select id="list" name="list">
        <option value="1">Vegetables</option>
        <option value="2">Fruit</option>
        <option value="3">Pastries</option>
        <option value="4">Milk</option>
        <option value="5">Livestock</option>
        <option value="6">Crops</option>
        <option value="7">Nuts</option>
        <option value="8">Berries</option>
      </select>
    </div>
    <br><br>

    <input type="submit" id="btn" name="button" class="btn btn-success"></input><br>
  </form><br>
  `

  itemForm.addEventListener("submit", (e) => submitItem(e))

}


// submit list
function itemFormHandler(e) {
  e.preventDefault();
  const content = document.querySelector("#item-content").value;
  const listInput = document.querySelector("#list").value;
  const listID = parseInt(listInput)

  itemPostFetch(content, listID)
}

function itemPostFetch(item_content, list_id) {

  const configObj = {
    method: "POST",
    headers:{
        "Content-type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(item)
}
}

// // submit item
// function submitItem(item, postId) {
//         event.preventDefault();
      
//           const configObj = {
//               method: "POST",
//               headers:{
//                   "Content-type": "application/json",
//                   "Accept": "application/json"
//               },
//               body: JSON.stringify({
//                   content: item,
//                   list_id: listId
//               })
//           }
      
//           fetch(itemURL, configObj);
      
//           renderItem(itemInput.value);
//       }

// delete - delete a list

function deleteList() {
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

function deleteItem() {
  let itemId = parseInt(event.target.dataset.id)

  fetch(`${itemURL}/${itemId}`, {
      method: "DELETE"
  })

  this.location.reload()
}