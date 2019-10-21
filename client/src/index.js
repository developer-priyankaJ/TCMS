import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, BrowserRouter , Switch } from 'react-router-dom';
import  configureStore from './store';
import registerServiceWorker from './registerServiceWorker';
import './assets/css/index.scss';
import App from './containers/App/index.js';
import DateEntry from './containers/DateEntry/index.js';
import LoginPage from './containers/LoginPage/index.js';
import SignUpPage from './containers/SignUpPage/index.js';
import SearchPage from './containers/SearchPage/index.js';
import DashBoard from './containers/DashBoard/index.js';
import TransportEntry from './containers/TransportEntry/index.js';
import PaymentEntry from './containers/PaymentEntry/index.js';
import Payment from './containers/Payment/index.js';
import PartyEntry from './containers/PartyEntry/index.js';
import TransporterEntry from './containers/TransporterEntry/index.js';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import EnsureLoggedInContainer from './containers/EnsureLoggedInContainer/index.js';

const store = configureStore();
ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme()}>
  <Provider store={store}>
  	<BrowserRouter  forceRefresh={true}>
    		<App>
          <Switch>
      			<Route  exact path="/" component={LoginPage} />
            <Route  path="/signup" component={SignUpPage} />
            <Route  path="/dashboard" component={EnsureLoggedInContainer(DashBoard)} />
            <Route  path="/home:editId" component={EnsureLoggedInContainer(TransportEntry)} />
            <Route  path="/dateEntry" component={EnsureLoggedInContainer(DateEntry)} />
            <Route  path="/search" component={EnsureLoggedInContainer(SearchPage)} />
            <Route  path="/paymentEntry" component={EnsureLoggedInContainer(PaymentEntry)} />
            <Route  path="/payment" component={EnsureLoggedInContainer(Payment)} />
            <Route  path="/partyEntry" component={EnsureLoggedInContainer(PartyEntry)} />
            <Route  path="/transporterEntry" component={EnsureLoggedInContainer(TransporterEntry)} />
          </Switch>
    		</App>
  	</BrowserRouter >
  </Provider></MuiThemeProvider>,document.getElementById('react-app')
);
