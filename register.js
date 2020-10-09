// swal("Hello world!");
// let store = JSON.parse(localStorage.getItem("registeredUsers")) || [];
// let txt = "vivek";
// for(let i = 0; i < store.length; i++){
//     // console.log(store[i].username);

//     if(txt.indexOf(store[i].username) != -1){
//         console.log(store[i].username + " does");    
//     }
//     else{
//         console.log(store[i].username + " doesn't");
//     }
// }

// let store = JSON.parse(localStorage.getItem("registeredUsers"));
// store.splice(4, 1);
// localStorage.setItem("registeredUsers", JSON.stringify(store));
// console.log(store);


const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const cpassword = document.getElementById('cpassword');

form.addEventListener("submit", function (e) {
    e.preventDefault();
    validateCredentials();
});

function sendData(successRate, count) {
    if (successRate === count) {

        let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
        let regisObj = {
            username: username.value,
            email: email.value,
            password: password.value,
            cpassword: cpassword.value
        }
        users.push(regisObj);
        localStorage.setItem("registeredUsers", JSON.stringify(users));

        swal("Good job, " + username.value.toUpperCase() + " !", "Registration successfull!", "success");

        setTimeout(function () {
            window.location.assign("login.html");
        }, 1000);
    } else {
        setTimeout(function () {
            window.location.reload();
        }, 1000);
    }
}

// if(sendData()){
//     window.location.assign("login.html");
// }
// else{
//     setTimeout( function () {
//         window.location.reload();}
//     , 1000 );
// }

// final data validation
function finalValidate() {
    let formData = document.getElementsByClassName("form-control");
    let count = formData.length - 1;
    for (var i = 0; i < formData.length; i++) {
        if (formData[i].className === "form-control success") {
            var successRate = 0 + i;
            sendData(successRate, count);
        } else {
            return false;
        }
    }
}
// Validate all credentials
function validateCredentials() {
    const usernameVal = username.value.trim();

    const emailVal = email.value.trim();
    const passwordVal = password.value.trim();
    const cpasswordVal = cpassword.value.trim();

    // Validate username
    if (usernameVal === "") {
        setErrorMsg(username, "Username cannot be blank");
    } else if (usernameVal.length <= 2) {
        setErrorMsg(username, "Please enter minimum 3 characters");
    } else {
        setSuccessMsg(username);
    }

    // Validate email
    if (emailVal === "") {
        setErrorMsg(email, "Email cannot be blank");
    } else if (!checkEmail(emailVal)) {
        setErrorMsg(email, "Not a valid email");
    } else {
        setSuccessMsg(email);
    }

    // Validate passworld
    if (passwordVal === "") {
        setErrorMsg(password, "Password cannot be blank");
    } else if (passwordVal.length < 5) {
        setErrorMsg(password, "Password should contain atleast 5 characters");
    } else {
        setSuccessMsg(password);
    }

    // Validate confirm password
    if (passwordVal === "") {
        setErrorMsg(password, "Password cannot be blank");
    } else if (passwordVal !== cpasswordVal) {
        setErrorMsg(password, "Passwords do not match");
    } else {
        setSuccessMsg(cpassword);
    }

    // sending data
    finalValidate();

}

// check if email is valid or not
function checkEmail(emailVal) {
    var atSymbol = emailVal.indexOf("@");
    if (atSymbol < 1) {
        return false;
    }
    var dot = emailVal.lastIndexOf(".");
    if (dot <= atSymbol + 2) {
        return false;
    }
    if (dot === emailVal.length - 1) {
        return false;
    }
    return true;
}

// set some error msg, if fields contain error
function setErrorMsg(input, msg) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    formControl.className = "form-control error";
    small.innerText = msg;
}

// set success msg, if fields are proper
function setSuccessMsg(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}