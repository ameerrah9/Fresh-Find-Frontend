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
  //createListForm()
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
        //console.log("rails obj", list) 
        const listMarkup = 
        `
          <div data-id=${list.id}>
            <h3>${list.attributes.name}</h3>
            <p>${list.attributes.items[0].content}</p>
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
function createListForm() {
  let listForm = document.getElementById("list-form")

  listForm.innerHTML +=
  `
  <form action="index.html" id="list-form" method="get">
    <div class="mb-3">
      <label for="createList" class="list-form">New Fresh List:</label>
      <input type="text" class="form-control" id="name" Create a List>
      </div>
      <div class="mb-3">
      <label for="Items" class="item--form">Items</label>
      <textarea class="form-control" id="content" rows="3"></textarea>
      </div>
      <button type="submit" id="btn" name="button"class="btn btn-success">+</button><br>
  </form><br>
  `

  listForm.addEventListener("submit", submitList)

}

// // create a item
// // function createItemForm() {
// //   let itemForm = document.getElementById("item-form")

// //   itemForm.innerHTML +=
// //   `
// //   <form action="index.html" id="item-form" method="get">
// //     <label>New Item:</label>
// //     <input type="text" id="item-input" value="Add Item">
// //     <button type="submit" id="btn" name="button">+</button>
// //   </form>
// //   `

// //   submitItem();
// // }

// submit list
function submitList() {
event.preventDefault();
  let name = document.getElementById("name").value

  let list = {
    name: name
  }
    const configObj = {
        method: "POST",
        headers:{
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(list)
    }

    fetch(listURL, configObj)
    .then(resp => resp.json())
    .then(list => {
      let l = new List(list.id)
      l.renderList();
    })

    // renderList(listInput.value);
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