

const removeTodo = (e) => {
    todo = e.target.parentNode
    document.querySelector(".todo_list").removeChild(todo)
}

const addTodo = (input) => {
    const todo = document.createElement('li'),
    todoContent = document.createElement('input'),
    todoRemoveButton = document.createElement('button'),
    todoEditButton = document.createElement('button')
    todoContent.readOnly = true
    todoContent.value = input.value
    todoRemoveButton.innerText = "X"
    todoRemoveButton.addEventListener("click", removeTodo)
    todoEditButton.innerText = "편집"
    todoEditButton.addEventListener("click", () => {
        readOnlyState = (todoContent.readOnly === true)
        todoContent.readOnly = readOnlyState ? false : true
    })
    todo.append(todoRemoveButton, todoEditButton, todoContent)
    document.querySelector(".todo_list").appendChild(todo)
}

const onSubmit = (e) => {
    e.preventDefault()
    let input = e.target.querySelector(".todo_input")
    if (input.value !== "") {
        addTodo(input)
        input.value = ""
    } 
}

function init() {
    document.querySelector("form").addEventListener("submit", onSubmit)
}

init()