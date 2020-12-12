class Item {
    constructor(id, content) {
      this.id = id; // to grab same id from my data base
      this.content = content;
    }

    renderItem() {

        let itemsDiv = document.getElementById("items-container");
        
        itemsDiv.innerHTML +=

        `
        <ul>${this.content}</ul>
        `
    }
}

// function submitItem(item, postId) {
// event.preventDefault();

//     const configObj = {
//         method: "POST",
//         headers:{
//             "Content-type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify({
//             content: item,
//             list_id: listId
//         })
//     }

//     fetch(itemURL, configObj);

//     renderItem(itemInput.value);
// }