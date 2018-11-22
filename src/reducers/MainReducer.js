import { combineReducers } from 'redux'
import todos from './TodoReducer'
import visibilityFilter from './FilterReducer'
import AddStateReducer from './AddStateReducer'
export default combineReducers({
  todos,
  visibilityFilter,
  AddStateReducer

})