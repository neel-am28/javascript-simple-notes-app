// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const id = urlParams.get('userid');

let u_id = "";
// access session variable
if (sessionStorage.getItem("USER_ID")) {
    u_id = sessionStorage.getItem("USER_ID");
    showNotesById(u_id);
}
let notesObj = JSON.parse(localStorage.getItem("notes")) || [];
let match = false;
for (let i = 0; i < notesObj.length; i++) {
    // check if the logged in user's id matches with the user id saved in notes array
    if (u_id == notesObj[i].userid) {
        match = true;
        showNotesById(u_id);
    }
}
// showNotes(u_id);
let addBtn = document.getElementById("addBtn");
let logout = document.getElementById("logout");
logout.addEventListener("click", function (e) {
    e.preventDefault();
    sessionStorage.removeItem('USER_ID');
    window.location.assign("login.html");
});


addBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    if (addTxt.value == "") {
        showAlert("Please fill out all the fields!", "secondary");
    } else {
        let notesObj = JSON.parse(localStorage.getItem("notes")) || [];
        let myObj = {
            title: addTitle.value,
            text: addTxt.value,
            userid: u_id
        }
        notesObj.push(myObj);
        localStorage.setItem("notes", JSON.stringify(notesObj)); // notesObj is an object, so we need to convert it into string first, because local storage only accepts string values
        addTxt.value = "";
        addTitle.value = "";
        showAlert("Note Added!", "success");
        showNotesById(u_id);
    }

});

// function to display sticky notes
function showNotesById(user_id) {
    let notesObj = JSON.parse(localStorage.getItem("notes")) || [];    
    let html = "";
    let notesElm = document.getElementById("notes");

    for (let i = 0; i < notesObj.length; i++) {
        if (notesObj[i].userid == user_id) {
            let result;
            let description = notesObj[i].text;
            let maxLength = 40;
            if (description.length > 40) {
                result = description.substring(0, maxLength) + '...';
            } else {
                result = description;
            }
            html += `<div class="noteCard card my-2 mx-5 mx-auto" style="width:45%;">
                    <div class="card-body rounded">
                        <h5 class="card-title text-white">${notesObj[i].title} </h5>
                        <p class="card-text text-white">${result}</p>
                        <button id="${i}" class="btns delete text-center" onclick="deleteNote(this.id)" ><i class="fa fa-trash-o" aria-hidden="true"></i>
                        </button>
                        <button id="${i}" class="btns edits text-center" onclick="editNote(this.id)" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>`;
                
            notesElm.innerHTML = html;            
        }
        else {
            notesElm.innerHTML = `<div class="col-md-6 alert alert-warning container-fluid mx-auto" role="alert">
                                    Nothing to show. Please use <a href="#" class="alert-link">'Add a Note'</a> button to add notes!'
                                    </div>`;
        }
    } 
}
// funciton to display alerts
function showAlert(msg, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className} font-weight-bolder col-md-6 mx-auto`;
    div.id = `alert`;
    div.appendChild(document.createTextNode(msg));
    const main = document.querySelector('#main');
    const note = document.querySelector('.note');
    main.insertBefore(div, note);

    // Dismiss after 2 seconds
    setTimeout(function () {
        document.getElementById('alert').remove()
    }, 2000);
}

// function to delete a note
function deleteNote(index) {
    let notesObj = JSON.parse(localStorage.getItem("notes")) || [];
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showAlert("Note Deleted!", "danger");
    showNotesById(u_id);
}

// function to edit note(get the selected note's text inside textarea )
function editNote(index) {    
    let modalContent = document.getElementById("openModal");
    let html = "";
    html += `<div class="form-group">
                <h5 class="title text-dark">Edit title</h5>
                <input type="text" class="form-control" id="editTitle">
            </div>
            <button type="button" class="close cross" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
            <div class="form-group">
                <h5 class="card-title text-dark">Edit your note</h5>
                <textarea class="form-control" id="editTxt" rows="5" required></textarea>
            </div>
            <button class="btn btn-info updateButn" id="${index}" onclick="UpdateButn(this.id)" data-dismiss="modal">Update Note</button>`;

    modalContent.innerHTML = html;

    let notesObj = JSON.parse(localStorage.getItem("notes")) || [];
    let elementTitle = notesObj[index].title;
    let elementText = notesObj[index].text;
    document.getElementById("editTxt").value = elementText;
    document.getElementById("editTitle").value = elementTitle;
}

// function to activate 'update note' button
function UpdateButn(index) {
    let editTitle = document.getElementById('editTitle');
    let editTxt = document.getElementById("editTxt")
    let notesObj = JSON.parse(localStorage.getItem("notes")) || [];
    let myObj = {
        title: editTitle.value,
        text: editTxt.value,
        userid: u_id
    }
    notesObj.splice(index, 1, myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    editTxt.value = "";
    editTitle.value = "";
    showAlert("Note Updated!", "primary");
    showNotesById(u_id);
}

//  functionality to activate search box
let search = document.getElementById("searchTxt");
search.addEventListener("keyup", function (e) {
    let inputVal = e.target.value.toLowerCase();
    let noteCards = document.getElementsByClassName("noteCard");
    let noShow = document.getElementById("noShow");
    let noteArray = Array.from(noteCards);
    let resultsFound = false;

    for (let i = 0; i < noteArray.length; i++) {
        let cardTxt = noteArray[i].getElementsByTagName("h5")[0].innerText;
        if (cardTxt.indexOf(inputVal) != -1) {
            noteArray[i].style.display = "block";
            resultsFound = true;
        } else {
            noteArray[i].style.display = "none";
        }

        if (!resultsFound) {
            noShow.style.display = "block";
        } else {
            noShow.style.display = "none";
        }
    }
});