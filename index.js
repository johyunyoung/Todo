const todoForm = document.querySelector(".js-todo-form");
const todoInput = todoForm.querySelector("input");
const pendingList = document.querySelector(".js-pending");
const finishedList = document.querySelector(".js-finished");

const PENDING_LS = "pending";
const FINISHED_LS = "finish";

let PENDINGS = [];
let FINISHEDS = [];

function savePendings(){
    localStorage.setItem(PENDING_LS, JSON.stringify(PENDINGS));
}

function saveFinisheds(){
    localStorage.setItem(FINISHED_LS, JSON.stringify(FINISHEDS));
}

function handleFinDel(event){
    const li = event.target.parentNode;
    finishedList.removeChild(li);
    const cleanFinisheds = FINISHEDS.filter(function(finished){
        return finished.id !== parseInt(li.id);
    })
    FINISHEDS = cleanFinisheds;
    saveFinisheds();
}

function handleFinBack(event){
    const li = event.target.parentNode;
    //move to pen and del
}

function handlePendingDel(event){
    const li = event.target.parentNode;
    pendingList.removeChild(li);
    const cleanPendings = PENDINGS.filter(function(pending){
        return pending.id !== parseInt(li.id);
    })
    PENDINGS = cleanPendings;
    savePendings();
}

function handlePendingFin(event){
    const li = event.target.parentNode;
    // move to fin and del
}

function paintFinished(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const backBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = PENDINGS.length + 1;
    span.innerText = text;
    delBtn.innerText = "❌";
    backBtn.innerText = "⏪";
    delBtn.addEventListener("click", handleFinDel);
    backBtn.addEventListener("click", handleFinBack);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(backBtn);
    li.id = newId;
    finishedList.appendChild(li);
    const finishedObj = {
        text: text,
        id: newId
    };
    FINISHEDS.push(finishedObj);
    saveFinisheds();
}

function paintPending(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const finBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = PENDINGS.length + 1;
    span.innerText = text;
    delBtn.innerText = "❌";
    finBtn.innerText = "✔";
    delBtn.addEventListener("click", handlePendingDel);
    finBtn.addEventListener("click", handlePendingFin);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(finBtn);
    li.id = newId;
    pendingList.appendChild(li);
    const pendingObj = {
        text: text,
        id: newId
    };
    PENDINGS.push(pendingObj);
    savePendings();
}

function loadPending(){
    const loadedPendings = localStorage.getItem(PENDING_LS);
    if(loadedPendings !== null){
        const parsedPendings = JSON.parse(loadedPendings);
        parsedPendings.forEach(function(pending){
            paintPending(pending.text);
        })
    }
}

function loadFinished(){
    const loadedFinisheds = localStorage.getItem(FINISHED_LS);
    if(loadedFinisheds !== null){
        const parsedFinisheds = JSON.parse(loadedFinisheds);
        parsedFinisheds.forEach(function(finished){
            paintFinished(finished.text);
        })
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