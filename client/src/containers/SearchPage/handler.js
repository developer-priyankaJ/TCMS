import { Apis } from '../../constants';
import * as Utils from '../../utils';

function fetchData(){
  let that = this;
  console.log("step 3");
  this.ajaxCall = Utils.fetchService.call(this, {
      "method": "POST",
      "url": Apis.gridData,
      "body": JSON.stringify({
          "columnType": "transportentry",
          "dataType": "getAllSearchData"
      }),
      "callBack": (data) => {
          addActionRow.call(that, data.columns);
          that.props.updateData(data);
      }
    });
}
function editData(id){
    sessionStorage.setItem('selectedMenu', JSON.stringify({"key":"entryMaster"}));
    this.props.history.push('/home:'+id.replace(/\//g,"---"))
}
function addActionRow ( columns ){
    let obj = {
      "field" :"",
      "headerName": "Actions",
      "pinned": 'right',
      "hiddenForExcel":true,
      "suppressFilter":true,
      "width":90,
      "cellRenderer": 'actionsCellRenderer'
    };
    columns.push(obj)
}

function deleteData(id){
  let that = this;
  var r = window.confirm("Do you really want to delete this data ?");
  if (r == true) {
    Utils.fetchService.call(this, {
        "method": "POST",
        "url": Apis.deleteGridData,
        "body": JSON.stringify({
            "table": "transportentry",
            "key": "lr_no",
            "value": id
        }),
        "callBack": (data) => {
          var selectedData = that.gridApi.getSelectedRows();
          that.gridApi.updateRowData({ remove: selectedData });
        }
      });
  } else {

  }
}
function handleExport(){
  var params = {
     customHeader: false,
     customFooter:false
   };
  params.customHeader = "[[[ This ia s sample custom header - so meta data maybe?? ]]]\n";
  params.customFooter = "[[[ This ia s sample custom footer - maybe a summary line here?? ]]]\n";

}

function openModal(type){
  this.setState((prevState, props) => {
    return { [type]: true }
  });
}

function submitBaleDates(event, dates){
  event.preventDefault();
  var that = this;
  Utils.fetchService.call(this, {
      "method": "POST",
      "url": Apis.submitBaleDates,
      "body": JSON.stringify({
          "data": dates
      }),
      "callBack": (data) => {
        onCloseModal.call(that,"balesModal");
      }
    });
}
function getCustomColumnsData(){
  var that = this;
  Utils.fetchService.call(this, {
      "method": "POST",
      "url": Apis.getCustomColumns,
      "body": JSON.stringify({
          "table": "transportentry"
      }),
      "callBack": (data) => {
        that.setState((prevState, props) => {
          return { "customColumns": data.data }
        });

      }
    });
}
function handleColVisibility( type ){
  var that = this;
    var hiddenColumns = this.state.customColumns.filter(function(item){
        return item.status === "false"
    })
    if(hiddenColumns && hiddenColumns.length>0){
      hiddenColumns.forEach(function(item){
         that.columnApi.setColumnVisible(item.name, false);
      })
    }
    if(!type){
      var visibleColumns = this.state.customColumns.filter(function(item){
          return item.status === "true"
      })
      if(visibleColumns && visibleColumns.length>0){
        visibleColumns.forEach(function(item){
           that.columnApi.setColumnVisible(item.name, true);
        })
      }
    }
    //this.columnApi.sizeColumnsToFit();
}
function onCloseModal(type){
  this.setState((prevState, props) => {
    return { [type]: false }
  });
}
function handleModalSubmit(event){
    event.preventDefault();
    var arr = this.state.customColumns.filter(function(item){
       return item.modified == "true";
    });
    var that = this;
    Utils.fetchService.call(this, {
        "method": "POST",
        "url": Apis.setCustomColumns,
        "body": JSON.stringify({
            "table": "transportentry",
            "data": arr
        }),
        "callBack": (data) => {
           handleColVisibility.call(that);
           onCloseModal.call(that,"columnsModal");
        }
      });

}
function onCustomColChange( event, checked ){
  var obj = this.state.customColumns;
  var outputArray = obj.forEach(function(item){
    if(item.id==event.target.id){
        item.status = checked.toString();
        item.modified = 'true';
    }
  })
  this.setState((prevState, props) => {
    return { outputArray }
  });

}

function fetchBalesData(key){
  let that = this;
  this.ajaxCall = Utils.fetchService.call(this, {
      "method": "POST",
      "url": Apis.gridData,
      "body": JSON.stringify({
          "columnType": "baledetails",
          "data": {"lrNo": key}
      }),
      "callBack": (data) => {
          that.props.updateBalesData(data);
      }
    });
}
export default {
    fetchData,
    deleteData,
    editData,
    handleExport,
    openModal,
    onCloseModal,
    handleModalSubmit,
    onCustomColChange,
    getCustomColumnsData,
    handleColVisibility,
    fetchBalesData,
    submitBaleDates
}
