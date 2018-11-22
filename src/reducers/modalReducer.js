import TypeShowDialog from './actionsTypes';

const initialState = {
  modalType: null,
  modalProps: {}
}

const showModalDialog =  (state = initialState, action) => {
  switch (action.type) {
    case TypeShowDialog.SHOW_MODAL:
      return {
        modalProps: action.modalProps,
        modalType: action.modalType,
        type: action.type
      }
    case TypeShowDialog.HIDE_MODAL:
      return initialState
    default:
      return state
  }
}