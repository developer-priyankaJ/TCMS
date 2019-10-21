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
          "action": ["getTransporters"]
      }),
      "callBack": (data) => {
          that.props.updateData(data);
      }
  });
}
function performAction(action,id){
  var that = this;
    if(action==="edit"){
      Utils.fetchService.call(this, {
          "method": "POST",
          "url": Apis.getMasterPaymentEntry,
          "body": JSON.stringify({
            "id":id
          }),
          "callBack": (results) => {
            var data = results.data;
            that.setState((prevState, props) => {
              return {"editEnabled":true};
            });
            that.setState((prevState, props) => {
              return {"editId":id};
            });
            that.setState((prevState, props) => {
              return {"total":data[0].total};
            });
            that.setState((prevState, props) => {
              return {"amount":data[0].amount};
            });
            that.setState((prevState, props) => {
              return {"tds":data[0].tds};
            });
            that.setState((prevState, props) => {
              return {"remarks":data[0].remarks};
            });
            that.setState((prevState, props) => {
              return {"billDate":data[0].bill_date};
            });
            that.setState((prevState, props) => {
              return {"selectedMode":{value:data[0].mode,label:data[0].mode.charAt(0).toUpperCase() + data[0].mode.slice(1)}};
            });
            if(that.field && data[0].cheque_no){
              that.field.current.style.display = "inline-block";
            }
            that.setState((prevState, props) => {
              return {"chequeNo":data[0].cheque_no};
            });
            var str = that.props.formData.transporters.find(function( obj ) {
                        return obj.value == data[0].transporter;
                     });
            that.setState((prevState, props) => {
              return {"selectedTransporter":{value:data[0].transporter,label:str.label}};
            });
          }
      });
    }else if(action==="delete"){
      var r = window.confirm("Do you really want to delete ?");
      if (r == true) {
          Utils.fetchService.call(this, {
              "method": "POST",
              "url": Apis.deleteGridData,
              "body": JSON.stringify({
                "table": "masterpayment",
                "key": "id",
                "value": id
              }),
              "callBack": (data) => {
                setTimeout(function(){
                  fetchTableData.call(that);
                  resetData.call(that);
                },300);
              }
          });
        }
    }
  }
function fetchTableData(){
  var that = this;
  let modeValue = this.state.searchMode && this.state.searchMode.map(obj => obj.value);
  var data = {
    "mode": modeValue,
    "searchTransporter": this.state.transportersearch && this.state.transportersearch.value,
    "startdate": this.state.startDate && moment(this.state.startDate,'DD/MM/YYYY').format("YYYY-MM-DD"),
    "enddate": this.state.endDate && moment(this.state.endDate,'DD/MM/YYYY').format("YYYY-MM-DD")
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

function handleChange( date, name, action ) {
    var newDate;
    var that = this;
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
    if(this.state.editEnabled){
      this.changedFields.push(name);
    }
    if(action && action === "search"){
      setTimeout(function(){
        fetchTableData.call(that);
      },300);
    }
}

function updateSelectedOption(data, type, action){
  var that = this;
  var editAction = this.state.editEnabled;
  this.setState((prevState, props) => {
    return {[type]:data};
  });
  if(editAction){
    this.changedFields.push(type);
  }
  if(action && action==="total"){
      let amt = (type==="amount") ? data : this.state.amount;
      let tds = (type==="tds") ? data : this.state.tds;
      let total = parseInt(amt) + parseInt(tds);
      this.setState((prevState, props) => {
        return {"total":total};
      });
      if(editAction){
        this.changedFields.push("total");
      }
  }else if(action && action === "showField"){
    if(this.field && data.value==="cheque"){
      this.field.current.style.display = "inline-block";
    }else{
      this.field.current.style.display = "none";
    }
  }else if(action && action === "search"){
      setTimeout(function(){
    fetchTableData.call(that);
  },300);
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
  var editEnabled = this.state.editEnabled;
  var obj = {
    id:this.state.editId,
    update:editEnabled,
    transporter:((editEnabled && this.changedFields.indexOf("transporter") > -1) || !editEnabled) ? this.state.selectedTransporter.value : "",
    amount:((editEnabled && this.changedFields.indexOf("amount") > -1) || !editEnabled) ? this.state.amount :"",
    tds:((editEnabled && this.changedFields.indexOf("tds") > -1) || !editEnabled) ? this.state.tds: "",
    total:((editEnabled && this.changedFields.indexOf("total") > -1) || !editEnabled) ? this.state.total: "",
    chequeNo:((editEnabled && this.changedFields.indexOf("chequeNo") > -1) || !editEnabled) ? this.state.chequeNo: "",
    mode:((editEnabled && this.changedFields.indexOf("mode") > -1) || !editEnabled) ? this.state.selectedMode.value: "",
    billDate:((editEnabled && this.changedFields.indexOf("billDate") > -1) || !editEnabled) ? this.state.billDate :"",
    remarks:((editEnabled && this.changedFields.indexOf("remarks") > -1) || !editEnabled) ? this.state.remarks: ""
  }
  var that = this;
  Utils.fetchService.call(this, {
      "method": "POST",
      "url": Apis.submitMasterPayment,
      "body": JSON.stringify(obj),
      "callBack": (result) => {
        if(result.success){
          if(editEnabled){
            that.changedFields = [];
            this.setState((prevState, props) => {
              return {"editEnabled":false};
            });
          }
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
    fetchTableData,
    performAction
}
