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

// create - create a new list

// delete - delete a list

document.addEventListener("DOMContentLoaded", () => {
  fetchItems()
  fetchLists()
  createListForm()
})
// read - fetch lists from index
function fetchLists() {
  //fetch(`${BASE_URL}/lists`)
  //or
  fetch(listURL)
  .then(resp => resp.json())
  .then(lists => {
    //lists.forEach(list => 
    for (const list of lists){
      //console.log("rails obj", list) 
      let fl = new List(list.id, list.name)
      fl.renderList();
    }
    //renderList(list.data.attributes)))

  })
}

// read - fetch items from index
function fetchItems() {
  //fetch(`${BASE_URL}/lists`)
  //or
  fetch(itemURL)
  .then(resp => resp.json())
  .then(items => {
    //lists.forEach(list => 
    for (const item of items){
      //console.log("rails obj", item) 
      let i = new Item(item.id, item.content)
      //console.log("js object", i);
      i.renderItem();
    }

    //renderList(list.data.attributes)))

  })
}

// create a list
function createListForm() {
  let listForm = document.getElementById("list-form")

  listForm.innerHTML +=
  `
  <form action="index.html" id="list-form" method="get">
    <label>New Fresh List:</label>
    <input type="text" id="name" value="Create List">
    <button type="submit" id="btn" name="button">+</button>
  </form>
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
    .then(resp => console.log(resp))

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
