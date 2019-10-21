import { Apis, Keys } from '../../constants';
import * as Utils from '../../utils';
import * as utility from '../../utils/utility.js';

function fetchData(){
  let that = this;
  Utils.fetchService.call(this, {
      "method": "POST",
      "url": Apis.entryFormData,
      "body": JSON.stringify({
          "action": ["getLrNos","getBaleNos"]
      }),
      "callBack": (data) => {
          that.props.updateDateData(data);
      }
    });
}
function onClickRow(key){
    openModal.call(this,"infoModal");
    var val = key.getAttribute("dname") && key.getAttribute("dname").split("##");
    var obj = {
      "lrNo":val[0],
      "invoiceNo":val[1]
    }
    fetchBalesData.call(this,null, null, obj, true);
}

function fetchBalesData(event, type, key, includeDetails){
  let that = this, check = true, data;
  if(type == "lrNo" || type== "baleNo"){
    var obj = this.state[type];
    obj["label"] = event && event.label;
    obj["value"] = event && event.value;
    this.setState((prevState, props) => {
      return {obj}
    });
    data = {
      [type]: event && event.label,
      [Keys[type]]: that.state[Keys[type]] && that.state[Keys[type]]["label"]
    }
  }
  if(type == "bale_desc"){
    this.setState((prevState, props) => {
      return {"bale_desc" : event && event.target && event.target.value}
    });
    if(event && event.target && (event.target.value.length!=0 && event.target.value.length < 2)){
      check = false;
    }
    data = {
      "lrNo": this.state.lrNo && this.state.lrNo.label,
      "baleNo": this.state.baleNo && this.state.baleNo.label,
      "baleDesc": event && event.target && event.target.value
    }
  }
  if(key){
    data = key;
  }
  if(!type && !key){
    data = {
      "lrNo": this.state.lrNo && this.state.lrNo.label,
      "baleNo": this.state.baleNo && this.state.baleNo.label,
      "baleDesc": event && event.target && event.target.value
    }
  }
  if(check){
    getData.call(this, data, includeDetails)
  }
}

function getData( data, includeDetails){
  var that = this;
  Utils.fetchService.call(this, {
      "method": "POST",
      "url": Apis.gridData,
      "body": JSON.stringify({
          "columnType": "baledetails",
          "data": data,
          "invoiceData": includeDetails
      }),
      "callBack": (data) => {
          if(includeDetails){
            that.props.updateDateData({"balesOtherInfo":data.rows[0]});
            that.props.updateBalesData(data);
          }else{
            that.props.updateDateData({"balesGrid":data});
          }
      }
    });
}
function openModal(type){
  this.setState((prevState, props) => {
    return { [type]: true }
  });
}
function onCloseModal(type){
  this.setState((prevState, props) => {
    return { [type]: false }
  });
}

function onDateChange(key, value, type){
    if(type == "edit"){
      var obj = this.state.editData;
      obj.value = value ? utility.formatDate(value) : "";
      this.setState((prevState, props) => {
        return { obj }
      });
    }else{
      var arr = this.state.dateArray;
      var obj = {
          "type": key && key.split("#")[0],
          "id":  key && key.split("#")[1],
          "value": utility.formatDate(value)
      }
      arr.push(obj);
      submitChange.call(this,key.split("#")[1]);
    }
}

function onEditDate( id, value, elem ){
    console.log("id", id, "value ",value);
    var obj = this.state.editData;
    var type = id && id.split("#")[0];
    var display;
    if(type=="received_date"){
        display = "Received date";
    }else{
      display = "Sold date";
    }
    obj.key= id;
    obj.id = id && id.split("#")[1];
    obj.type = type;
    obj.display = display;
    obj.value = value;

    this.setState((prevState, props) => {
      return { "editElem": elem }
    });
    this.setState((prevState, props) => {
      return { obj }
    });
    openModal.call(this, "editModal")
}

function submitChange( id, type, event ){
    var result, elem;
    var that = this;
    if(type && type == "edit"){
      event.preventDefault();
      result = [this.state.editData];
    }else if(type=="remarks"){
      result = [{
        "id": id,
        "type": type,
        "value": event.target.innerText
      }]
    }else{
      result = this.state.dateArray.filter(function( obj ) {
                      return obj.id == id;
                  });
    }
    Utils.fetchService.call(this, {
        "method": "POST",
        "url": Apis.submitBaleDates,
        "body": JSON.stringify({
            "data": result
        }),
        "callBack": (data) => {
          if(type && type == "edit"){
            onCloseModal.call(this,"editModal");
            if(!that.state.editData.value || that.state.editData.value == "undefined"){
                fetchBalesData.call(this);
            }else{
                that.child.current.editDate(that.state.editElem, that.state.editData.value );
            }

            var obj = that.state.editData;
            obj.key = "";
            obj.id = "";
            obj.value = "";
            obj.type = "";
          }
          this.setState((prevState, props) => {
            return { "dateArray":[] }
          });
        }
      });

}
export default {
    fetchData,
    fetchBalesData,
    onClickRow,
    openModal,
    onCloseModal,
    onEditDate,
    onDateChange,
    submitChange
}
