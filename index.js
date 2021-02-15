const todoForm = document.querySelector(".js-todo-form");
const todoInput = todoForm.querySelector("input");
const pendingList = document.querySelector(".js-pending");
const finishedList = document.querySelector(".js-finished");

const PENDING_LS = "pending";
const FINISHED_LS = "finish";

let PENDINGS = [];
let FINISHEDS = [];

function paintPending(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const finBtn = document.createElement("button");
    const span = document.createElement("span");
    span.innerText = text;
    delBtn.innerText = "❌";
    finBtn.innerText = "✔";
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(finBtn);
    pendingList.appendChild(li);
}

function loadPending(){
    const pendings = localStorage.getItem(PENDING_LS);
    if(pendings !== null){

    }
}

function loadFinished(){
    const finisheds = localStorage.getItem(FINISHED_LS);
    if(finisheds !== null){

    }
}

function handleSubmit(event){
    event.preventDefault();
    const inputText = todoInput.value;
    paintPending(inputText);
    todoInput.value = "";
}

function init() {
    loadPending();
    loadFinished();
    todoForm.addEventListener("submit", handleSubmit);
}

init();