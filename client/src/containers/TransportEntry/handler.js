import { Labels, Apis, Keys } from '../../constants';
import * as Utils from '../../utils';
import * as utility from '../../utils/utility.js';
import moment from 'moment';

function fetchData( keys, identifier, id){
    let that = this,
        actions = keys ? keys : ["getParties", "getTransporters", "getStates", "getCities"];

    Utils.fetchService.call(this, {
        "method": "POST",
        "url": Apis.entryFormData,
        "body": JSON.stringify({
            "action": actions
        }),
        "callBack": (data) => {
              that.props.updateData(data);
              if(that.state.editId){
                  updateEditData.call(that, that.state.editId.replace(":",''));
              }
              if(identifier){
                var obj = that.state[identifier];
                var arr = data[Keys[identifier]];
                var result = arr.filter(function( item ) {
                    return item.label === utility.toTitleCase(id);
                });
                obj["label"] = result[0].label;
                obj["value"] = result[0].value;

                that.setState((prevState, props) => {
                  return { obj }
                });
              }
        }
      });

}

function updateBales(){
    let nanCheck = isNaN( parseInt(this.state.bale_no));
    let initialNo = nanCheck ? this.state.bale_no : parseInt(this.state.bale_no);
    let qty = parseInt(this.state.qty);
    let baleType = this.state.baleType;

    if(!this.state.qty || this.state.qty == 0){
      openBaleDetails.call(this,"off");
    }else{
      openBaleDetails.call(this,"on");
    }

    if(qty && baleType){
      let baleNos = (this.state.bale_no == "") ? "" : initialNo, count = 1, nextNo = (this.state.bale_no == "") ? "" : initialNo;
      this.setState((prevState, props) => {
        return { "NANCheck": nanCheck }
      });

      if(baleType === "manual"){
        this.setState((prevState, props) => {
          return { "isBaleDisabled": false }
        });
        while(count < qty){
          baleNos = baleNos + "," + nextNo;
          count++;
        }
      }else{
        this.setState((prevState, props) => {
          return { "isBaleDisabled": true }
        });
       if(baleType === "autoIncrement" ){
         if(nextNo){
           while(count < qty){
             nextNo = nextNo + 1;
             baleNos = baleNos + "," + nextNo;
             count++;
           }
         }
      }else if(baleType === "allSame"){
        while(count < qty){
          baleNos = baleNos + "," + nextNo;
          count++;
        }
      }
    }
      this.setState((prevState, props) => {
        return { "bales": baleNos }
      });
      handleBaleDetails.call(this,"baleno",baleNos.toString().split(','))
    }

}

function updateSelectedOption(data, type){
  this.setState((prevState, props) => {
    return {[type]:data};
  });
  if(this.state.editId){
    var editFields = this.state.editFields;
    if(editFields.indexOf(type) < 0){
      editFields.push(type);
      this.setState((prevState, props) => {
        return { editFields }
      });
    }
  }
  var that = this;
  if(type==="selectedParty" && data){
    Utils.fetchService.call(this, {
        "method": "POST",
        "url": Apis["selectedParty"],
        "body": JSON.stringify({"id" : data.value}),
        "callBack": (result) => {
          if(result.success){
            let item = result.data[0].city;
            if(item){
              item = JSON.parse(item);
              that.setState((prevState, props) => {
                return {"booking_stn":item};
              });
            }
          }
        }
      })
  }
}

function updateTotal(name, value){
    let totalAmt = 0,
        that = this;
    that.setState((prevState, props) => {
      return { [name]: value }
    });
    if(this.state.editId){
      var editFields = this.state.editFields;
      if(editFields.indexOf(name) < 0){
        editFields.push(name);
        this.setState((prevState, props) => {
          return { editFields }
        });
      }
    }
    if(name == "cgst"){
      that.setState((prevState, props) => {
        return { "sgst": value }
      });
    }
    setTimeout(function(){
      totalAmt = Number(that.state.amount) + Number(that.state.cgst) + Number(that.state.sgst) + Number(that.state.igst) ;
      that.setState((prevState, props) => {
        return { total: Math.round(totalAmt) }
      });
    }, 10);
}

function handleInputChange(name, value, update, state){
  if(this.state.editId){
    var editFields = this.state.editFields;
    if(editFields.indexOf(name) < 0){
      editFields.push(name);
      this.setState((prevState, props) => {
        return { editFields }
      });
    }
  }
  if(update && (update==="newParty" || update==="newTransporter") ){
    var obj = this.state[update];
    this.setState((prevState, props) => {
      return { "errors":{} }
    });
    if(name=="city"){
        var str = this.props.formData.cities.find(function( obj ) {
                    return obj.value == value;
                 });
       var stateName = this.props.formData.states.find(function( obj ) {
                   return obj.value == state;
                });
        obj[name] = {
          "value": value,
          "label": str.label
        };
        obj["state"] = {
          "value": value,
          "label":stateName.label
        };
    }else{
        obj[name] = value;
    }
    this.setState((prevState, props) => {
      return { obj }
    });
  }else{
    this.setState((prevState, props) => {
      return { [name]: value }
    });
  }

  if(update && update==="updateBale"){
    var that = this;
    setTimeout(function(){
      updateBales.call(that);
    },200);
  }
}

function resetFields(type){
  var obj = this.state[type];
  if(type==="newParty" || type==="newTransporter"){
    obj = {
      name: "",
      city: "",
      state:"",
      phone:"",
      gstn_no:""
    }
  }
  this.setState((prevState, props) => {
    return { obj }
  });
}

function onOpenModal(key, action){
  var that = this,
      selectedItem = this.state[Keys[key]];
      if(action==="edit" && !(selectedItem && selectedItem.value)){
        alert("Please select some name from dropdown to edit");
        return;
      }else{
        if(selectedItem && selectedItem.value && action==="edit"){
          this.setState((prevState, props) => {
            return { modalAction: "edit" }
          });
          Utils.fetchService.call(this, {
              "method": "POST",
              "url": Apis[Keys[key]],
              "body": JSON.stringify({"id" : selectedItem.value}),
              "callBack": (result) => {
                if(result.success){
                    if(key==="partyModal"){
                        var obj = this.state.newParty;
                        obj["name"]= result.data[0].name ? result.data[0].name : "";
                        obj["city"]= result.data[0].city ? JSON.parse(result.data[0].city) : "";
                        obj["state"]= result.data[0].state ? JSON.parse(result.data[0].state) : "";
                        obj["phone"]= result.data[0].phone_no ? result.data[0].phone_no : "";
                        obj["gstn_no"]= result.data[0].gstn_no ? result.data[0].gstn_no : "";
                        this.setState((prevState, props) => {
                          return { obj }
                        });

                    }else if(key==="transporterModal"){
                        var obj = this.state.newTransporter;
                        obj["name"]= result.data[0].name ? result.data[0].name : "";
                        obj["city"]= result.data[0].city ? JSON.parse(result.data[0].city) : "";
                        obj["state"]= result.data[0].state ? JSON.parse(result.data[0].state) : "";
                        obj["phone"]= result.data[0].phone_no ? result.data[0].phone_no : "";
                        obj["gstn_no"]= result.data[0].gstn_no ? result.data[0].gstn_no : "";
                        this.setState((prevState, props) => {
                          return { obj }
                        });
                    }
                }
              }
          });
        }else{
          if(key==="partyModal"){
              var obj = this.state.newParty;
              obj["name"]=  "";
              obj["city"]=  "";
              obj["state"]=  "";
              obj["phone"]=  "";
              obj["gstn_no"]=  "";
              this.setState((prevState, props) => {
                return { obj }
              });

          }else if(key==="transporterModal"){
              var obj = this.state.newTransporter;
              obj["name"]=  "";
              obj["city"]=  "";
              obj["state"]= "";
              obj["phone"]= "";
              obj["gstn_no"]=  "";
              this.setState((prevState, props) => {
                return { obj }
              });
          }
        }
        this.setState((prevState, props) => {
          return {[key]:true}
        });
      }


}
function onCloseModal(key){
    this.setState((prevState, props) => {
      return { [key]: false }
    });
    this.setState((prevState, props) => {
      return { modalAction: "new" }
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
    if(name==="billDate"){
      this.setState((prevState, props) => {
        return {"bilty_date":newDate};
      });
    }
    if(this.state.editId){
      var editFields = this.state.editFields;
      if(editFields.indexOf(name) < 0){
        editFields.push(name);
        this.setState((prevState, props) => {
          return { editFields }
        });
      }
    }
}

function handleModalSubmit(event, type, modalId){
   event.preventDefault();
   var obj = this.state[type];
   var that = this, actionType = "ADD", id = "", duplicate=[];
   if(this.state[Keys[modalId]] && this.state[Keys[modalId]].value && this.state.modalAction === "edit"){
      actionType = "UPDATE";
      id = this.state[Keys[modalId]].value;
   }else{
    let arr = (type==="newParty") ? this.props.formData.parties : this.props.formData.transporters;
    if(arr && arr.length > 0){
      duplicate = arr.filter(function(el){
         return el.label.toLowerCase() == obj.name.toLowerCase()
       })
    }
   }
   if(duplicate.length == 0){
     Utils.fetchService.call(this, {
         "method": "POST",
         "url": Apis[type],
         "body": JSON.stringify({"data":obj, "action":actionType, "id":id}),
         "callBack": (result) => {
           if(result.success){
             that.setState((prevState, props) => {
               return { "showMessage": true }
             });
             setTimeout(function(){
                var action = "";
                resetFields.call(that,type);
                if(that.state.modalAction === "edit"){
                  var data = that.state[Keys[modalId]];
                  data.label = obj.name;
                  that.setState((prevState, props) => {
                    return { data }
                  });
                }
                that.setState((prevState, props) => {
                  return {"errors":{}};
                });
                onCloseModal.call(that,modalId);
                if(modalId === "partyModal"){
                  action = "getParties";
                  that.setState((prevState, props) => {
                    return {"booking_stn":obj.city};
                  });
                }else if(modalId === "transporterModal"){
                  action = "getTransporters";
                }
                that.setState((prevState, props) => {
                  return { "showMessage": false }
                });
                fetchData.call(that, [action], Keys[modalId], obj.name);
             },200);
           }
         }
     });
   }else{
       resetFields.call(that,type);
       var obj = {
         "summary":"This entry is already present. please change the name."
       }
       that.setState((prevState, props) => {
         return { "errors": obj }
       });
   }

}
function handleSubmit(event){
  event.preventDefault();
  var editFields = this.state.editFields;
  var txt;
  var r = window.confirm("Do you really want to submit the form ?");
  if (r == true) {
    if(this.state.editId && editFields.length == 0){
      alert("Please edit some field to proceed.")
    }else{
      submitData.call(this);
    }
  }
}
function submitData(){
    let baleDetails = "";
    if(this.state.baleDetails.baleno && this.state.baleDetails.baleno.length > 0 && this.state.baleDetails.baleno[0]){
      baleDetails = this.state.baleDetails;
    }
    let data = {
      "invoice_no": this.state.invoice_no,
      "item_desc": this.state.item_desc,
      "party": this.state.selectedParty.value,
      "amount": this.state.amount,
      "cgst": this.state.cgst,
      "igst": this.state.igst,
      "sgst": this.state.sgst,
      "total": this.state.total,
      "date": this.state.billDate,
      "bales": this.state.bales,
      "qty": this.state.qty,
      "transporter": this.state.selectedTransporter.value,
      "baleType": this.state.baleType,
      "lr_no": this.state.lr_no,
      "bilty_date": this.state.bilty_date,
      "booking_stn": this.state.booking_stn.value,
      "weight": this.state.weight,
      "freight": this.state.freight,
      "eway_no": this.state.eway_no,
      "baledetails": this.state.baleDetails,
      "action": "add"
    }
    if(this.state.editId){
      var editFields = this.state.editFields;
        let obj = {};
        let info=[];
        for(let i=0;i<editFields.length;i++){
          if(editFields[i] == "selectedParty"){
            obj["party"] = data.party;
          }else if(editFields[i] == "selectedTransporter"){
              obj["transporter"] = data.transporter;
          }else if(editFields[i] == "billDate"){
              obj["date"] = data.date;
          }else if((editFields[i]).indexOf("baleDetails")>-1){
              let arr = editFields[i].split('_');
              let item = { "key":"", "value":"","id":"" };
              let key=arr[1];
              if(arr[1] == "desc"){
                  key = "bale_desc";
              }else if(arr[1] == "baleno"){
                  key = "bale_no"
              }
              item.key = key;
              item.value = data.baledetails[arr[1]][arr[2]];
              item.id = data.baledetails['id'][arr[2]];
              info.push(item);
              obj["baledetails"] = info;
          }else{
              obj[editFields[i]] = data[editFields[i]];
          }
      }
      obj.action = "edit";
      obj.id = this.state.editId;
      data = obj;
    }
    Utils.fetchService.call(this, {
        "method": "POST",
        "url": Apis.submitEntry,
        "body": JSON.stringify(data),
        "callBack": (result) => {
          if(result.success){
            if(this.state.editId){
              this.props.history.push('/search')
            }else{
              setTimeout(function(){
                window.location.reload();
              },300);
            }
          }
        }
      });
}
function openBaleDetails( status ){
    var val = status ? status : "off";
    this.setState((prevState, props) => {
      return { "baleDetailsStatus": val }
    });
    var that = this;
    setTimeout(function(){
      that.submitButton.scrollIntoView({ behavior: 'smooth' });
    },500);
}
function handleBaleDetails(name,value){
   let str = name && name.split("_");
   var data = this.state.baleDetails[str[0]];
   if(this.state.editId){
     var editFields = this.state.editFields;
     if(editFields.indexOf('baleDetails_'+name) < 0){
       editFields.push('baleDetails_'+name);
       this.setState((prevState, props) => {
         return { editFields }
       });
     }
   }
   if(str[1]){
     data[str[1]] = value;
   }else{
     for(var i=0; i<value.length;i++){
       data[i] = value[i]
     }
   }

   this.setState((prevState, props) => {
     return { data }
   });
}

function updateEditData(id){
  var that = this;
  Utils.fetchService.call(this, {
      "method": "POST",
      "url": Apis.fetchEditEntry,
      "body": JSON.stringify({"id":id}),
      "callBack": (data) => {
        if(data.success){
          let partyObj = that.props.formData.parties.filter(function(elem){
            return elem.value === data.data.party
          })
          let transporterObj = that.props.formData.transporters.filter(function(elem){
            return elem.value === data.data.transporter
          })
          let bookingObj = that.props.formData.cities.filter(function(el){
            return el.value == data.data.booking_stn
          })
          if((data.data.bale_no && data.data.bale_no.length >0) || (data.data.bale_desc && data.data.bale_desc.length >0) || (data.data.qty && data.data.qty.length >0) || (data.data.bale_freight && data.data.bale_freight.length >0)){
            let baleDetails = that.state.baleDetails;
            baleDetails.baleno = data.data.bale_no && data.data.bale_no.split(',');
            baleDetails.desc = data.data.bale_desc && data.data.bale_desc.split(',');
            baleDetails.qty = data.data.qty && data.data.qty.split(',');
            baleDetails.freight = data.data.bale_freight && data.data.bale_freight.split(',');
            baleDetails["id"] = data.data.bale_id && data.data.bale_id.split(',');
            this.setState((prevState, props) => {
              return { baleDetails }
            });
          }
          that.setState((prevState, props) => {
            return {
              "invoice_no":data.data.invoice_no,
              "item_desc": data.data.item_desc,
              "selectedParty":partyObj[0],
              "amount":parseInt(data.data.amount),
              "cgst": parseInt(data.data.cgst),
              "igst":parseInt(data.data.igst),
              "sgst":parseInt(data.data.sgst),
              "total": parseInt(data.data.total),
              "billDate":data.data.bill_date,
              "qty":parseInt(data.data.bale_qty),
              "bale_no":data.data.bale_numbers,
              "baleType": data.data.bale_type,
              "bilty_date":data.data.bilty_date,
              "weight":data.data.weight,
              "freight": data.data.freight,
              "eway_no":data.data.eway_no,
              "lr_no":data.data.lr_no,
              "selectedTransporter": transporterObj[0],
              "booking_stn":bookingObj[0]
              }
          });
          if(!data.data.bale_qty || data.data.bale_qty == 0){
            openBaleDetails.call(this,"off");
          }else{
            openBaleDetails.call(this,"on");
          }
        }
      }
    });

}
export default {
    updateTotal,
    fetchData,
    handleInputChange,
    updateSelectedOption,
    updateBales,
    handleSubmit,
    handleModalSubmit,
    resetFields,
    onOpenModal,
    onCloseModal,
    handleChange,
    openBaleDetails,
    handleBaleDetails,
    updateEditData
}
