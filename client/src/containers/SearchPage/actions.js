import { ActionsTypes} from '../../constants';

export const updateData = data => ({
  "type": ActionsTypes.SEARCH_GRID_DATA,
  data
});

export const updateBalesData = data => ({
  "type": ActionsTypes.BALES_GRID_DATA,
  data
});

export const updatecustomColumns = data => ({
  "type": ActionsTypes.CUSTOM_COLUMN_DATA,
  data
});
