import { Labels, Apis } from '../../constants';
import * as Utils from '../../utils';

/**
 * Change the user object.
 * @ param {object} event - the JavaScript event object
 */
function changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState((prevState, props) => {
      return user
    });
}

/**
* Process the form.
*
* @param {object} event - the JavaScript event object
*/
function processForm(event) {
 // prevent default action. in this case, action is the form submission event
    event.preventDefault();
 // create a string for an HTTP body message
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const that = this;

  Utils.fetchService.call(this, {
        "method": "POST",
        "url": Apis.validateUser,
        "body": JSON.stringify({
            "action": "validateUser",
            "email": email,
            "password": password
        }),
        "callBack": (data) => {
          if(data && data.errors){
            that.setState((prevState, props) => {
              return { "errors": data.errors }
            });
          }else{
            that.setState((prevState, props) => {
              return { "errors": {} }
            });
            let json = {
              "isLoggedIn":true,
              "user":data.user
            };
            that.props.updateUser(json);
            sessionStorage.setItem('tmsData', JSON.stringify(json));
            that.props.history.push('/home:entry')
          }

        },
        "failure": (data) => {
          const errors = data.errors ? data.errors : {};
          errors.summary = data.message;

          this.setState({
            errors
          });
        }
      });
  // create an AJAX request
  /*const xhr = new XMLHttpRequest();
  xhr.open('post', '/auth/login');
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    if (xhr.status === 200) {
      // success

      // change the component-container state
      this.setState({
        errors: {}
      });

      console.log('The form is valid');
      this.props.history.push('/home')
    } else {
      // failure

      // change the component state
      const errors = xhr.response.errors ? xhr.response.errors : {};
      errors.summary = xhr.response.message;

      this.setState({
        errors
      });
    }
  });
  xhr.send(formData);
*/
}

export default {
    changeUser,
    processForm
}
