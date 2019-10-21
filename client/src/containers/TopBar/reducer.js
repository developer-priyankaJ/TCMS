import createReducer from '../../utils/createreducer';
import {ActionsTypes} from '../../constants';

const menuReducer = createReducer({}, {
  [ActionsTypes.SET_SELECTED_MENU](state, action) {
    console.log("action.data >>>", state, "  ",action.data)
    return Object.assign({}, state, action.data);
  }
});

export default menuReducer;
