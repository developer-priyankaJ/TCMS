import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Grid from './grid/Grid.jsx';
import DivTable from './grid/DivTable.jsx';
import Calendar from 'react-input-calendar';
import RaisedButton from 'material-ui/RaisedButton';
import * as utility from '../utils/utility.js';
import Loaders from '../containers/Loader';
import * as LoaderAction from '../containers/Loader/actions';

class UpdateBales extends Component {
  constructor(props) {
    super(props);
    this.state = {
        "context": {
           componentParent: this
        },
        dates:[]
    };
    this.updateDate = this.updateDate.bind(this);
  }

  updateDate(name, date){
      var obj, value;
      var dateArray = this.state.dates;
      var id =  name.split('_')[1];

      value = utility.formatDate(date);
      var found = dateArray.some(function (el) {
                      return el.id === id;
                  });
      if (!found) {
          dateArray.push({"id":id, "value":value});
      }else{
        for(var i = 0; i < dateArray.length; i++) {
          if (dateArray[i].id == id) {
              dateArray[i].value = value;
              break;
          }
        }
      }
  }

  render() {
       const { data, onSubmit} = this.props;
        if(onSubmit){
          var submitButton = <div className="text-center"><RaisedButton type="submit" label="Submit" primary /></div>
        }
       return (
        <div className="">
          <h3 className="heading">Bale Details</h3>
          <hr/>
          <div>
              <div className="entry-form display-inline">
                <div className="display-table">
                 <div className="row">
                   <div className="display-inline cell bm-type_display">
                     <label>Invoice No</label><span>{data && data.invoice_no}</span>
                   </div>
                   <div className="display-inline cell bm-type_display">
                     <label>Invoice Date</label><span>{data && data.bill_date}</span>
                   </div>
                 </div>
                 <div className="row">
                   <div className="display-inline cell bm-type_display">
                     <label>Party</label><span>{data && data.party}</span>
                   </div>
                   <div className="display-inline cell bm-type_display">
                     <label>Item description</label><span>{data && data.item_desc}</span>
                   </div>
                 </div>
              </div>
            </div>
              <div className="entry-form display-inline valign_top">
                <div className="display-table">
                 <div className="row">
                  <div className="display-inline cell bm-type_display">
                    <label>LR No</label><span>{data &&  data.lr_no}</span>
                  </div>
                  <div className="display-inline cell bm-type_display">
                    <label>Bilty date</label><span>{data && data.bilty_date}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="display-inline cell bm-type_display">
                    <label>Transporter</label><span className="wordwrap">{data && data.transporter}</span>
                  </div>
                  <div className="display-inline cell bm-type_display">
                    <label>Booking station</label><span>{data && data.booking_stn}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr/>
          <form onSubmit={(event) => onSubmit(event, this.state.dates)}>
              <DivTable headers={this.props.balesGrid.columns} data={this.props.balesGrid.rows} onChange={this.updateDate}/>
              {submitButton}
          </form>
          <Loaders/>
        </div>

      )
}
}

UpdateBales.propTypes = {
  balesGrid: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  return {
     "balesGrid": state.balesGrid
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({},LoaderAction), dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateBales);
