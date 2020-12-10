const listURL = 'http://localhost:3000/lists'
const listForm = document.getElementById("list-form");
const listInput = document.getElementById("list-input");
const allLists = document.getElementById("lists")
const itemURL = 'http://localhost:3000/items'
//console.log(listForm);
//console.log(BASEURL) ^(control) + option + L

function fetchLists() {

  fetch(listURL)
  .then(resp => resp.json())
  .then(lists => lists.forEach(list => renderList(list.name)))

}

listForm.addEventListener("submit", submitList);

function submitList() {
    event.preventDefault();

    const configObj = {
        method: "POST",
        headers:{
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            content: listInput.value
        })
    }

    fetch(listURL, configObj);

    renderList(listInput.value);
}

function renderList(list) {
  //console.log(listInput.value);
  const li = document.createElement('li');

  const p = document.createElement('p');
  p.innerText = list;

  li.appendChild(li);

  const itemForm = document.createElement('form');
  itemForm.addEventListener("submit", renderItem);

  const itemList = document.createElement('ul');

  allLists.appendChild(li);

  listForm.reset();
}

function submitItem(item) {
  event.preventDefault();

    const configObj = {
        method: "POST",
        headers:{
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            content: item
        })
    }

    fetch(itemURL, configObj);

    renderItem(itemInput.value);
}

//sti
setInterval(() => {
    
}, 1000)

//sto
setTimeout(() => {
    
}, 1000)
//command+arrow right => jump to end of line
//command+arrow left => jump to beg of line
//command+shift+arrow right => select entire line

//clg
//console.log(object)

function renderItem(e) {
    e.preventDefault();
    const itemInput = e.target.children[0].value;
    const itemList = e.target.nextElementSibling;

    //console.log(itemInput);
    const li = document.createElement('li');
    li.innerText = itemInput;
    itemList.appendChild(li);
    
    submitItem(itemInput);

    e.target.reset();

}

//OO in JS
// class Person {
//     constructor(name, age) {
//       this.name = name;
//       this.age = age;
//     }
class List {
    constructor(name) {
      this.name = name;
    }
}

class Item {
  constructor(content) {
    this.content = content;
  }
}
//let evan = new Person('Evan', 34);

// render post to the DOM