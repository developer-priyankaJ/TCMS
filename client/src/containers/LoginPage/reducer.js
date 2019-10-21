import createReducer from '../../utils/createreducer';
import {ActionsTypes} from '../../constants';

const loginReducer = createReducer({}, {
  [ActionsTypes.UPDATE_USER](state, action) {
    return Object.assign({}, state, action.userDetails);
  }
});

export default loginReducer;
