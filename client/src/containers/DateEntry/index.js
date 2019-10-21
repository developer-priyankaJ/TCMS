import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './actions';
import Handler from './handler';
import Loaders from '../Loader';
import Modal from 'react-responsive-modal';
import * as LoaderAction from '../Loader/actions';
import * as balesAction from '../SearchPage/actions';
import DivTable from '../../components/grid/DivTable.jsx';
import Calendar from 'react-input-calendar';
import RaisedButton from 'material-ui/RaisedButton';
import Select from 'react-select';
import BaleDetails from '../../components/UpdateBales.jsx';
import 'react-select/dist/react-select.css';
import '../../assets/css/dashboard.scss';


class DateEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "lrNo":{},
      "baleNo":{},
      "bale_desc":"",
      "errors": {},
      "infoModal": false,
      "editModal" : false,
      "editData":{
        "key":"",
        "id": "",
        "value": "",
        "display": "",
        "type": ""
      },
      "editElem": "",
      "dateArray": []
    };
    this.child = React.createRef();
    Handler.fetchData = Handler.fetchData.bind(this);
    Handler.fetchBalesData = Handler.fetchBalesData.bind(this);
    Handler.onClickRow = Handler.onClickRow.bind(this);
    Handler.openModal = Handler.openModal.bind(this);
    Handler.onCloseModal = Handler.onCloseModal.bind(this);
    Handler.onEditDate = Handler.onEditDate.bind(this);
    Handler.onDateChange = Handler.onDateChange.bind(this);
    Handler.submitChange = Handler.submitChange.bind(this);
  }

  componentDidMount() {
         Handler.fetchData();
         Handler.fetchBalesData();
  }

  componentWillUnmount(){
    console.log("unmounting...........DatyeEntry page")
  }
  render() {
    return (
      <div className="entry-form-container">
        <div className="heading bm-type_widget"><h5>Search & Enter Received date</h5></div>
        <hr/>
        <div className="lr-search">
              <div className="display-inline section bm-type_first">
                <span className="label display-inline"><label>LR No</label></span>
                <Select
                  className="field-select display-inline"
                  name="lr_no"
                  value={this.state.lrNo}
                  onChange={(event) => Handler.fetchBalesData(event,"lrNo")}
                  options={this.props.data.lr_nos}
                />
              </div>
              <div className="display-inline section">
                <span className="label display-inline"><label>Bale No</label></span>
                <Select
                  className="field-select display-inline"
                  name="bale_no"
                  value={this.state.baleNo}
                  onChange={(event) => Handler.fetchBalesData(event,"baleNo")}
                  options={this.props.data.bale_nos}
                />
              </div>
              <div className="display-inline section">
                <span className="label display-inline"><label>Bale Description</label></span>
                <input type="text" name="bale_desc" placeholder="search Description" onChange={(event) => Handler.fetchBalesData(event,"bale_desc")}></input>
              </div>
        </div>

        <div className="bales-table">
          <DivTable dashboard={true} ref={this.child} includeClickFunc={true} onSubmit={Handler.submitChange} onDateChange={Handler.onDateChange} onClick={Handler.onClickRow} onEditDate={Handler.onEditDate} headers={this.props.data.balesGrid && this.props.data.balesGrid.columns} data={this.props.data.balesGrid && this.props.data.balesGrid.rows} />
        </div>
        <Modal className="modal" open={this.state.infoModal} onClose={(event) => Handler.onCloseModal("infoModal")} >
            <BaleDetails data={this.props.data.balesOtherInfo}/>
        </Modal>
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
        <Loaders/>
      </div>
    )
}
}

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.recvDateData
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({},Actions, LoaderAction, balesAction), dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateEntry);
