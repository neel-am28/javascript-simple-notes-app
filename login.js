const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const user_id = document.getElementById('user_id');

form.addEventListener("submit", function (e) {
    e.preventDefault();
    validateCredentials();
});

function validateCredentials() {
    let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    let txt = username.value;
    let pass = password.value;

    for (let i = 0; i < users.length; i++) {
        if (txt.indexOf(users[i].username) != -1 && pass.indexOf(users[i].password) != -1) {
            user_id.value = i;
            // create session variable
            sessionStorage.setItem('USER_ID', user_id.value);
            window.location.assign("index.html");
        } else {
            setMessage("Please enter correct login details");
        }
    }
}

function setMessage(msg) {
    const small = document.querySelector("small");
    small.className = "error";
    small.innerText = msg;
}