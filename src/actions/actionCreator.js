import { ADD_TODO,EDIT_TODO, REMOVE_TODO, TOGGLE_TODO, ACTIVATE_TODO, SET_VISIBILITY_FILTER,SET_ADD_EDIT_STATE,INITDATA } from './actionsTypes'

let TodoId = 9

export const addTodo = text => ({
    type: ADD_TODO,
    id: TodoId++,
    text
})

export const initData = data => ({
    type: INITDATA,
    todos: data,
})


export const editTodo = (id,text) => ({
    type: EDIT_TODO,
    id,
    text
})

export const deleteTodo = (id) => ({
    type: REMOVE_TODO,
    id: id
})

export const toggleTodo = (id) => ({
    type: TOGGLE_TODO,
    id: id,
//    stateAddEdit: false,
})

export const activateTodo = (id) => ({
    type: ACTIVATE_TODO,
    id: id,
    active: false,
})


export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter
})

export const setAddEditState = (aes,id,text) => ({
    type: SET_ADD_EDIT_STATE,
    stateAddEdit: aes,
    id:id,
    text: text
})
