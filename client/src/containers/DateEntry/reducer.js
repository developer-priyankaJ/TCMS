import createReducer from '../../utils/createreducer';
import {ActionsTypes} from '../../constants';

const recvDateReducer = createReducer({}, {
  [ActionsTypes.RECV_DATE_DATA](state, action) {
    return Object.assign({}, state, action.data);
  }
});

export default recvDateReducer;
