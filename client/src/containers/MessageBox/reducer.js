import createReducer from '../../utils/createreducer';
import {ActionsTypes} from '../../constants';

const messageBoxReducer = createReducer({}, {
  [ActionsTypes.MESSAGE_BOX_ACTION](state, action) {
    return Object.assign({}, state, action.config);
  }
});

export default messageBoxReducer;
