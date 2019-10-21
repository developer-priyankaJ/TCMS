import {ActionsTypes, Labels} from '../../constants';

export const showLoader = (value) => ({
  "type": ActionsTypes.LOADER_ACTION,
  "config" : Object.assign({}, {
    "show" : value
  })
});
