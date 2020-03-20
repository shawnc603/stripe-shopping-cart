if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    document.getElementsByClassName('btn-register')[0].addEventListener('click', educationClicked);
}

function educationClicked() {
    var parentItems = [];
    var childrenItems = [];
    childrenItems.push(
        {
            childFullName: document.getElementById("child1FullName").value,
            childAge: document.getElementById("child1Age").value,
            child1Payment: '0'
        },
        {
            childFullName: document.getElementById("child2FullName").value,
            childAge: document.getElementById("child2Age").value,
            child2Payment: '0'
        },
        {
            childFullName: document.getElementById("child3FullName").value,
            childAge: document.getElementById("child3Age").value,
            child3Payment: '0'

        },
        {
            childFullName: document.getElementById("child4FullName").value,
            childAge: document.getElementById("child4Age").value,
            child4Payment: '0'
        });

    parentItems.push({
        parentFirstName: document.getElementById("parentFirstName").value,
        parentLastName: document.getElementById("parentLastName").value,
        parentEmail: document.getElementById("parentEmail").value,
        parentPhoneNumber: document.getElementById("parentPhoneNumber").value,
        children: childrenItems
        // child1FullName: document.getElementById("child1FullName").value,
        // child1Age: document.getElementById("child1Age").value,
        // child1Payment: '0',
        // child2FullName: document.getElementById("child2FullName").value,
        // child2Age: document.getElementById("child2Age").value,
        // child2Payment: '0',
        // child3FullName: document.getElementById("child3FullName").value,
        // child3Age: document.getElementById("child3Age").value,
        // child3Payment: '0',
        // child4FullName: document.getElementById("child4FullName").value,
        // child4Age: document.getElementById("child4Age").value,
        // child4Payment: '0'
    });

    //alert('JSON: ' + JSON.stringify(parentItems));

    fetch('/education', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            items: parentItems
        })
    }).then(function(res) {
        return res.json();
    }).then(function(data) {
        swal(data.message);
        //redirect to confirmation page
    }).catch(function(error) {
        console.error(error);
    });
}