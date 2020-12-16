class List {
    constructor(list) {
        this.id = list.id; // to grab same id from my data base
        this.name = list.attributes.name;
        List.all.push(list);
    }
    debugger
    renderListInfo () {
        return 
        `  
        <div data-id=${this.id}>
          <h3>${this.attributes.name}</h3>
          <ul id="lists">${this.attributes.items.map(myItem).join("")}</ul>
          <a href="#" class="my-4 text-left"><i onclick="deleteList(${this.id})"class="fa fa-trash-alt">Delete List</i></a>
          <a href="#" class="my-4 text-left"><i onclick="editList(${this.id})"class="fa fa-pencil-alt">Edit List</i></a>
        </div>
        <br><br>;
        `
        document.querySelector("#lists-container").innerHTML += listMarkup
    }
}

List.all = [];