

const changeCheckState = (e, todoContent) => {
    if (e.target.checked === true) {
        todoContent.readOnly = true
        todoContent.classList.add('todo_check')
    } else {
        todoContent.classList.remove('todo_check')
    }
}

const removeTodo = (e) => {
    todo = e.target.parentNode
    document.querySelector(".todo_list").removeChild(todo)
}

const addTodo = (input) => {
    const todo = document.createElement('li'),
    todoCheckBox = document.createElement('input'),
    todoContent = document.createElement('input'),
    todoRemoveButton = document.createElement('button'),
    todoEditButton = document.createElement('button')
    todoCheckBox.type = "checkbox"
    todoCheckBox.classList.add('check')
    todoCheckBox.addEventListener("click", (e) => {
        changeCheckState(e, todoContent)
    })
    todoContent.readOnly = true
    todoContent.value = input.value
    todoContent.addEventListener('keypress', (e) => {
        if (e.key === 'Enter')
        readOnlyState = (todoContent.readOnly === true)
        todoContent.readOnly = readOnlyState ? false : true
    })
    todoRemoveButton.innerText = "✖"
    todoRemoveButton.addEventListener("click", removeTodo)
    todoRemoveButton.classList.add('remove')
    todoEditButton.innerText = "편집"
    todoEditButton.classList.add('edit')
    todoEditButton.addEventListener("click", () => {
        readOnlyState = (todoContent.readOnly === true)
        todoContent.readOnly = readOnlyState ? false : true
        todoContent.focus()
    })
    todo.append(todoCheckBox, todoContent, todoEditButton, todoRemoveButton)
    document.querySelector(".todo_list").prepend(todo)
}

const onSubmit = (e) => {
    e.preventDefault()
    let input = e.target.querySelector(".todo_input")
    if (input.value !== "") {
        addTodo(input)
        input.value = ""
        input.focus()
    } 
}

function init() {
    document.querySelector("form").addEventListener("submit", onSubmit)
}

init()