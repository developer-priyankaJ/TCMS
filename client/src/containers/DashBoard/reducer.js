import createReducer from '../../utils/createreducer';
import {ActionsTypes} from '../../constants';

const dashboardReducer = createReducer({}, {
  [ActionsTypes.DASHBOARD_DATA](state, action) {
    return Object.assign({}, state, action.data);
  }
});

export default dashboardReducer;
