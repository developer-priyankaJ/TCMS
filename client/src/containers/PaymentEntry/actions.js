import { ActionsTypes} from '../../constants';

export const updateMasterPaymentData = data => ({
  "type": ActionsTypes.MASTER_PAYMENT_DATA,
  data
});
