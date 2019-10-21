import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './actions';
import { Card, CardTitle } from 'material-ui/Card';
import LoginForm from '../../components/LoginForm.jsx';
import Handler from './handler';
import * as MessagBoxAction from '../MessageBox/actions';
import * as LoaderAction from '../Loader/actions';
import '../../assets/css/login.scss';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      user: {
        email: '',
        password: ''
      }
    };
    Handler.processForm = Handler.processForm.bind(this);
    Handler.changeUser = Handler.changeUser.bind(this);

  }
  componentDidMount(){
    sessionStorage.clear();
  }
  componentWillUnmount(){
    console.log("unmounting...........loginpage")
  }
  render() {
    return (
      <div className="login">
        <Card className="login__container">

           <LoginForm
              onSubmit={Handler.processForm}
              onChange={Handler.changeUser}
              errors={this.state.errors}
              user={this.state.user}
          />
        </Card>
      </div>
    )
}
}

const mapStateToProps = (state, ownProps) => {
  return {

  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({},Actions,MessagBoxAction,LoaderAction), dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
