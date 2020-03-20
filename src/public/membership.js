if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    document.getElementsByClassName('btn-register')[0].addEventListener('click', membershipClicked);
}

function membershipClicked() {
    var items = [];
    items.push({
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        payment: '0'
    });

    fetch('/membership', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            items: items
        })
    }).then(function(res) {
        return res.json();
    }).then(function(data) {
        swal(data.message);
        //redirect to confirmation page
        //window.location.href = '/payment';
    }).catch(function(error) {
        console.error(error);
    });
}