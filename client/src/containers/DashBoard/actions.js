import { ActionsTypes} from '../../constants';

export const updateData = data => ({
  "type": ActionsTypes.DASHBOARD_DATA,
  data
});
