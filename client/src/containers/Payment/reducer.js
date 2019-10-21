import createReducer from '../../utils/createreducer';
import {ActionsTypes} from '../../constants';

const paymentReducer = createReducer({}, {
  [ActionsTypes.PAYMENT](state, action) {
    return Object.assign({}, state, action.data);
  }
});

export default paymentReducer;
