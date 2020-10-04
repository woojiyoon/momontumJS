const toDoForm = document.querySelector('.js-toDoForm'),
    toDoInput = toDoForm.querySelector('input'),
    toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDos';

let toDos = []; // array for adding my toDos input

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos; // toDos is old one, cleanToDos is new one.
    saveToDos();
}

function saveToDos() { // save toDos array in localStorage
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));// stringify changes object(toDos) into string
    // localStorage only accepts string. 
}

function paintToDo(text) {
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const span = document.createElement('span');
    const newId = toDos.length + 1;
    delBtn.innerText = "❌"; // command+control+spacebar(emoji in mac)
    delBtn.addEventListener('click', deleteToDo);
    span.innerHTML = " " + text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj); // push means adding something inside array(toDos)
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value=""; // delete after entering somethng in input
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos); // JSON works for changing object into string and vice versa.
        parsedToDos.forEach(function(toDo) { // forEach is for functions of array,object,string
            paintToDo(toDo.text);
        });
    }
    
}

function init() {
    loadToDos();
    toDoForm.addEventListener('submit', handleSubmit);
}

init();