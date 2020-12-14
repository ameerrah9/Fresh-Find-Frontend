class List {
    constructor(id, name) {
      this.id = id; // to grab same id from my data base
      this.name = name;
    }

        
    // instance method thats going to render the object to the DOM

    renderList() {

        let listsDiv = document.getElementById("lists-container");
        
        listsDiv.innerHTML +=

        `
        <div id="lists">
            <h3>Market Inventory Lists For:</h3>
            <li>${this.name}</li>
        </div>
        <button class="btn btn-danger" data-id=${this.id} onclick="deleteList()">Clear List</button>
        `
    }
}
        //         //console.log(listInput.value);
//         const li = document.createElement('li');
        
//         li.dataset.id = list.id
        
//         const p = document.createElement('p');
//         p.innerText = list.name;
      
//         li.appendChild(li);
      
//         const itemForm = document.createElement('form');
//         itemForm.addEventListener("submit", renderItem);
      
//         const itemList = document.createElement('ul');
      
//         allLists.appendChild(li);
      
//         listForm.reset();
//       }
      


// const list = new List()
