import request from './request';
import { ErrorCode } from '../constants';

export function validate(obj) {
    const { value, min, regex } = obj;
    return value.length >= min && regex.test(value);
}

export function fetchService(config) {
    const that = this;
    that.props.showLoader(true);
    let option = Object.assign({}, {
        "method": config.method || "GET",
        "headers": {
            "Content-Type": config.contentType || "application/json; charset=UTF-8"
        },
        "credentials" : 'include'
    }, config);
    if (config.method === "GET") {
        delete option.body
    }
    request(config.url, option).then(response => {
      setTimeout(function(){ that.props.showLoader(false);}, 300)

      if(response.success && response.data) {
        typeof config.callBack === "function" && config.callBack(response.data);
      }else{
        const messageObj = {};
        if (response.error) {
          var r = window.confirm("Following Error occured -"+response.error.msg);
            if (r == true) {
              window.location.reload()
            }
        }
        //that.props.showErrorMessageBox(messageObj);
      }

    }).catch(error => {
      that.props.showLoader(false);
      if (error.responseCode === ErrorCode.SOMETHING_WRONG) {
         if (typeof config.failure === "function"){
           config.failure(error);
         } else{

            //that.props.showErrorMessageBox();
            console.log(error)
         }
      } /*else if(){
        typeof config.failure == "function" && config.failure(response.data);
      }*/else {
        throw error;
      }
    });
}

export function debounce(){
    let interval = undefined;
    return (method, milliseconds) => {
        interval && clearTimeout(interval);
        interval = setTimeout(() => {
            typeof method === "function" && method();
        },milliseconds);
    }
}
