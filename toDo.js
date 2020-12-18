

let todos = []
const TODOS = "todos"

const saveStorage = () => {
    localStorage.setItem(TODOS, JSON.stringify(todos))
}

const changeCheckState = (e, todoContent) => {
    const checkState = e.target.checked
    todos.forEach(todo => {
        if (todo.id === parseInt(e.target.parentNode.id))
            todo.checked = checkState
    })
    console.log(todos)
    if (checkState === true) {
        todoContent.readOnly = true
        todoContent.classList.add('todo_check')
    } else {
        todoContent.classList.remove('todo_check')
    }
    saveStorage()
}

const removeTodo = (e) => {
    currentTodo = e.target.parentNode
    ul = document.querySelector(".todo_list")
    ul.removeChild(currentTodo)
    todos = todos.filter(todo => { return todo.id !== parseInt(currentTodo.id)})
    for(let i=0; i < todos.length; i++) {
        todos[i].innerHtml = `<li id=${i+1}>${todos[i].value}</li>`
    }
    saveStorage()
}

const addTodo = (todoObj) => {
    const todo = document.createElement('li'),
    todoCheckBox = document.createElement('input'),
    todoContent = document.createElement('input'),
    todoRemoveButton = document.createElement('button'),
    todoEditButton = document.createElement('button')
    // check_box
    todoCheckBox.type = "checkbox",
    todoCheckBox.checked = todoObj.checked
    todoCheckBox.classList.add('check')
    if (todoCheckBox.checked) todoContent.classList.add('todo_check')
    todoCheckBox.addEventListener("click", (e) => {
        changeCheckState(e, todoContent, todoObj)
    })
    // todo_content
    todoContent.readOnly = true
    todoContent.value = todoObj.content
    todoContent.addEventListener('keypress', (e) => {
        if (e.key === 'Enter')
        readOnlyState = (todoContent.readOnly === true)
        todoContent.readOnly = readOnlyState ? false : true
    })
    // remote_butotn
    todoRemoveButton.innerText = "✖"
    todoRemoveButton.addEventListener("click", removeTodo)
    todoRemoveButton.classList.add('remove')
    // edit_button
    todoEditButton.innerText = "편집"
    todoEditButton.classList.add('edit')
    todoEditButton.addEventListener("click", () => {
        readOnlyState = (todoContent.readOnly === true)
        todoContent.readOnly = readOnlyState ? false : true
        todoContent.focus()
    })
    todo.id = todoObj.id
    todo.append(todoCheckBox, todoContent, todoEditButton, todoRemoveButton)
    document.querySelector(".todo_list").prepend(todo)
    todos.push(todoObj)
    saveStorage()
}

const createObj = (content, checked) => {
    return {
        "id" : todos.length + 1,
        "content" : content,
        "checked" : checked
    }
}

const onSubmit = (e) => {
    e.preventDefault()
    let input = e.target.querySelector(".todo_input")
    if (input.value !== "") {
        addTodo(createObj(input.value, false))
        input.value = ""
        input.focus()
    } 
}

const loadTodos = () => {
    const loadTodos = JSON.parse(localStorage.getItem(TODOS)) || []
    loadTodos.forEach(todo => {
        addTodo(createObj(todo.content, todo.checked))
    })
}

function init() {
    loadTodos()
    document.querySelector("form").addEventListener("submit", onSubmit)
}

init()