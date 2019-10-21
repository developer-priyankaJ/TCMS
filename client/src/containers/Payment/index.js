import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './actions';
import Handler from './handler';
import * as FormActions from '../TransportEntry/actions';
import Loaders from '../Loader';
import Modal from 'react-responsive-modal';
import * as LoaderAction from '../Loader/actions';
import DivTable from '../../components/grid/DivTable.jsx';
import Calendar from 'react-input-calendar';
import RaisedButton from 'material-ui/RaisedButton';
import Select from 'react-select';
import moment from 'moment';
import 'react-select/dist/react-select.css';
import '../../assets/css/payment.scss';
import ExportToExcel from '../../components/ExportToExcel.jsx';

class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "selectedTransporter":"",
      "editModal" : false,
      "displayLrs" : false,
      "receiveDateModal" : false,
      "editData":{
        "key":"",
        "id": "",
        "value": "",
        "display": "",
        "type": ""
      },
      "editElem": "",
      "dateArray": [],
      "status":{
        "value": "all",
        "label" : "All"
      },
      "billDate": moment(new Date()).format("DD/MM/YYYY"),
      "startDate": '',
      "endDate": '',
      "lrNo": [],
      "rd_bales": "",
      "rd_dates": "",
      "rd_lrNo": "",
      "deletedLrs": [],
      "selectedLrs": "",
      "reference": "",
      "refType": "new",
      "newRef": "",
      "existingRef": "",
      "refModal": false,
      "copyToAll": false,
    };
    this.child = React.createRef();
    Handler.updateSelectedOption = Handler.updateSelectedOption.bind(this);
    Handler.fetchData = Handler.fetchData.bind(this);
    Handler.handleChange = Handler.handleChange.bind(this);
    Handler.openModal = Handler.openModal.bind(this);
    Handler.onCloseModal = Handler.onCloseModal.bind(this);
    Handler.fetchTableData = Handler.fetchTableData.bind(this);
    Handler.onEditDate = Handler.onEditDate.bind(this);
    Handler.onDateChange = Handler.onDateChange.bind(this);
    Handler.submitChange = Handler.submitChange.bind(this);
    this.renderReceiveDateRows = this.renderReceiveDateRows.bind(this);
    Handler.onAddMultipleDate = Handler.onAddMultipleDate.bind(this);
    Handler.saveRef = Handler.saveRef.bind(this);
    Handler.copyToAll = Handler.copyToAll.bind(this);
    this.displaySelectedLrs = this.displaySelectedLrs.bind(this);
    this.displaySaveRefBtn = this.displaySaveRefBtn.bind(this);
    Handler.handleSelection = Handler.handleSelection.bind(this);
    this.showRefFields = this.showRefFields.bind(this);
  }

  componentDidMount() {
     Handler.fetchData();
     Handler.fetchTableData();
  }

  componentWillUnmount(){

  }
  displaySelectedLrs(){
      var data = this.props.payment && this.props.payment.rows;
      let arr =[];
      let elem = "";
      if(this.state.displayLrs && data && data.length > 0){
        for(var j=0;j < data.length; j++){
          let item = <button type="button" key={25*j} className="btn btn-default btn-sm">{data[j].lr_no}<span dataid={data[j].lr_no} className="close" onClick={Handler.handleSelection}></span></button>
          arr.push(item);
        }
        elem = <div><span className="label display-inline selectedlist-label"><label>Selected Lrs:</label></span>
                        <div className="display-inline selectedlist">{arr}</div>
                   </div>
      }
      return elem;
  }
  showRefFields(){
     let elem = "";
     if(this.state.refType == "new"){
       elem = <div>
                 <hr/>
                 <form onSubmit={(event) => Handler.saveRef("new",event)}>
                 <div className="lr-search">
                       <div className="display-inline section bm-type_refmodal">
                         <span className="label display-inline"><label>Ref Name :</label></span>
                         <input autoFocus type="text" name="newRef" value={this.state.newRef} className="field-divided ref-name" maxLength="16" onChange={(event) => Handler.updateSelectedOption( event.target.value, "newRef")} />
                       </div>
                       <div className="text-center"><RaisedButton type="submit" label="Submit" primary /></div>
                  </div>
                  </form>
              </div>
     }else{
       elem = <div>
                 <hr/>
                 <form onSubmit={(event) => Handler.saveRef("update",event)}>
                 <div className="lr-search">
                     <div className="display-inline section bm-type_refmodal">
                       <span className="label display-inline"><label>Ref Name :</label></span>
                       <Select
                         className="field-select display-inline ref-name"
                         name="existingRef"
                         value={this.state.existingRef}
                         onChange={(event) => Handler.updateSelectedOption(event, "existingRef")}
                         options={this.props.formData.references}
                       />
                     </div>
                     <div className="text-center"><RaisedButton type="submit" label="Submit" primary /></div>
                 </div>
                 </form>
              </div>
     }
     return elem;
  }
  renderReceiveDateRows(){
    let bales = this.state.rd_bales.indexOf(',') > 0 ? this.state.rd_bales.split(',') : [this.state.rd_bales];
    let dates = "", elem = "", rows=[], obj=[];
    if(this.state.rd_dates && this.state.rd_dates.indexOf(' - ') > 0){
      dates = (this.state.rd_dates.indexOf(',') > 0) ? this.state.rd_dates.split(", ") : [this.state.rd_dates];
        for(let j=0;j<dates.length;j++){
          let item = {
            "key":dates[j].split(" - ")[0],
            "value": dates[j].split(" - ")[1],
          }
          obj.push(item);
        }
    }
    for(let i=0;i<bales.length;i++){
      let childElem = "";
      let val = obj && obj.filter(function(item){
        return item.key == bales[i]
      })
      if(val && val.length > 0){
          childElem = <span className="display-inline single-receive-date">{[val[0].value]}</span>;
      }else{
          childElem = <Calendar required format='DD/MM/YYYY'  closeOnSelect={true} hideTodayButton={true} computableFormat={'DD/MM/YYYY'} inputName={bales[i]}  onBlur={(event) => Handler.onDateChange(event.target.name,event.target.value,"multiAdd")} />
      }
      elem = <div key={i*9}><span className="label display-inline"><label>{bales[i]} :</label></span>
                {childElem}
              </div>
      rows.push(elem);
    }
    return rows;
  }
  displaySaveRefBtn(){
    let elem = "";
    if(this.state.displayLrs){
      elem = <div className="display-inline saveRef last-field">
          <RaisedButton type="submit" label="Save Ref" primary onClick={(event)=> Handler.openModal("refModal")/*Handler.saveRef(event)*/} />
      </div>
    }
    return elem;
  }
  render() {
    let status = [{
      "value": "paid",
      "label" : "Paid"
    },{
      "value": "unpaid",
      "label" : "UnPaid"
    },{
      "value": "all",
      "label" : "All"
    }];
    return (
      <div className="">
        <div className="heading bm-type_widget"><h5>Master Payment</h5></div>
        <hr/>
        <div className="display-inline payment-display">
          <div className="lr-search">
                <div className="display-inline section">
                  <span className="label display-inline"><label>Transporter</label></span>
                  <Select
                    className="field-select display-inline"
                    name="selectedTransporter"
                    required
                    value={this.state.selectedTransporter}
                    onChange={(event) => Handler.updateSelectedOption(event, "selectedTransporter")}
                    options={this.props.formData.transporters}
                  />
                </div>
                <div className="display-inline section status">
                  <span className="label display-inline"><label>Payment Status</label></span>
                  <Select
                    className="field-select display-inline"
                    name="status"
                    required
                    value={this.state.status}
                    onChange={(event) => Handler.updateSelectedOption(event, "status")}
                    options={status}
                  />
                </div>
                <div className="display-inline date-section">
                  <span className="label "><label>From</label></span>
                 <Calendar required format='DD/MM/YYYY' date={this.state.startDate} closeOnSelect={true} hideTodayButton={true}
                           maxDate={this.state.startDate} computableFormat={'DD/MM/YYYY'} inputName="startDate"
                           onBlur={(event) => Handler.handleChange(event.target.value, event.target.name)} />
                </div>
                <div className="display-inline date-section space-20">
                  <span className="label "><label >To</label></span>
                 <Calendar required format='DD/MM/YYYY' date={this.state.endDate} closeOnSelect={true} hideTodayButton={true}
                           maxDate={this.state.endDate} computableFormat={'DD/MM/YYYY'} inputName="endDate"
                           onBlur={(event) => Handler.handleChange(event.target.value, event.target.name)} />
                </div>
                <div className="display-inline combo-section space-20">
                  <span className="label display-inline"><label>Lr No</label></span>
                  <Select
                    className="field-select display-inline"
                    name="lrNo"
                    required
                    multi={true}
                    value={this.state.lrNo}
                    onChange={(event) => Handler.updateSelectedOption(event, "lrNo")}
                    options={this.props.formData.lr_nos}
                  />
                </div>
                <div className="display-inline ref-section space-20">
                  <span className="label display-inline"><label>Reference</label></span>
                  <Select
                    className="field-select display-inline"
                    name="reference"
                    value={this.state.reference}
                    onChange={(event) => Handler.updateSelectedOption(event, "reference")}
                    options={this.props.formData.references}
                  />
                </div>
                <div className="display-inline copy space-20 ">
                    <input type="checkbox" id="copyToAll" className="copyCheckBox" name="copyToAll" value={this.state.copyToAll} onClick={(event)=>Handler.copyToAll(event)}/>copy To All
                </div>
                {this.displaySaveRefBtn()}
                <span className="export"><ExportToExcel columns={this.props.payment.columns} data={this.props.payment.rows}/></span>
          </div>
          {this.displaySelectedLrs()}
          <div className="bales-table">
            <DivTable ref={this.child} colorcode={true} colorFunc={Handler.handleColor} dashboard={true} ref={this.child}
                      includeClickFunc={false} onEditDate={Handler.onEditDate} onAddMultipleDate={Handler.onAddMultipleDate}
                      data={this.props.payment && this.props.payment.rows} onDateChange={Handler.onDateChange} includeSelection={Handler.handleSelection}
                      headers={this.props.payment && this.props.payment.columns} onSubmit={Handler.submitChange}/>
          </div>
        </div>
        <Modal className="modal" open={this.state.editModal} onClose={(event) => Handler.onCloseModal("editModal")} >
            <div>
              <form onSubmit={(event) => Handler.submitChange(this.state.editData.id, "edit", event)}>
                <h3 className="heading">Edit Date</h3>
                <hr/>
                <div className="lr-search">
                      <div className="display-inline section bm-type_modal">
                        <span className="label display-inline"><label>{this.state.editData.display} :</label></span>
                        <Calendar required format='DD/MM/YYYY' date={this.state.editData.value} closeOnSelect={true} hideTodayButton={true} computableFormat={'DD/MM/YYYY'} inputName={"edit"} onBlur={(event) => Handler.onDateChange(this.state.editData.key, event.target.value, "edit")} />
                      </div>
                      <div className="text-center"><RaisedButton type="submit" label="Submit" primary /></div>
                 </div>
              </form>
            </div>
        </Modal>
        <Modal className="modal" open={this.state.refModal} onClose={(event) => Handler.onCloseModal("refModal")} >
            <div className="refModal">
                <h3 className="heading">Save Reference</h3>
                <hr/>
                <div className="lr-search">
                    <div className="display-inline type first">
                        <input className="display-inline" name="refType" type="radio" value="new" checked={this.state.refType === "new"} onChange={(event) => Handler.updateSelectedOption( event.target.value, "refType")} />
                        <label className="display-inline" htmlFor="autoIncrement">New ref</label>
                    </div>
                    <div className="display-inline type">
                         <input className="display-inline" name="refType" type="radio" value="existing" checked={this.state.refType === "existing"} onChange={(event) => Handler.updateSelectedOption(event.target.value, "refType")} />
                         <label className="display-inline" htmlFor="allSame">Existing Ref</label>
                    </div>
                 </div>
                 {this.showRefFields()}
            </div>
        </Modal>
        <Modal className="modal" open={this.state.receiveDateModal} onClose={(event) => Handler.onCloseModal("receiveDateModal")} >
            <div>
              <form onSubmit={(event) => Handler.submitChange("", "multiAdd", event)}>
                <h3 className="heading">Add receive Date</h3>
                <hr/>
                <div className="lr-search">
                      <div className="display-inline section bm-type_modal">
                        {this.renderReceiveDateRows()}
                      </div>
                      <div className="text-center"><RaisedButton type="submit" label="Submit" primary /></div>
                 </div>
              </form>
            </div>
        </Modal>
        <Loaders/>
      </div>
    )
}
}

const mapStateToProps = (state, ownProps) => {
  return {
    "formData": state.entryFormData,
    "payment": state.payment
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({},Actions, LoaderAction,FormActions), dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment);
