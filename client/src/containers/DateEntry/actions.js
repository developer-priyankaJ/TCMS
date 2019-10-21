import { ActionsTypes} from '../../constants';

export const updateDateData = data => ({
  "type": ActionsTypes.RECV_DATE_DATA,
  data
});
