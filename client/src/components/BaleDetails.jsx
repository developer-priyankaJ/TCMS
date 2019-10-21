import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { NavLink  } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';


class BaleDetails extends Component {
    constructor(props) {
      super(props);
      this.state = {

      }
    }
    render() {
        const { data, onSubmit,onChange, status, quantity, baleNos, isDisabled } = this.props;
        let rows = [];
        for(var i=0; i< quantity; i++){
          var elem = <div className="row" key={i}>
                        <div className="cell">{i+1}.</div>
                        <div className="cell div-type_no">
                          <input type="text" name={"baleno_"+i} className="field-divided baleDetail_no" value={baleNos[i]} disabled={isDisabled} placeholder="Bale No" onChange={(event) => onChange(event.target.name,event.target.value)}/>
                        </div>
                        <div className="cell div-type_desc">
                          <input type="text" name={"desc_"+i} className="field-divided baleDetail_desc" value={data && data.desc && data.desc[i]}  placeholder="Bale Description" onChange={(event) => onChange(event.target.name,event.target.value)}/>
                        </div>
                        <div className="cell div-type_qty">
                          <input type="text" name={"qty_"+i} className="field-divided baleDetail_qty" value={data && data.qty && data.qty[i]}  placeholder="Qty" onChange={(event) => onChange(event.target.name,event.target.value)} />
                        </div>
                        <div className="cell div-type_freight">
                          <input type="text" name={"freight_"+i} className="field-divided baleDetail_freight"  value={data && data.freight && data.freight[i]} placeholder="Rate" onChange={(event) => onChange(event.target.name,event.target.value)}/>
                        </div>
                     </div>
          rows.push(elem);
        }
        return (
          <div className={status} id="baleDetails">
              <h4 className="form-heading bm-font_white bm-padding_20">Bale Details</h4>
              <hr/>
              <div className={"entry-form"}>
              <div className="display-table">
                   {rows}
              </div>
            </div>
          </div>
        );
    }
};
BaleDetails.propTypes = {
    onSubmit: PropTypes.func,
    status: PropTypes.string
};

export default BaleDetails;
