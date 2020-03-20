if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    document.getElementsByClassName('btn-search')[0].addEventListener('click', searchClicked);
}

function searchClicked() {
    var searchItem = [];
    searchItem.push({
        email: document.getElementById("email").value
    });

    fetch('/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            searchItem: searchItem
        })
    }).then(function(res) {
        return res.json();
    }).then(function(data) {
        CreateTableFromJSON(data);
    }).catch(function(error) {
        console.error(error);
    });
}

function CreateTableFromJSON(data) {
   //alert(JSON.stringify(data));
    $("#jsGrid").jsGrid({
        height: "200px",
        width: "100%",
 
        sorting: true,
        paging: true,
 

        data: data,
 
        fields: [
            { name: "FirstName", type: "text", width: 150 },
            { name: "LastName", type: "text", width: 150 },
            { name: "Email", type: "text", width: 200 },
            { name: "PhoneNumber", type: "text", width: 150 },

            { type: "control" }
        ]
    });
}
