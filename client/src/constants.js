export const ActionsTypes = {
  "UPDATE_USER": "UPDATE_USER",
  "MESSAGE_BOX_ACTION": "MESSAGE_BOX_ACTION",
  "LOADER_ACTION": "LOADER_ACTION",
  "SEARCH_GRID_DATA": "SEARCH_GRID_DATA",
  "BALES_GRID_DATA": "BALES_GRID_DATA",
  "ENTRY_FORM_DATA": "ENTRY_FORM_DATA",
  "CURRENT_ENTRY": "CURRENT_ENTRY",
  "CUSTOM_COLUMN_DATA": "CUSTOM_COLUMN_DATA",
  "DASHBOARD_DATA": "DASHBOARD_DATA",
  "RECV_DATE_DATA": "RECV_DATE_DATA",
  "MASTER_PAYMENT_DATA": "MASTER_PAYMENT_DATA",
  "PAYMENT": "PAYMENT",
  "SET_SELECTED_MENU": "SET_SELECTED_MENU",
  "EDIT_DATA": "EDIT_DATA"
}

export const ErrorCode = {
    "SOMETHING_WRONG" : 999
}

export const Apis = {
   "validateUser":"/auth/login",
   "entryFormData":"/api/getData",
   "backupData": "/api/backupData",
   "submitEntry":"/api/submitEntry",
   "fetchEditEntry":"/api/fetchEditEntry",
   "newParty": "/api/addParty",
   "selectedParty": "/api/getParty",
   "savePaymentRef": "/api/savePaymentRef",
   "getPaymentRef":"/api/getPaymentRef",
   "newTransporter": "/api/addTransporter",
   "selectedTransporter": "/api/getTransporter",
   "gridData": "/grid/getAllData",
   "deleteGridData": "/grid/deleteGridData",
   "getCustomColumns": "/grid/getCustomColumns",
   "setCustomColumns": "/grid/setCustomColumns",
   "submitBaleDates": "/grid/submitBaleDates",
   "submitMasterPayment": "/api/submitMasterPayment",
   "getMasterPaymentData": "/api/getMasterPaymentData",
   "getMasterPaymentEntry": "/api/getMasterPaymentEntry",
   "getPaymentData":"/grid/getPaymentData"
}

export const Keys = {
    "partyModal": "selectedParty",
    "transporterModal": "selectedTransporter",
    "selectedParty": "parties",
    "selectedTransporter": "transporters",
    "baleNo": "lrNo", // to chose other key
    "lrNo": "baleNo"
}
export const Labels = {
  "messageBox" : {
      "errorHeader" : "ERROR",
      "emailExistsMsg" : "This user already exists in IDHUB",
      "errorMsg" : "Something went wrong",
      "sendTempPwdFailMsg" : "Fail to Send Temp Password",
      "userCreationSuccess" : "User is created successfully",
      "updateUserSuccess" : "User updated successfully",
      "userCreationFail" : "User creation fail",
      "updateUserFail" : "Update user fail",
      "createUserForm" : "Create User Form",
      "updateUserForm" : "Update User Form"
  },

  "heading" : {
  },
  "buttons" : {
  }

}
