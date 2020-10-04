const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text); // (key, value) in localStorage
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value; // your name in input tag
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
     form.classList.add(SHOWING_CN);
     form.addEventListener('submit',handleSubmit);
}

function paintGreeting(text) { // Hello user!
    form.classList.remove(SHOWING_CN); 
    greeting.classList.add(SHOWING_CN); 
    greeting.innerHTML = `Hello ${text}`;
}

function loadName() {
    const currentUser = localStorage.getItem (USER_LS);
    if(currentUser === null) { // userName doesn't exist in localStorage
        askForName();
    } else { // userName exists in localStorage
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();