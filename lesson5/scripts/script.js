const __button = document.querySelector("button");
const __input = document.querySelector("#favchap");
const __list = document.querySelector("#list");

let item;
let button;

__button.addEventListener("click", () => {
    if(/[a-z]/i.test(__input.value) == false || /[0-9]/.test(__input.value) == false){
        alert("Not a valid Chapter format")
        __input.focus();
        return
    }

    item = document.createElement("li")
    button = document.createElement("button")

    button.textContent = "❌";
    item.textContent = __input.value;

    item.appendChild(button);
    
    button.addEventListener("click", (e) => {
        removeEventListener("click", e.target)
        e.target.parentElement.remove();
        __input.value = '';
        __input.focus();
    });

    __list.appendChild(item);
    __input.value = '';
    __input.focus();

});