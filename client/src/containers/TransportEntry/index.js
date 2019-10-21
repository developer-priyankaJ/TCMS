import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Modal from 'react-responsive-modal';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Handler from './handler';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NewPartyForm from '../../components/NewPartyForm.jsx';
import NewTransporterForm from '../../components/NewTransporterForm.jsx';
import * as Actions from './actions';
import Calendar from 'react-input-calendar';
import Loaders from '../Loader';
import * as LoaderAction from '../Loader/actions';
import '../../assets/css/transportEntry.scss';
import BaleDetails from '../../components/BaleDetails.jsx';
import Calculator from '../../components/calculator/Calculator.jsx';



class TransportEntry extends Component {
    constructor(props) {
      super(props);
      this.state = {
        errors: {},
        editId:"",
        editFields:[],
        partyModal: false,
        transporterModal: false,
        bale_no: '',
        formData: {},
        invoice_no:"",
        billDate: moment(new Date()).format("DD/MM/YYYY"),
        selectedParty: {},
        item_desc:"",
        amount: 0,
        igst:0,
        cgst:0,
        sgst:0,
        total:0,
        eway_no: "",
        selectedTransporter: {},
        lr_no:"",
        bilty_date: moment(new Date()).format('DD/MM/YYYY'),
        booking_stn:"",
        weight:"",
        freight:"",
        qty: '',
        baleType: "autoIncrement",
        isBaleDisabled: true,
        NANCheck: false,
        bales:"",
        newParty:{
          "name":"",
          "city":"",
          "state":"",
          "phone":"",
          "gstn_no": ""
        },
        showMessage:false,
        newTransporter:{
          "name":"",
          "city":"",
          "state":"",
          "phone":"",
          "gstn_no": ""
        },
        baleDetails:{
          baleno: [],
          desc:[],
          qty:[],
          freight:[]
        },
        modalAction: "new",
        "baleDetailsStatus": "off"
      };
      this.itemDescRef = React.createRef();
      this.lrNoRef = React.createRef();
      this.showBackBtn = this.showBackBtn.bind(this);
      this.backToSearch = this.backToSearch.bind(this);
      Handler.onOpenModal = Handler.onOpenModal.bind(this);
      Handler.onCloseModal = Handler.onCloseModal.bind(this);
      Handler.handleChange = Handler.handleChange.bind(this);
      Handler.updateTotal = Handler.updateTotal.bind(this);
      Handler.fetchData = Handler.fetchData.bind(this);
      Handler.updateSelectedOption = Handler.updateSelectedOption.bind(this);
      Handler.handleInputChange = Handler.handleInputChange.bind(this);
      Handler.updateBales = Handler.updateBales.bind(this);
      Handler.handleSubmit = Handler.handleSubmit.bind(this);
      Handler.handleModalSubmit = Handler.handleModalSubmit.bind(this);
      Handler.resetFields = Handler.resetFields.bind(this);

      Handler.openBaleDetails = Handler.openBaleDetails.bind(this);
      Handler.handleBaleDetails = Handler.handleBaleDetails.bind(this);
      Handler.updateEditData = Handler.updateEditData.bind(this);
    }
    componentDidMount() {
         var that = this;
         const { editId } = this.props.match.params;
         if(editId && editId!=":entry"){
            that.setState((prevState, props) => {
              return { "editId":editId.replace(":",'').replace(/\---/g,"/") }
            });
         }
         Handler.fetchData();
         document.onkeyup = function(e) {
           if (e.altkey && e.which == 65) {
               Handler.onOpenModal("partyModal","new");
           } else if (e.ctrlKey && e.altKey && e.which == 65) {
               Handler.onOpenModal("partyModal","edit");
           } else if (e.altkey && e.which == 66) {
               Handler.onOpenModal("transporterModal","new");
           } else if (e.ctrlKey && e.altKey && e.which == 66) {
               Handler.onOpenModal("transporterModal","edit");
           }
         };
    }
    showBackBtn(){
      let btn = "";
      if(this.state.editId){
        btn = <input className="submit-button" type="submit" value="back" onClick={(event) => this.backToSearch(event)}/>
      }
      return btn;
    }
    backToSearch(event){
      event.preventDefault();
      sessionStorage.setItem('selectedMenu', JSON.stringify({"key":"search"}));
      this.props.history.push('/search');
    }
    componentWillUnmount(){
      /*Handler.onOpenModal = null;
      Handler.onCloseModal = null;
      Handler.handleChange = null;
      Handler.updateTotal = null;
      Handler.fetchData = null;
      Handler.updateSelectedOption = null;
      Handler.handleInputChange = null;
      Handler.updateBales = null;
      Handler.handleSubmit = null;
      Handler.handleModalSubmit = null;
      Handler.resetFields = null;
      Handler.openBaleDetails = null;
      Handler.handleBaleDetails = null;*/

      console.log("unmounting...........entry page")
    }
    render() {
        const { validate } = this.props;
        const { selectedParty, selectedTransporter } = this.state;

        return (
          <div className="entry-form-container">
            <Loaders/>
            <form id="myForm" name="myForm" onSubmit={Handler.handleSubmit}>
               <div>
                 <div>
                   <div>
                     <h4 className="form-heading">Bill Details<hr/></h4>
                   </div>
                   <div>
                     <div className="entry-form ">
                         <div className="display-inline">
                           <ul className="entry-form ">
                             <li className="display-inline">
                               <label>Invoice No<span className="required">*</span></label>
                               <input autoFocus type="text" disabled={this.state.editId ? true :false} required name="invoice_no" value={this.state.invoice_no} className="field-divided" maxLength="16" onChange={(event) => Handler.handleInputChange(event.target.name, event.target.value)}  placeholder="Invoice No" />
                             </li>
                             <li className="display-inline">
                               <label>Date<span className="required">*</span></label>
                              <Calendar required format='DD/MM/YYYY' date={this.state.billDate} closeOnSelect={true} hideTodayButton={true} maxDate={this.state.billDate} computableFormat={'DD/MM/YYYY'} inputName="billDate" onBlur={(event) => Handler.handleChange(event.target.value, event.target.name)} />
                             </li>
                             <li className="party">
                               <label>Party Name<span className="required">*</span></label>
                               <Select
                                 ref="combo"
                               className="field-select display-inline"
                                 name="party"
                                 required
                                 value={selectedParty}
                                 onChange={(event) => Handler.updateSelectedOption(event, "selectedParty")}
                                 options={this.props.formData.parties}
                               />
                               <a className="display-inline" tabIndex="-1" href="javascript:void();" onClick={(event) => Handler.onOpenModal("partyModal","new")}><div className={"add-icon"}></div></a>
                               <a className="display-inline" tabIndex="-1" href="javascript:void();" onClick={(event) => Handler.onOpenModal("partyModal","edit")}><div className={"edit-icon"}></div></a>
                             </li>
                             <li >
                               <label>Item Description</label>
                               <textarea ref={this.itemDescRef} name="item_desc" value={this.state.item_desc} className="field-textarea" onChange={(event) => Handler.handleInputChange(event.target.name, event.target.value)}></textarea>
                             </li>
                           </ul>
                         </div>
                         <div className="display-inline pricing">
                             <div><h5 className="form-heading">Payment Details<hr/></h5></div>
                             <div className="pricing-table">
                               <div className="pricing-table_row">
                                   <label className="pricing-table_cell">Amount before Tax</label>
                                   <input className="field-divided pricing-table_cell" name="amount" value={this.state.amount} placeholder="0.00" min="0" step=".01" type="number" onChange={(event) => Handler.updateTotal(event.target.name, event.target.value)}/>
                               </div>
                               <div className="pricing-table_row">
                                   <label className="pricing-table_cell">IGST(Rs)</label>
                                   <input name="igst"  className="pricing-table_cell field-divided" value={this.state.igst} placeholder="0.00" min="0" step=".01" type="number" onChange={(event) => Handler.updateTotal(event.target.name, event.target.value)}/>
                                 </div>
                                 <div className="pricing-table_row">
                                   <label className="pricing-table_cell">CGST(Rs)</label>
                                   <input className="field-divided pricing-table_cell" name="cgst" value={this.state.cgst} placeholder="0.00" min="0" step=".01" type="number" onChange={(event) => Handler.updateTotal(event.target.name, event.target.value)}/>
                                 </div>
                                 <div className="pricing-table_row">
                                   <label className="pricing-table_cell">SGST(Rs)</label>
                                   <input disabled className="field-divided pricing-table_cell" name="sgst" value={this.state.sgst}  placeholder="0.00" min="0" step=".01" type="number" value={this.state.sgst} onChange={(event) => Handler.updateTotal(event.target.name, event.target.value)}/>
                                 </div>
                                 <div className="pricing-table_row">
                                   <label className="pricing-table_cell">Total(Rs)</label>
                                   <input className="field-divided pricing-table_cell" name="total"  placeholder="0" type="number" value={this.state.total} disabled />
                                 </div>
                             </div>
                         </div>
                     </div>
                   </div>
                 </div>
                 <div>
                   <div>
                     <h4 className="form-heading">Transport Details<hr/></h4>
                   </div>
                   <div>
                     <ul className="entry-form">
                           <li className="display-inline transport">
                             <ul className="entry-form">
                               <li className="party">
                                 <label>Transporter Name<span className="required">*</span></label>
                                 <Select
                                 className="field-select display-inline"
                                   name="transporter"
                                   required
                                   value={selectedTransporter}
                                   onChange={(event) => Handler.updateSelectedOption(event, "selectedTransporter")}
                                   options={this.props.formData.transporters}
                                 />
                                 <a tabIndex="-1" className="display-inline" href="javascript:void();" onClick={(event) => Handler.onOpenModal("transporterModal","new")}><div className={"add-icon"}></div></a>
                                 <a tabIndex="-1" className="display-inline" href="javascript:void();" onClick={(event) => Handler.onOpenModal("transporterModal","edit")}><div className={"edit-icon"}></div></a>
                               </li>
                               <li >
                                 <div className="entry-form padding_0">
                                   <div className="display-inline" >
                                     <label>LR No.<span className="required">*</span></label>
                                     <input required type="text" ref={this.lrNoRef} value={this.state.lr_no} name="lr_no" className="field-divided" placeholder="LR No." onChange={(event) => Handler.handleInputChange(event.target.name, event.target.value)}/>
                                   </div>
                                   <div className="display-inline bilty-date">
                                     <label>Bilty Date<span className="required">*</span></label>
                                     <Calendar format='DD/MM/YYYY' date={this.state.bilty_date} closeOnSelect={true} hideTodayButton={true}  maxDate={this.state.bilty_date} inputName="bilty_date" computableFormat={'DD/MM/YYYY'} onBlur={(event) => Handler.handleChange(event.target.value, event.target.name)} />
                                   </div>
                                 </div>
                              </li>
                              <li >
                                <div className="entry-form padding_0">
                                  <div className="display-inline booking-stn field-divided">
                                    <label>Booking Station<span className="required">*</span></label>
                                    <Select
                                      className="field-select display-inline"
                                      name="party"
                                      required
                                      value={this.state.booking_stn}
                                      onChange={(event) => Handler.updateSelectedOption(event, "booking_stn")}
                                      options={this.props.formData.cities}
                                    />
                                  </div>
                                  <div className="display-inline eway" >
                                    <label>Eway Bill No</label>
                                    <input type="text" name="eway_no" placeholder="EWay Bill No." value={this.state.eway_no} onChange={(event) => Handler.handleInputChange(event.target.name, event.target.value)}/>
                                  </div>
                                </div>
                              </li>
                             </ul>
                           </li>
                           <li className="display-inline">
                             <div className="entry-form">
                               <div >
                                 <ul className="entry-form">
                                   <li className="display-inline">
                                     <label>Weight(kg)</label>
                                     <input type="number" name="weight" min="0" step=".01" value={this.state.weight} className="field-divided" placeholder="Weight(kg)" onChange={(event) => Handler.handleInputChange(event.target.name, event.target.value)}/>
                                   </li>
                                   <li className="display-inline">
                                     <label>Freight(Rs)</label>
                                     <input type="number" name="freight" min="0" step=".01" value={this.state.freight} placeholder="Freight(Rs)" onChange={(event) => Handler.handleInputChange(event.target.name, event.target.value)}/>
                                   </li>
                                 </ul>
                               </div>
                               <div className="marginTop_8">
                                 <ul className="entry-form">
                                   <li className="display-inline">
                                     <label>Bale Qty<span className="required">*</span></label>
                                     <input type="number" name="qty" className="field-divided" required placeholder="Bale Qty" max="10" value={this.state.qty} onChange={(event) => Handler.handleInputChange(event.target.name, event.target.value, "updateBale")}/>
                                   </li>

                                   <li className="display-inline">
                                     <label>Bale Number</label>
                                     <input type="text" name="bale_no"  value={this.state.bale_no} placeholder="Bale Number" onChange={(event) => Handler.handleInputChange(event.target.name, event.target.value, "updateBale")}/>
                                   </li>
                                   <li className="baleTypes">
                                     <div>
                                       <div className="display-inline type bm-type_auto">
                                           <input className="display-inline" disabled={this.state.NANCheck} name="baleType" id="autoIncrement" type="radio" value="autoIncrement" checked={this.state.baleType === "autoIncrement"} onChange={(event) => Handler.handleInputChange(event.target.name, event.target.value, "updateBale")} />
                                           <label className="display-inline" htmlFor="autoIncrement">Auto Increment</label>
                                       </div>
                                       <div className="display-inline type">
                                            <input className="display-inline" name="baleType" type="radio" value="allSame" checked={this.state.baleType === "allSame"} onChange={(event) => Handler.handleInputChange(event.target.name, event.target.value, "updateBale")} />
                                            <label className="display-inline" htmlFor="allSame">All Same</label>
                                       </div>
                                       <div className="display-inline ">
                                            <input className="display-inline" name="baleType" type="radio" value="manual" checked={this.state.baleType === "manual"} onChange={(event) => Handler.handleInputChange(event.target.name, event.target.value, "updateBale")} />
                                          <label className="display-inline" htmlFor="manual"> Manual </label>
                                       </div>
                                     </div>
                                   </li>
                                 </ul>
                               </div>
                             </div>
                           </li>
                     </ul>
                   </div>
                   <BaleDetails data={this.state.baleDetails} status={this.state.baleDetailsStatus} isDisabled={this.state.isBaleDisabled} quantity={this.state.qty} baleNos={this.state.baleDetails.baleno} onChange={Handler.handleBaleDetails}/>
                 </div>
               </div>
               <div className="text-center"><input ref={el => { this.submitButton = el; }} className="submit-button" type="submit" value="Submit" />{this.showBackBtn()}</div>

            </form>
            <Modal className="modal" closeOnOverlayClick={false} open={this.state.partyModal} onClose={(event) => Handler.onCloseModal("partyModal")} >
              <NewPartyForm message={this.state.showMessage} statesList={this.props.formData.states} citiesList={this.props.formData.cities} onSubmit={Handler.handleModalSubmit} onChange={Handler.handleInputChange} errors={this.state.errors} data={this.state.newParty}/>
            </Modal>
            <Modal className="modal" closeOnOverlayClick={false} open={this.state.transporterModal} onClose={(event) => Handler.onCloseModal("transporterModal")} >
              <NewTransporterForm message={this.state.showMessage} statesList={this.props.formData.states} citiesList={this.props.formData.cities} onSubmit={Handler.handleModalSubmit} onChange={Handler.handleInputChange} errors={this.state.errors} data={this.state.newTransporter}/>
            </Modal>
          </div>
          );
      }
  };

  const mapStateToProps = (state, ownProps) => {
    return {
         "formData": state.entryFormData,
         "currEntry": state.currEntry
    }
  };

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Object.assign({},Actions,LoaderAction), dispatch)
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TransportEntry);
