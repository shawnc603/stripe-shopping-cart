if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    document.getElementsByClassName('btn-payment')[0].addEventListener('click', paymentClicked);
}

var stripeHandler = StripeCheckout.configure({
    key: stripePublicKey,
    locale: 'auto',
    token: function(token) {
        var items = [];
        var ddllist = document.getElementById("ddlist");
        var amount = ddllist.options[ddllist.selectedIndex].text;
        var email= document.getElementById("email");
        var fullname= document.getElementById("fullname");
    
        if(ddllist.selectedIndex===0){
            swal('Please make a valid selection');
            return;
        } else if (ddllist.selectedIndex===1){
            amount = amount.replace('Membership Annual Fee $', '');
        } else if (ddllist.selectedIndex===2){
            amount = amount.replace('Weekend School - 9 month Fee $', '');
        }
     
        items.push({
            fullname: fullname,
            amount: amount,
            email: email
        });
        fetch('/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                stripeTokenId: token.id,
                items: items
            })
        }).then(function(res) {
            return res.json();
        }).then(function(data) {
            //swal(data.message);
            var message = data.message;
            var email = data.email;
            var transId = data.transId;
            //redirect to confirmation page
            window.location.href = '/confirmation?message=' + message + '&email=' + email + '&transId=' + transId;
        }).catch(function(error) {
            console.error(error);
        });
    }
});

function paymentClicked() {

    var ddllist = document.getElementById("ddlist");
    var amount = ddllist.options[ddllist.selectedIndex].text;
    if(ddllist.selectedIndex===0){
        swal('Please make a valid selection');
        return;
    } else if (ddllist.selectedIndex===1){
        amount = amount.replace('Membership Annual Fee $', '');
    } else if (ddllist.selectedIndex===2){
        amount = amount.replace('Weekend School - 9 month Fee $', '');
    }

    var amount = parseFloat(amount) * 100;
    stripeHandler.open({
        amount: amount
    });
}

function OnFocusOut(){
    let requestPath;
    var e = document.getElementById("ddlist");
    // e.options[e.selectedIndex].text;
    if(e.selectedIndex===1){
        requestPath = '/checkMemberById';
        if(!CheckRegistration(requestPath)){
            swal('Member not registered!. Please register before making a payment.');
            return;
        } else {
            swal('Member  registered!');
        }
    }else if(e.selectedIndex===2){
        requestPath = '/checkEducationById';
        if(!CheckRegistration(requestPath)){
            swal('Parent not registered!. Please register before making a payment.');
            return;
        } else {
            swal('Parent  registered!');
        }
    }
}

function CheckRegistration(requestPath){
    var items = [];
    items.push({
        email: document.getElementById("email").value
    });
    console.log('requestpath:  ' + requestPath );
    fetch(requestPath, {
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
        console.log('message ' + data.message);
        return (data.status === 1)? true: false;
    }).catch(function(error) {
        console.error(error);
    });
}