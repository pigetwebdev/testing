import {
    SET_ADD_EDIT_STATE
} from "../actions/actionsTypes";

const AddState = (state = {stateAddEdit: true}, action) => {
  switch (action.type) {
    case SET_ADD_EDIT_STATE:
      return {
        stateAddEdit: action.stateAddEdit,  //Add
        id: action.id,
        text: action.text
      };
    default:
      return state;
  }
};

export default AddState;
