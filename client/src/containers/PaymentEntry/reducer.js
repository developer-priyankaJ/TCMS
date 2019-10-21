import createReducer from '../../utils/createreducer';
import {ActionsTypes} from '../../constants';

const masterPaymentReducer = createReducer({}, {
  [ActionsTypes.MASTER_PAYMENT_DATA](state, action) {
    return Object.assign({}, state, action.data);
  }
});

export default masterPaymentReducer;
