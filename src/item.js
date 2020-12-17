class Item {
    constructor(item) {
      this.list_id = item.list_id
      this.content = item.content
      this.id = item.id; // to grab same id from my data base
    }

  static createItem(e){
      e.preventDefault()
      const itemInput = e.target.children[0].value
      const itemList = e.target.nextElementSibling
      const listId = e.target.parentElement.dataset.id

      Item.submitItem(itemInput, itemList, listId)
  
      e.target.reset()
  }
  
  renderItem(itemList){
      const li = document.createElement('li')
      li.dataset.id = itemList.id
      li.innerText = itemList.content
  
      const deleteBtn = document.createElement('button')
      deleteBtn.innerText = "X"
      li.appendChild(deleteBtn)
      itemList.appendChild(li)
  
      const ul = document.getElementById("item-list")
      ul.append(li)
  }
  
  static submitItem() {
      fetch(listURL, {
          method: "POST",
          headers: {
              "Content-type": "application/json", 
              "Accept": "application/json"
          }, 
          body: JSON.stringify({
              name: name
          })
      }).then(resp => resp.json())
      .then(list => {
          list.forEach(renderItem())
      })
  }

}