import { ActionsTypes} from '../../constants';

export const updateData = data => ({
  "type": ActionsTypes.ENTRY_FORM_DATA,
  data
});

export const updateCurrEntry = data => ({
  "type": ActionsTypes.CURRENT_ENTRY,
  data
});
