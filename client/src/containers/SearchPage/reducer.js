import createReducer from '../../utils/createreducer';
import {ActionsTypes} from '../../constants';

const SearchReducer = createReducer({}, {
  [ActionsTypes.SEARCH_GRID_DATA](state, action) {
    return Object.assign({}, state, action.data);
  }
});

const BalesReducer = createReducer({}, {
  [ActionsTypes.BALES_GRID_DATA](state, action) {
    return Object.assign({}, state, action.data);
  }
});

const CustomColumnReducer = createReducer({}, {
  [ActionsTypes.CUSTOM_COLUMN_DATA](state, action) {
    return Object.assign({}, state, action.data);
  }
});

export default { SearchReducer, BalesReducer, CustomColumnReducer };
