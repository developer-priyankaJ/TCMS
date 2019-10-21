import { Labels, Apis, Keys } from '../../constants';
import * as Utils from '../../utils';
import * as utility from '../../utils/utility.js';
import moment from 'moment';

function fetchData(action){
  var that = this;
  Utils.fetchService.call(this, {
      "method": "POST",
      "url": Apis.entryFormData,
      "body": JSON.stringify({
          "action": action ? [action] : ["getTransporters","getLrNos","getReferences"]
      }),
      "callBack": (data) => {
          that.props.updateData(data);
      }
  });
}
function performAction(data){
  var that = this;
  Utils.fetchService.call(that, {
      "method": "POST",
      "url": Apis.getPaymentRef,
      "body": JSON.stringify({
        "columnType": "payment",
        "data": data.value
      }),
      "callBack": (data) => {
          let transporterObj = "";
          if(data.data.transporter){
            transporterObj = that.props.formData.transporters.filter(function(elem){
              return elem.value === parseInt(data.data.transporter)
            })
          }
          let lrNoObj = that.props.formData.lr_nos.filter(function(elem){
            return elem.label === data.data.lr_no
          })
          let status = { "label":"All", "value": "all"};
          if(data.data.status && data.data.status == "paid"){
            status = {"label":"Paid", "value": "paid"}
          }else if(data.data.status && data.data.status == "unpaid"){
            status = {"label":"UnPaid","value": "unpaid"}
          }
          that.setState((prevState, props) => {
            return {
              "selectedTransporter":transporterObj ? transporterObj[0] : "",
              "status": status,
              "startDate": data.data.start_date ? data.data.start_date : "",
              "endDate": data.data.end_date ? data.data.end_date : "",
              "lrNo": lrNoObj ? lrNoObj :[],
              "deletedLrs":  data.data.removedLrs ? data.data.removedLrs.split(",") : []
            };
          });
          setTimeout(function(){
              fetchTableData.call(that);
          },300)

      }
  });
}
function fetchTableData(){
  var that = this;
  let status = this.state.status && this.state.status.value;
  var data = {
    "values":[{
        "key":"bd.status",
        "value": status=="all" ? "": status
      },{
        "key":"t.transporter",
        "value":  this.state.selectedTransporter && this.state.selectedTransporter.value ? this.state.selectedTransporter.value: ""
      },{
        "key":"t.lr_no",
        "value":  this.state.lrNo && this.state.lrNo.map(function(item){return item.label}).join(',')
      },{
        "key":"startdate",
        "value":  this.state.startDate && moment(this.state.startDate,'DD/MM/YYYY').format("YYYY-MM-DD")
      },{
        "key":"enddate",
        "value":  this.state.endDate && moment(this.state.endDate,'DD/MM/YYYY').format("YYYY-MM-DD")
      },{
        "key":"removedLrs",
        "value":  (this.state.deletedLrs && this.state.deletedLrs.length > 0) ? this.state.deletedLrs.join(',') : ""
      }
    ]
  };
  Utils.fetchService.call(this, {
      "method": "POST",
      "url": Apis.getPaymentData,
      "body": JSON.stringify({
        "columnType": "payment",
        "data": data
      }),
      "callBack": (data) => {
          that.props.updatePaymentData(data);
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

  //  if(action && action === "search"){
      setTimeout(function(){
        fetchTableData.call(that);
      },300);
  //  }
}

function updateSelectedOption(data, type, action){
  var that = this;
  this.setState((prevState, props) => {
    return {[type]:data};
  });
  if(type == "lrNo"){
    let arr = that.state.deletedLrs;
    let finalArr = arr.filter(function(item){
      return data.map(function(el){return el.label}).indexOf(item) < 0
    })
    this.setState((prevState, props) => {
      return {"deletedLrs":finalArr};
    });
  }
  if(type!="refType" && type!="newRef"&& type!="existingRef" ){
    this.setState((prevState, props) => {
      return {"displayLrs":true};
    });
    setTimeout(function(){
      if(type=="reference" && data){
        performAction.call(that, data);
      }else{
        fetchTableData.call(that);
      }
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

function onDateChange(key, value, type){
    if(type == "edit"){
      var obj = this.state.editData;
      obj.value = utility.formatDate(value)
      this.setState((prevState, props) => {
        return { obj }
      });
    }else if(type=="multiAdd"){
      var arr = this.state.dateArray;
      var obj = {
        "id": key,
        "lr_no": this.state.rd_lrNo,
        "type": "received_date",
        "source": type,
        "value": utility.formatDate(value)
      }
      arr.push(obj);
    }else{
      if(this.state.copyToAll){
        let data = this.props.payment.rows && this.props.payment.rows.filter(function(el){
          return el.payment_date == "" || el.payment_date == null
        }).map(function(elem){
          return elem.lr_no
        });
        var arr = this.state.dateArray;
        var obj = {
            "type": key && key.split("#")[0],
            "id":  key && key.split("#")[1],
            "value": utility.formatDate(value),
            "source": "copy",
            "lr_no": data.join(',')
        }
        arr.push(obj);
        submitChange.call(this,key.split("#")[1],"copy");
      }else{
        var arr = this.state.dateArray;
        var obj = {
            "type": key && key.split("#")[0],
            "id":  key && key.split("#")[1],
            "value": utility.formatDate(value),
            "lr_no": key && key.split("#")[2]
        }
        arr.push(obj);
        submitChange.call(this,key.split("#")[1]);
      }
    }
}
function onEditDate(id,value,elem,pos){
  console.log("id", id, "value ",value);
  var obj = this.state.editData;
  var type = id && id.split("#")[0];
  var actualId = id && id.split("#")[1];
  var finalVal = value;
  if(actualId && actualId.indexOf(',') > -1){
    actualId = actualId.split(',')[pos];
  }
  if(value && value.indexOf(' - ') > -1){
      finalVal = value.split(' - ')[1];
  }
  var display;
  if(type=="received_date"){
      display = "Received date";
  }else if(type=="payment_date"){
    display = "Payment date";
  }else{
    display = "Sold date";
  }
  obj.key= id;
  obj.id = actualId;
  obj.type = type;
  obj.originalVal = value;
  obj.display = display;
  obj.value = finalVal;
  obj.lr_no = id && id.split("#")[2];

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
    }else if(type=="copy"){
      result = this.state.dateArray.filter(function( obj ) {
                      return obj.source == "copy";
                  });
    }else if(type=="multiAdd"){
      event.preventDefault();
      result = this.state.dateArray.filter(function( obj ) {
                      return obj.source == "multiAdd";
                  });
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
            let prefix = that.state.editData.originalVal;
            if(prefix && prefix.indexOf(' - ') > -1){
              prefix = prefix.split(' - ')[0] + " - ";
            }else{
              prefix = "";
            }
            if(!that.state.editData.value || that.state.editData.value == "undefined"){
                fetchTableData.call(this);
            }else{
                that.child.current.editDate(that.state.editElem, prefix + that.state.editData.value );
            }
            this.setState((prevState, props) => {
              return { "dateArray":[] }
            });
            var obj = that.state.editData;
            obj.key = "";
            obj.id = "";
            obj.value = "";
            obj.type = "";
          }else if(type == "multiAdd"){
              onCloseModal.call(this,"receiveDateModal");
              fetchTableData.call(this);
              this.setState((prevState, props) => {
                return { "dateArray":[] }
              });
          }else if(type == "copy"){
            fetchTableData.call(this);
            this.setState((prevState, props) => {
              return { "dateArray":[] }
            });
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
function handleColor(data){
    let cls = data.payment_date ?  "row-color-green" : "row-color-red";
    return cls;
}

function onAddMultipleDate(id){
   let bales = id.split("#")[0];
   let dates = id.split("#")[1];
   let lr_no = id.split("#")[2];
   this.setState((prevState, props) => {
     return { "rd_bales": bales }
   });
   this.setState((prevState, props) => {
     return { "rd_dates": dates }
   });
   this.setState((prevState, props) => {
     return { "rd_lrNo": lr_no }
   });
   openModal.call(this,"receiveDateModal");
}

function handleSelection(event){
  if(event.target.checked){

  }else{
    var that = this;
    let deletedLrs = this.state.deletedLrs;
    deletedLrs.push(event.target.getAttribute("dataid"))
    this.setState((prevState, props) => {
      return {deletedLrs};
    });
    this.setState((prevState, props) => {
      return {"displayLrs":true};
    });
    let lrList = this.props.payment && this.props.payment.rows && this.props.payment.rows.map(function(item){return item.lr_no});
    lrList = lrList.filter(function(el){
      return el!=event.target.getAttribute("dataid")
    })
    let selected = this.props.formData.lr_nos.filter(function(item){
      return lrList.indexOf(item.label) > -1
    })
    this.setState((prevState, props) => {
      return {"lrNo":selected};
    });
    setTimeout(function(){
      fetchTableData.call(that);
    },300);
  /*  let data = this.props.payment && this.props.payment.rows ;
    let arr = [];
    let finalData = data.filter(function(el){
      return el.lr_no!=event.target.getAttribute("dataid")
    })
    this.props.updatePaymentData({
                "columns": this.props.payment.columns,
                "rows": finalData
              });
    this.setState((prevState, props) => {
      return {"displayLrs":true};
    });
    for(var j=0;j < finalData.length; j++){
      arr.push(finalData[j].lr_no);
    }
    this.setState((prevState, props) => {
      return {"selectedLrs":arr};
    });*/
  }
}

function saveRef(action, event){
  var that = this;
  event.preventDefault();
  let status = this.state.status && this.state.status.value;
  let value;
  if(action && action == "update"){
    value = this.state.existingRef.value;
  }else{
    value = this.state.newRef;
  }
  var data = {
        "status" : (status=="all" ? "": status),
        "transporter":(this.state.selectedTransporter && this.state.selectedTransporter.value ? this.state.selectedTransporter.value: ""),
        "lr_no":  this.state.lrNo && this.state.lrNo.map(function(item){return item.label}).join(','),
        "startdate":  this.state.startDate && moment(this.state.startDate,'DD/MM/YYYY').format("YYYY-MM-DD"),
        "enddate":  this.state.endDate && moment(this.state.endDate,'DD/MM/YYYY').format("YYYY-MM-DD"),
        "removedLrs":  this.state.deletedLrs.join(','),
        "name": value,
        "date": moment(new Date()).format("DD/MM/YYYY"),
        "action": action
      }
  Utils.fetchService.call(this, {
      "method": "POST",
      "url": Apis.savePaymentRef,
      "body": JSON.stringify({
        "data": data
      }),
      "callBack": (data) => {
        that.setState((prevState, props) => {
          return {"refType":"new"};
        });
        fetchData.call(that,"getReferences")
        onCloseModal.call(that,"refModal")
      }
  });

}
function copyToAll(event){
  if(event.target.checked){
    this.setState((prevState, props) => {
      return {"copyToAll":true};
    });
  }else{
    this.setState((prevState, props) => {
      return {"copyToAll":false};
    });
  }

}
export default {
    fetchData,
    updateSelectedOption,
    handleChange,
    fetchTableData,
    performAction,
    submitChange,
    onEditDate,
    onDateChange,
    openModal,
    onAddMultipleDate,
    onCloseModal,
    handleColor,
    copyToAll,
    handleSelection,
    saveRef
}
