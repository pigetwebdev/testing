// if you want to show initial data :)
// const INITIAL_DATA =  [
//     {
//         id: 0,
//         text: 'Walk the Dog',
//     },
//     {
//         id:1,
//         text: 'learn Redux',

//     },
// ]

import { ADD_TODO, EDIT_TODO, REMOVE_TODO, ACTIVATE_TODO, TOGGLE_TODO, INITDATA} from '../actions/actionsTypes'


const INITIAL_DATA = []

const TodoReducer = (state=INITIAL_DATA, action) => {
    switch (action.type){
        case ADD_TODO:
        return [
            ...state,{
                id: action.id,
                text: action.text,
                completed: false,
            }
        ]
        case INITDATA:
        return action.todos;
            
        case EDIT_TODO:
        return state.map(todo =>
        (todo.id === action.id)
          ? {...todo, text: action.text}
          : todo
         )
        case TOGGLE_TODO:
        return state.map(todo =>
        (todo.id === action.id)
          ? {...todo, completed: !todo.completed}
          : todo
         )
         case ACTIVATE_TODO:
         return state.map(todo =>
         (todo.id === action.id)
           ? {...todo, active: !todo.active}
           : todo
          )
 
         case REMOVE_TODO:
        const numIndex = parseInt(action.id)
        return state.filter(todo => todo.id !== numIndex);

        default:
        return state
    }
}

export default TodoReducer