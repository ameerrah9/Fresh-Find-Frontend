class Item {
    constructor(item) {
      this.id = item.id; // to grab same id from my data base
      this.content = item.attributes.content;
      Item.all.push(this);
      debugger
    }

    renderItemInfo () {
      return 
      `
        <div data-id=${this.id}>
          <h3>${this.attributes.content}</h3>
          <button class="btn btn-light btn-sm" data-id=${this.id}>Edit</button>
          <button class="btn btn-light btn-sm" data-id=${this.id}>Delete</button>
        </div>
        <br><br>
      `;
      document.querySelector("#items-container").appendChild(itemMarkup)
    }
  }

  Item.all = [];