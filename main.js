const title = document.getElementById("title");
const noteInput = document.querySelector("#notes");
const btn = document.querySelector("#btn");
const noteParent = document.querySelector(".note");
const allNotes = document.querySelector("#allNoteDiv");
const main = document.querySelector("main");

let notesArr = JSON.parse(localStorage.getItem("notes")) || [];

btn.addEventListener("click", addNotes);
allNotes.addEventListener("click", viewNote);

function savelocalStorage() {
  localStorage.setItem("notes", JSON.stringify(notesArr));
}

function addNotes() {
  if (title.value.trim() === "" || noteInput.value.trim() === "") {
    alert("Input fields Should not be Empty");
    return;
  }
  let id = crypto.randomUUID();
  notesArr.push({ id: id, title: title.value, note: noteInput.value });
  savelocalStorage();
  title.value = "";
  noteInput.value = "";
  recentNotes();
}

function viewNote() {
  main.innerHTML = "";
  setTimeout(() => {
    main.setAttribute("class", "viewMode");
  }, 10);
  notesArr.forEach((e) => {
    let val = notes(e);
    main.appendChild(val);
  });
}

function recentNotes() {
  let recent = notesArr.slice(-4).reverse();
  noteParent.innerHTML = "";
  recent.forEach((e) => {
    let val = notes(e);
    noteParent.appendChild(val);
  });
}

recentNotes();

function findId(e) {
  return e.target.closest(".noteholder")?.id;
}

function edit(e) {
  let id = findId(e);
  if (!id) return;
  let note = notesArr.find((note) => note.id === id);
  if (note) {
    let div = editVAl(note);
    document.body.appendChild(div);
  }
}

function del(e) {
  let id = findId(e);
  notesArr = notesArr.filter((note) => note.id !== id);
  savelocalStorage();
  if (main.classList.contains("viewMode")) {
    viewNote();
  }
  recentNotes();
}

function editVAl(val) {
  let divEl = document.createElement("div");
  divEl.setAttribute("id", "mainDiv");
  let crossDiv = document.createElement("div");
  crossDiv.setAttribute("class", "cros");

  let span = document.createElement("span");
  span.innerHTML = "&#10005";
  span.addEventListener("click", () => {
    divEl.remove();
  });
  let innerDiv = document.createElement("div");
  innerDiv.setAttribute("class", "inputs");
  innerDiv.setAttribute("id", "inner");

  let input = document.createElement("input");
  input.type = "text";
  input.value = val.title;
  input.placeholder = "Update Title";

  let textArea = document.createElement("textarea");
  textArea.placeholder = "Update Note...";
  textArea.value = val.note;

  let buttonEl = document.createElement("button");
  buttonEl.innerHTML = "Update Note";
  buttonEl.setAttribute("id", "updateBtn");
  buttonEl.addEventListener("click", () => {
    val.title = input.value;
    val.note = textArea.value;
    if (input.value === "" || textArea.value === "") {
      alert("Input  Fields Should Not be Empty");
      return;
    }
    savelocalStorage();
    title.value = "";
    noteInput.value = "";
    divEl.remove();
    recentNotes();
    if (main.classList.contains("viewMode")) {
      viewNote();
    }
  });
  crossDiv.appendChild(span);
  innerDiv.appendChild(input);
  innerDiv.appendChild(textArea);
  innerDiv.appendChild(buttonEl);
  divEl.appendChild(crossDiv);
  divEl.appendChild(innerDiv);
  return divEl;
}

function notes(e) {
  let divEl = document.createElement("div");
  divEl.classList.add("noteholder");
  divEl.setAttribute("id", `${e.id}`);

  let spanDiv = document.createElement("div");
  spanDiv.classList.add("trash");

  let spanEl = document.createElement("span");
  spanEl.setAttribute("id", "span");
  spanEl.innerText = e.title;

  let trEditBtn = document.createElement("div");
  trEditBtn.className = "editHolder";

  let editBtn = document.createElement("button");
  editBtn.setAttribute("id", "editBtn");
  editBtn.addEventListener("click", (e) => edit(e));

  let editicon = document.createElement("img");
  editicon.src = "./src/draw.png";
  editicon.id = "editIcon";

  let trashBtn = document.createElement("button");
  trashBtn.setAttribute("id", "trashBtn");
  trashBtn.addEventListener("click", (e) => del(e));

  let imgEl = document.createElement("img");
  imgEl.src = "./src/trash.png";

  imgEl.setAttribute("id", "trashIcon");
  imgEl.setAttribute("alt", "delLogo");

  let noteDiv = document.createElement("div");
  noteDiv.setAttribute("id", "holder");

  let noteText = document.createElement("p");
  noteText.setAttribute("id", "p");
  noteText.innerText = e.note;

  spanDiv.appendChild(spanEl);

  trashBtn.appendChild(imgEl);
  trEditBtn.appendChild(trashBtn);
  spanDiv.appendChild(trEditBtn);
  editBtn.appendChild(editicon);
  trEditBtn.appendChild(editBtn);

  divEl.appendChild(spanDiv);
  noteDiv.appendChild(noteText);
  divEl.appendChild(noteDiv);
  return divEl;
}
