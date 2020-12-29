class ListsAdapter {

    postLists() {
        event.preventDefault()
        fetch(listsURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: listInput.value})
        })
        .then(resp => resp.json())
        .then(listData => {
            let newList = new List(listData.data)
            newList.createListCard()
        })
        .catch(err => alert(err))
    }
    
}