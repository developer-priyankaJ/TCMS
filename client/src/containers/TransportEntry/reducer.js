import createReducer from '../../utils/createreducer';
import {ActionsTypes} from '../../constants';

const entryFormReducer = createReducer({}, {
  [ActionsTypes.ENTRY_FORM_DATA](state, action) {
    console.log("state >>",state)
    return Object.assign({}, state, action.data);
  }
});

const currEntryReducer = createReducer({}, {
  [ActionsTypes.CURRENT_ENTRY](state, action) {
    return Object.assign({}, state, action.data);
  }
});

export default {entryFormReducer, currEntryReducer};
