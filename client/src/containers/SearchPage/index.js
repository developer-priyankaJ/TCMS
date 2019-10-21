import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './actions';
import Handler from './handler';
import Loaders from '../Loader';
import Modal from 'react-responsive-modal';
import Grid from '../../components/grid/Grid.jsx';
import * as LoaderAction from '../Loader/actions';
import ActionsCellRenderer from '../../components/grid/ActionsCellRenderer.jsx';
import LinkCellRenderer from '../../components/grid/LinkCellRenderer.jsx';
import CustomColumns from '../../components/CustomColumns.jsx';
import ExportToExcel from '../../components/ExportToExcel.jsx';
import BaleDetails from '../../components/UpdateBales.jsx';
import 'react-input-calendar/style/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import RaisedButton from 'material-ui/RaisedButton';

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
        "context": {
           componentParent: this
        },
        "columnsModal": false,
        "balesModal": false,
        "balesData":'',
        "billinfo": '',
        "customColumns": [],
        "frameworkComponents": {
          "actionsCellRenderer": ActionsCellRenderer,
          "linkCellRenderer": LinkCellRenderer
        }

    };

    Handler.fetchData = Handler.fetchData.bind(this);
    Handler.deleteData = Handler.deleteData.bind(this);
    Handler.handleExport = Handler.handleExport.bind(this);
    Handler.openModal = Handler.openModal.bind(this);
    Handler.onCloseModal = Handler.onCloseModal.bind(this);
    Handler.handleModalSubmit = Handler.handleModalSubmit.bind(this);
    Handler.onCustomColChange = Handler.onCustomColChange.bind(this);
    Handler.getCustomColumnsData = Handler.getCustomColumnsData.bind(this);
    Handler.handleColVisibility = Handler.handleColVisibility.bind(this);
    Handler.fetchBalesData = Handler.fetchBalesData.bind(this);
    Handler.submitBaleDates = Handler.submitBaleDates.bind(this);
    Handler.editData = Handler.editData.bind(this);

    this.onGridReady = this.onGridReady.bind(this);
    this.onColumnResized = this.onColumnResized.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.onRowSelected = this.onRowSelected.bind(this);
  }

  componentDidMount() {
       Handler.fetchData();
       Handler.getCustomColumnsData();
  }
  componentWillUnmount(){
    this.gridApi = null;
    this.columnApi = null;
    this.sendResp = null;
    console.log("unmounting...........search page")
  }
  clickHandler( action, id ){
    if(action === "edit"){
      Handler.editData(id);
    }else if(action === "delete"){
      Handler.deleteData(id);
    }else if(action === "openDetails"){
      Handler.fetchBalesData(id);
      let obj = this.props.searchGrid.rows.filter(function(elem){
        return elem.lr_no == id
      })
      this.setState((prevState, props) => {
        return { "billinfo": obj[0] }
      });
      Handler.openModal("balesModal")
    }
  }
  onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
        var that = this;

        that.gridApi.resetRowHeights();
        this.sendResp = setInterval(function(){
          if(that.state.customColumns && that.state.customColumns.length > 0){
              Handler.handleColVisibility.call(that,"onload");
              that.columnApi.autoSizeColumns();
              console.log("resetRowHeights");
              that.gridApi.resetRowHeights();
              clearInterval(that.sendResp);
          }

        },200);
  }
  onRowSelected(event){
    /*if(event.node.selected){
      Handler.fetchBalesData(event.node.data.lr_no);
      this.setState((prevState, props) => {
        return { "billinfo": event.node.data }
      });
      Handler.openModal("balesModal")
    }*/
  }
// on selection publish selected row ids
  onSelectionChanged() {
      let selectedRowNodes = this.gridApi.getSelectedNodes();
      let selectedIds = selectedRowNodes.map((rowNode) => rowNode.id);
  }
  onColumnResized(event) {
    if (event.finished) {
      this.gridApi.resetRowHeights();
    }
  }
  render() {
       return (
        <div className="">
          <div style={{height: 450, width:window.innerWidth-30, marginTop: 15 , marginLeft: 15}} className="ag-theme-bootstrap">
                <div >
                  <ExportToExcel columns={this.props.searchGrid.columns} data={this.props.searchGrid.rows}/>
                  <RaisedButton className="customCol-button" type="submit" label="Custom Columns" primary onClick={(event)=>Handler.openModal("columnsModal")}/>
                </div>
             <Grid columns={this.props.searchGrid.columns} suppressRowTransform={"true"} rows={this.props.searchGrid.rows} context={this.state.context} frameworkComponents={this.state.frameworkComponents} onGridReady={this.onGridReady} onSelectionChanged={this.onSelectionChanged} onRowSelected={this.onRowSelected}/>
          </div>
          <Modal className="modal" open={this.state.columnsModal} onClose={(event) => Handler.onCloseModal("columnsModal")} >
            <CustomColumns onSubmit={Handler.handleModalSubmit} data={this.state.customColumns} onChange={Handler.onCustomColChange}/>
          </Modal>
          <Modal className="modal" open={this.state.balesModal} onClose={(event) => Handler.onCloseModal("balesModal")} >
            <BaleDetails keyValue={this.state.balesData} data={this.state.billinfo} />
          </Modal>
          <Loaders/>
        </div>
      )
}
}

SearchPage.propTypes = {
  searchGrid: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  return {
     "searchGrid": state.searchGrid
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({},Actions, LoaderAction), dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);
