import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './actions';
import * as FormActions from '../TransportEntry/actions';
import Handler from './handler';
import Loaders from '../Loader';
import * as LoaderAction from '../Loader/actions';
import DivTable from '../../components/grid/DivTable.jsx';
import Calendar from 'react-input-calendar';
import RaisedButton from 'material-ui/RaisedButton';
import Select from 'react-select';
import moment from 'moment';
import 'react-select/dist/react-select.css';
import '../../assets/css/payment.scss';


class PaymentEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTransporter:{},
      transportersearch:{},
      amount:0,
      tds:0,
      total:0,
      chequeNo:"",
      editEnabled:false,
      editId:"",
      remarks:"",
      searchMode:[],
      selectedMode:{
        "value": "neft",
        "label":"Neft"
      },
      billDate: moment(new Date()).format("DD/MM/YYYY"),
      startDate: '',
      endDate: ''
    };
    this.changedFields = [];
    this.field = React.createRef();
    Handler.updateSelectedOption = Handler.updateSelectedOption.bind(this);
    Handler.fetchData = Handler.fetchData.bind(this);
    Handler.handleChange = Handler.handleChange.bind(this);
    Handler.submitData = Handler.submitData.bind(this);
    Handler.fetchTableData = Handler.fetchTableData.bind(this);
    Handler.performAction = Handler.performAction.bind(this);
  }

  componentDidMount() {
         Handler.fetchData();
         Handler.fetchTableData();
  }

  componentWillUnmount(){
    console.log("unmounting...........DatyeEntry page")
  }
  render() {
    let paymentModes = [{
      "value": "cash",
      "label" : "Cash"
    },{
      "value": "cheque",
      "label" : "Cheque"
    },{
      "value": "neft",
      "label" : "Neft"
    }];
    return (
      <div className="">
        <div className="heading bm-type_widget"><h5>Master Payment</h5></div>
        <hr/>
        <div className="display-inline data-entry">
          <div className="entry-form ">
              <div className="payment-entry-row">
                <ul className="entry-form ">
                  <li className="display-inline date">
                    <label>Date<span className="required">*</span></label>
                   <Calendar required format='DD/MM/YYYY' date={this.state.billDate} closeOnSelect={true} hideTodayButton={true} maxDate={this.state.billDate} computableFormat={'DD/MM/YYYY'} inputName="billDate" onBlur={(event) => Handler.handleChange(event.target.value, event.target.name)} />
                  </li>
                  <li className="display-inline transporter-combo">
                    <label>Transporter<span className="required">*</span></label>
                      <Select
                      className="field-select display-inline"
                        name="transporter"
                        required
                        value={this.state.selectedTransporter}
                        onChange={(event) => Handler.updateSelectedOption(event, "selectedTransporter")}
                        options={this.props.formData.transporters}
                      />
                  </li>
                </ul>
              </div>
              <div className="payment-entry-row">
                <ul className="entry-form ">
                  <li className="display-inline mode">
                      <label>Mode of Payment<span className="required">*</span></label>
                      <Select
                        className="field-select display-inline"
                        name="paymentMode"
                        required
                        value={this.state.selectedMode}
                        onChange={(event) => Handler.updateSelectedOption(event, "selectedMode","showField")}
                        options={paymentModes}
                      />
                  </li>
                  <li className="display-inline chequeNo" ref={this.field}>
                    <label>Cheque No</label>
                    <input  name="chequeNo" value={this.state.chequeNo}  type="text" onChange={(event) => Handler.updateSelectedOption(event.target.value, event.target.name)}/>
                  </li>
                </ul>
              </div>
              <div className="payment-entry-row">
                <ul className="entry-form ">
                  <li className="display-inline paymentAmount">
                      <label>Amount Given<span className="required">*</span></label>
                      <input className="" value={this.state.amount} name="amount"  placeholder="0.00" min="0" step=".01" type="number" onChange={(event) => Handler.updateSelectedOption(event.target.value, event.target.name,"total")}/>
                      <span className="sign">+</span>
                  </li>

                  <li className="display-inline paymentAmount">
                      <label>TDS(if applicable)</label>
                      <input className="" name="tds" value={this.state.tds} placeholder="0.00" min="0" step=".01" type="number" onChange={(event) => Handler.updateSelectedOption(event.target.value, event.target.name,"total")}/>
                      <span className="sign">=</span>
                  </li>

                  <li className="display-inline paymentAmount">
                      <label>Total Amount</label>
                      <input value={this.state.total} name="total"  placeholder="0.00" min="0" step=".01" type="number" onChange={(event) => Handler.updateSelectedOption(event.target.value, event.target.name)}/>
                  </li>
                </ul>
              </div>
              <div className="payment-entry-row">
                <ul className="entry-form ">
                  <li >
                    <label>Remarks</label>
                    <textarea ref={this.itemDescRef} value={this.state.remarks} name="remarks" className="field-textarea" onChange={(event) => Handler.updateSelectedOption(event.target.value, event.target.name)}></textarea>
                  </li>
                </ul>
              </div>
          </div>
          <div className="text-center"><input className="submit-button" type="submit" value="Submit" onClick={Handler.submitData}/></div>

        </div>
        <div className="display-inline data-display">
          <div className="lr-search">
                <div className="display-inline section">
                  <span className="label display-inline"><label>Transporter</label></span>
                  <Select
                    className="field-select display-inline"
                    name="transportersearch"
                    required
                    value={this.state.transportersearch}
                    onChange={(event) => Handler.updateSelectedOption(event, "transportersearch","search")}
                    options={this.props.formData.transporters}
                  />
                </div>
                <div className="display-inline section">
                  <span className="label display-inline"><label>Payment Mode</label></span>
                  <Select
                    className="field-select display-inline"
                    name="searchMode"
                    required
                    multi={true}
                    value={this.state.searchMode}
                    onChange={(event) => Handler.updateSelectedOption(event, "searchMode","search")}
                    options={paymentModes}
                  />
                </div>
                <div className="display-inline date-section">
                  <span className="label "><label>From</label></span>
                 <Calendar required format='DD/MM/YYYY' date={this.state.startDate} closeOnSelect={true} hideTodayButton={true} maxDate={this.state.startDate} computableFormat={'DD/MM/YYYY'} inputName="startDate" onBlur={(event) => Handler.handleChange(event.target.value, event.target.name, "search")} />
                </div>
                <div className="display-inline date-section">
                  <span className="label "><label >To</label></span>
                 <Calendar required format='DD/MM/YYYY' date={this.state.endDate} closeOnSelect={true} hideTodayButton={true} maxDate={this.state.endDate} computableFormat={'DD/MM/YYYY'} inputName="endDate" onBlur={(event) => Handler.handleChange(event.target.value, event.target.name, "search")} />
                </div>


          </div>
          <div className="bales-table">
            <DivTable dashboard={false} ref={this.child} includeClickFunc={false} includeEditRow={true} includeDeleteRow={true}
                      onRowAction={Handler.performAction} data={this.props.masterPayment && this.props.masterPayment.rows}
                      headers={this.props.masterPayment && this.props.masterPayment.columns}/>
          </div>
        </div>
      </div>
    )
}
}

const mapStateToProps = (state, ownProps) => {
  return {
    "formData": state.entryFormData,
    "masterPayment": state.masterPayment
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({},Actions, LoaderAction,FormActions), dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentEntry);
