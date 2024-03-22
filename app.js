// SELECTEURS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
// ECOUTEURS
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("input", filterTodo);

//FUNCTIONS
function addTodo(event){
    event.preventDefault();
    // console.log("Hello");
    // Todo DIV
    const todoDIV = document.createElement("div");
    todoDIV.classList.add("todo");
    // Créer le li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDIV.appendChild(newTodo);
    // ajouter la todo au localStorage
    saveLocalTodos(todoInput.value);

// Button check
const completeButton = document.createElement("button");
completeButton.innerHTML = '<i class="fas fa-check"></i>';
completeButton.classList.add("complete-btn");
todoDIV.appendChild(completeButton);

// Button Supprimer
const trashButton = document.createElement("button");
trashButton.innerHTML = '<i class="fas fa-trash"></i>';
trashButton.classList.add("trash-btn");
todoDIV.appendChild(trashButton);

// Ajouter voter TODO A TODO-LIST
todoList.appendChild(todoDIV);
todoInput.value = "";
}

function deleteCheck(e){
 const item = e.target;
//  Delete Todo
if(item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function (){
        todo.remove();
    })
  }
  //CHECK  Mark
  if(item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }

}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;

            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else{
                    todo.style.display = "none";
                }
                break;

            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else{
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    // ckecker si ilya des items existants
    let todos;
    if (localStorage.getItem("todos") === null){
         todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos(){

 let todos;
    if (localStorage.getItem("todos") === null){
         todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(function(todo){
        const todoDIV = document.createElement("div");
        todoDIV.classList.add("todo");
        // Créer le li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDIV.appendChild(newTodo);
        // Button check
        const completeButton = document.createElement("button");
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.classList.add("complete-btn");
        todoDIV.appendChild(completeButton);
        
        // Button Supprimer
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDIV.appendChild(trashButton);
        
        // Ajouter voter TODO A TODO-LIST
        todoList.appendChild(todoDIV);  
    })
}

function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem("todos") === null){
         todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
} 
