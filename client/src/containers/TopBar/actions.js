import { ActionsTypes} from '../../constants';

export const setSelectedMenu = data => ({
  "type": ActionsTypes.SET_SELECTED_MENU,
  data
});
