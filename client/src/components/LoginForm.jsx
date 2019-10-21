import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { NavLink  } from 'react-router-dom';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
class LoginForm extends Component {
  componentDidMount(){
    this.refs.email.focus();
  }
  render() {
      const { onSubmit, onChange, errors, user } = this.props;
      return (
           <div>
            <form action="/" onSubmit={onSubmit} >

              <div className="login__title">
                <div className="icon"/>
                <div className="heading"><h3>Member Login</h3></div>
              </div>

              {errors.summary && <p className="error-message">{errors.summary}</p>}
              <div className="login__field">
                <input className={"fff"} type="text" name="email"/>
                <TextField
                  floatingLabelText="Email"
                  ref={"email"}
                  name="email"
                  errorText={errors.email}
                  onChange={onChange}
                  defaultValue={user.email}
                  fullWidth
                />
              </div>

              <div className="login__field">
                <TextField
                  floatingLabelText="Password"
                  type="password"
                  name="password"
                  onChange={onChange}
                  errorText={errors.password}
                  defaultValue={user.password}
                  fullWidth
                />
              </div>

              <div className="login__button">
                <RaisedButton type="submit" label="Log in" primary />
              </div>

              <CardText>Don't have an account? <NavLink to={'/signup'}>Contact Us</NavLink >.</CardText>
            </form>
          </div>
        );
        }
        };

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
