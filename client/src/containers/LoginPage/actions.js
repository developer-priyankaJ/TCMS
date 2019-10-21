import { ActionsTypes} from '../../constants';

export const updateUser = userDetails => ({
  "type": ActionsTypes.UPDATE_USER,
  userDetails
});
