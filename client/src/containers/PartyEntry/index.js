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
import NewPartyForm from '../../components/NewPartyForm.jsx';

class PartyEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newParty:{
        "name":"",
        "city":"",
        "state":"",
        "phone":"",
        "gstn_no": ""
      },
      showMessage:"",
      errors:""
    };
    this.field = React.createRef();
    Handler.handleInputChange = Handler.handleInputChange.bind(this);
    Handler.fetchData = Handler.fetchData.bind(this);
    //Handler.handleChange = Handler.handleChange.bind(this);
    Handler.submitData = Handler.submitData.bind(this);
    Handler.fetchTableData = Handler.fetchTableData.bind(this);
  }

  componentDidMount() {
         Handler.fetchData();
         Handler.fetchTableData();
  }

  componentWillUnmount(){
    console.log("unmounting...........DatyeEntry page")
  }
  render() {
    return (
      <div className="">
        <div className="heading bm-type_widget"><h5>Party Entry</h5></div>
        <hr/>
        <div className="display-inline data-entry">
          <NewPartyForm message={this.state.showMessage} statesList={this.props.formData.states} citiesList={this.props.formData.cities} onSubmit={Handler.submitData} onChange={Handler.handleInputChange} errors={this.state.errors} data={this.state.newParty}/>
        </div>
        <div className="display-inline data-display">
          <div className="lr-search">
                <div className="display-inline section bm-type_first">
                  <span className="label display-inline"><label>Party</label></span>
                  <Select
                    className="field-select display-inline"
                    name="transportersearch"
                    required
                    value={this.state.transportersearch}
                    onChange={(event) => Handler.updateSelectedOption(event, "transportersearch")}
                    options={this.props.formData.transporters}
                  />
                </div>
                <div className="display-inline section">
                  <span className="label display-inline"><label>Payment Mode</label></span>
                  <Select
                    className="field-select display-inline"
                    name="searchMode"
                    required
                    value={this.state.searchMode}
                    onChange={(event) => Handler.updateSelectedOption(event, "searchMode")}
                  //  options={paymentModes}
                  />
                </div>
                <div className="text-center"><input className="submit-button" type="submit" value="Submit" onClick={Handler.fetchTableData}/></div>
          </div>
          <div className="bales-table">
            <DivTable dashboard={false} ref={this.child} includeClickFunc={false} onSubmit={Handler.submitData} onDateChange={Handler.submitData} onClick={Handler.submitData} onEditDate={Handler.submitData} headers={this.props.masterPayment && this.props.masterPayment.columns} data={this.props.masterPayment && this.props.masterPayment.rows} />
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
)(PartyEntry);
