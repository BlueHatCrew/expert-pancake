let listName = getCookie("listName") || "My To-Do List";
let todoItems = getCookie("todoItems") ? JSON.parse(getCookie("todoItems")) : [];

const listNameElement = document.getElementById("listName");
const todoList = document.getElementById("todoList");
const newItemInput = document.getElementById("newItemInput");
const addButton = document.getElementById("addButton");

listNameElement.textContent = listName;
renderTodoItems();

addButton.addEventListener("click", addItem);

function addItem() {
  const newItemText = newItemInput.value.trim();

  if (newItemText !== "") {
    todoItems.push({ text: newItemText, completed: false });
    saveTodoItems();
    renderTodoItems();
    newItemInput.value = "";
  }
}

function removeItem(index) {
  todoItems.splice(index, 1);
  saveTodoItems();
  renderTodoItems();
}

function toggleCompleted(index) {
  todoItems[index].completed = !todoItems[index].completed;
  saveTodoItems();
  renderTodoItems();
}

function renderTodoItems() {
  todoList.innerHTML = "";

  todoItems.forEach((item, index) => {
    const listItem = document.createElement("li");

    const checkmark = document.createElement("span");
    checkmark.className = `checkmark ${item.completed ? "completed" : ""}`;
    checkmark.innerHTML = "&#10004;";
    checkmark.addEventListener("click", () => toggleCompleted(index));

    const itemText = document.createElement("span");
    itemText.textContent = item.text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => removeItem(index));

    listItem.appendChild(checkmark);
    listItem.appendChild(itemText);
    listItem.appendChild(deleteButton);

    todoList.appendChild(listItem);
  });
}

function saveTodoItems() {
  setCookie("todoItems", JSON.stringify(todoItems), 7);
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    if (cookie[0] === name) {
      return cookie[1];
    }
  }
  return "";
}

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
