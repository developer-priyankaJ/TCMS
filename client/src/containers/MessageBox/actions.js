import {ActionsTypes, Labels} from '../../constants';

export const showMessageBox = (config) => ({
  "type": ActionsTypes.MESSAGE_BOX_ACTION,
  "config" : Object.assign({}, config, {
    "show" : true
  })
});

export const hideMessageBox = (config) => ({
  "type": ActionsTypes.MESSAGE_BOX_ACTION,
  "config" : {
    "show" :  false
  }
});

export const showErrorMessageBox = (config) => ({
  "type": ActionsTypes.MESSAGE_BOX_ACTION,
  "config" : Object.assign({}, {
    "show" : false,
    "hideCloseIcon" : true,
    "heading" : Labels.messageBox.errorHeader,
    "message" : Labels.messageBox.errorMsg,
    "callBack" : () => {
      window.location.reload();        
    }
  }, config)
});

