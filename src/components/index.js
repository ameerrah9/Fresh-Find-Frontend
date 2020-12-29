const listsURL = 'http://localhost:3000/lists'
const itemsURL = 'http://localhost:3000/items'
const listForm = document.getElementById("create-list-form")
const listInput = document.getElementById("list-input")
const listUL = document.getElementById("list-ul")

listForm.addEventListener("submit", List.postLists)

List.getLists()
