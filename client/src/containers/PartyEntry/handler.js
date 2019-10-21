import { Labels, Apis, Keys } from '../../constants';
import * as Utils from '../../utils';
import * as utility from '../../utils/utility.js';
import moment from 'moment';

function fetchData(){
  var that = this;
  Utils.fetchService.call(this, {
      "method": "POST",
      "url": Apis.entryFormData,
      "body": JSON.stringify({
          "action": ["getTransporters","getStates","getCities"]
      }),
      "callBack": (data) => {
          that.props.updateData(data);
      }
  });
}
function fetchTableData(){
  var that = this;
  var data = {
    "mode": this.state.searchMode && this.state.searchMode.value,
    "searchTransporter": this.state.transportersearch && this.state.transportersearch.value,
    "startdate": this.state.startdate && this.state.startdate,
    "enddate": this.state.enddate && this.state.enddate
  }
  Utils.fetchService.call(this, {
      "method": "POST",
      "url": Apis.gridData,
      "body": JSON.stringify({
        "columnType": "masterpayment",
        "data": data
      }),
      "callBack": (data) => {
          that.props.updateMasterPaymentData(data);
      }
  });
}

function handleChange( date, name ) {
    var newDate;
    if (date) {
        newDate = moment(date, 'DD/MM/YYYY');
        if (!newDate.isValid()) {
          var d = new Date(date);
          if (isNaN(d.getTime())) {
            d = new Date();
          }
          newDate = moment(d);
        }
        newDate = moment(newDate).format("DD/MM/YYYY");
    }
    this.setState((prevState, props) => {
      return {[name]:newDate};
    });
}

function updateSelectedOption(data, type, action){
  this.setState((prevState, props) => {
    return {[type]:data};
  });
  if(action && action==="total"){
      let amt = (type==="amount") ? data : this.state.amount;
      let tds = (type==="tds") ? data : this.state.tds;
      let total = parseInt(amt) + parseInt(tds);
      this.setState((prevState, props) => {
        return {"total":total};
      });
  }else if(action && action === "showField"){
    if(this.field && data.value==="cheque"){
      this.field.current.style.display = "inline-block";
    }else{
      this.field.current.style.display = "none";
    }


  }
}
function resetData(){
  var fieldsArray = ["amount","tds","total","chequeNo","remarks"];
  var that = this;
  for(let i=0;i<fieldsArray.length;i++){
    that.setState((prevState, props) => {
      return {[fieldsArray[i]]:""};
    });
  }
  that.setState((prevState, props) => {
    return {"selectedTransporter":{}};
  });
  that.setState((prevState, props) => {
    return {"billDate":moment(new Date()).format("DD/MM/YYYY")};
  });
  that.setState((prevState, props) => {
    return {"selectedMode":{
      "value": "neft",
      "label":"Neft"
    }};
  });
}
function submitData(){
  var obj = {
    transporter: this.state.selectedTransporter.value,
    amount:this.state.amount,
    tds:this.state.tds,
    total:this.state.total,
    chequeNo:this.state.chequeNo,
    mode:this.state.selectedMode.value,
    billDate:this.state.billDate,
    remarks:this.state.remarks
  }
  var that = this;
  Utils.fetchService.call(this, {
      "method": "POST",
      "url": Apis.submitMasterPayment,
      "body": JSON.stringify(obj),
      "callBack": (result) => {
        if(result.success){

          setTimeout(function(){
            fetchTableData.call(that);
            resetData.call(that);
          },300);
        }
      }
    });
}


export default {
    fetchData,
    updateSelectedOption,
    handleChange,
    submitData,
    fetchTableData

}
