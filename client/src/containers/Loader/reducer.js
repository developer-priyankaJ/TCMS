import createReducer from '../../utils/createreducer';
import {ActionsTypes} from '../../constants';

const loaderReducer = createReducer({}, {
  [ActionsTypes.LOADER_ACTION](state, action) {
    return Object.assign({}, state, action.config);
  }
});

export default loaderReducer;
