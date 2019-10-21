import { ActionsTypes} from '../../constants';

export const updatePaymentData = data => ({
  "type": ActionsTypes.PAYMENT,
  data
});
