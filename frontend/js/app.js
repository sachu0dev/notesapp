import NotesAPI from './NotesAPI.js';
const colors = ['pink', "blue", "green", "yellow", "red"];
// NotesAPI.deleteNote(703830628);
// console.log(NotesAPI.getAllNotes());
const notesList = document.querySelector(".notes-preview");
const notesTitleInput = document.querySelector(".notes-title");
const notesBodyInput = document.querySelector(".notes-body");
const addNote = document.querySelector(".add-note-btn");
const saveNoteBtn = document.querySelector(".save-btn");
const deleteNoteBtn = document.querySelector(".delete-btn");
const createNote = document.querySelector(".creat-note");
const inputContainer = document.querySelector(".input-container");
const welcome = document.querySelector(".welcome-container");
const clickArow = document.querySelector(".click-arrow");
const loginBtn = document.querySelector(".login-btn");
const signupBtn = document.querySelector(".signup-btn");
const userLoged = document.querySelector('.user-btn-container');

let isInedit = {
  editFlag: false,
  editId: null,
}
// event listeners
window.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    saveNoteBtn();
  }
});
window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem('token');
  if (token) {
    userLoged.classList.add('hide');
  }
})
window.addEventListener("DOMContentLoaded", showNotes);
addNote.addEventListener("click", createNewNote);
saveNoteBtn.addEventListener("click", saveNote);
deleteNoteBtn.addEventListener("click", deleteNote);
// functions
async function showNotes() {
  if(NotesAPI.getAllNotes().length === 0){
    changeMain("remove");
  }
  const notes = await NotesAPI.getAllNotes();
  notesList.innerHTML = "";
  notes.forEach(element => {
    notesList.innerHTML += `
    <div class="note-container ${colors[Math.floor(Math.random() * colors.length)]}" data-id="${element._id}">
      <div class="note-small-title">${element.title}</div>
      <div class="note-small-body">
        ${element.description}
      </div>
    </div>
    `;
  });
  const noteBoxes = document.querySelectorAll('.note-container');
  notesList.addEventListener("click", function(event) {
    const noteBox = event.target.closest('.note-container');
    if (noteBox) {
      editNote(noteBox);
    }
  });
  
}

async function saveNote() {
  changeMain("remove");
  const note = {
    title: notesTitleInput.value,
    description: notesBodyInput.value,
  };

  if (isInedit.editFlag) {
    note._id = isInedit.editId;
  }
  console.log(note)

  await NotesAPI.saveNote(note);
  notesTitleInput.value = "";
  notesBodyInput.value = "";
  showNotes();
  isInedit.editFlag = false;
}


async function editNote(event) {
    changeMain("add");
  const notes = await NotesAPI.getAllNotes();
  console.log(event)

  const noteBox = event;
  const id = noteBox.dataset.id;

  notes.forEach(note => {
    if (note._id == id) {
      notesTitleInput.value = note.title;
      notesBodyInput.value = note.description;
      isInedit.editFlag = true;
      isInedit.editId = note._id;
    }
  });
}
async function deleteNote() {
  changeMain("remove");
  await NotesAPI.deleteNote(isInedit.editId);
  isInedit.editId = null;
  notesTitleInput.value = "";
  notesBodyInput.value = "";
  showNotes();
  isInedit.editFlag = false;
}
function createNewNote(){
  if(notesTitleInput.value === "" || notesBodyInput.value === ""){

  } else {

    saveNote();
  }
    createNote.classList.remove("show-welcome");
    welcome.classList.remove("show-welcome");
    clickArow.classList.remove("show-welcome");
    inputContainer.classList.add("show-welcome");
}

function changeMain(options) {
  if(options === "add"){
    createNote.classList.remove("show-welcome");
    welcome.classList.remove("show-welcome");
    clickArow.classList.remove("show-welcome");
    inputContainer.classList.add("show-welcome");
  } else if(options === "remove"){
    createNote.classList.add("show-welcome");
    welcome.classList.add("show-welcome");
    clickArow.classList.add("show-welcome");
    inputContainer.classList.remove("show-welcome");
  }
}

