import { combineReducers } from 'redux';
import loginReducer from './containers/LoginPage/reducer';
import messageBoxReducer from './containers/MessageBox/reducer';
import loaderReducer from './containers/Loader/reducer';
import SearchReducers from './containers/SearchPage/reducer';
import transportEntry from './containers/TransportEntry/reducer';
import dashboardReducer from './containers/DashBoard/reducer';
import recvDateReducer from './containers/DateEntry/reducer';
import menuReducer from './containers/TopBar/reducer';
import masterPaymentReducer from './containers/PaymentEntry/reducer';
import paymentReducer from './containers/Payment/reducer';

export default combineReducers({
  "userSession" : loginReducer,
  "messageBox": messageBoxReducer,
  "loader": loaderReducer,
  "searchGrid":SearchReducers.SearchReducer,
  "balesGrid":SearchReducers.BalesReducer,
  "customColumns": SearchReducers.CustomColumnReducer,
  "entryFormData": transportEntry.entryFormReducer,
  "currEntry": transportEntry.currEntryReducer,
  "dashboardData": dashboardReducer,
  "recvDateData": recvDateReducer,
  "selectedMenu": menuReducer,
  "masterPayment": masterPaymentReducer,
  "payment":paymentReducer
});
