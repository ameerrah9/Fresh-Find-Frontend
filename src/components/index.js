const listsURL = 'http://localhost:3000/lists'
const itemsURL = 'http://localhost:3000/items'
const listForm = document.getElementById("create-list-form")
const listInput = document.getElementById("list-input")
const listUL = document.getElementById("list-ul")
const searchButton = document.getElementById("sort")
const itemList = document.createElement('ul')

List.getLists()

listForm.addEventListener("submit", List.postLists)

searchButton.addEventListener("click", () => List.sortList())


// async function sortList() {
//     fetch(listsURL)
//     .then(resp => resp.json())
//     .then(lists => {        
//         lists.map(list => new List(list.data))
//         return lists
//     })
//     .then(data => {
//         console.log(data)
//         // return data.sort((a, b) => {
//         //     const nameA = a.name.toUpperCase(); // ignore upper and lowercase
//         //     const nameB = b.name.toUpperCase(); // ignore upper and lowercase
//         //     if (nameA < nameB) {
//         //         return -1;
//         //     }
//         //     if (nameA > nameB) {
//         //         return 1;
//         //     }
//         //     return 0;
//         // })
//     })
// }

///document.addEventListener("DOMContentLoaded", (e) => {console.log(sortList())})
