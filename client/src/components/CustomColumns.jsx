import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { NavLink  } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';


class CustomColumns extends Component {
    render() {
        const { data, onSubmit, onChange } = this.props;
        var rows = [], row;
        for(var i=0; i < data.length; i=i+2){
          const elem = this.props.data[i+1];
          row = <div key={100+i} className="display-table">
            <div className="col-row display-table-cell"><Checkbox key={i} name={'checkBoxGroup'}  onCheck={(event,checked) => this.props.onChange(event, checked)} id={this.props.data[i].id} label={this.props.data[i].display_name} defaultChecked={this.props.data[i].status == "true"} /></div>
          {elem ? <div className="col-row display-table-cell"><Checkbox key={i+1} name={'checkBoxGroup'}  onCheck={(event,checked) => this.props.onChange(event, checked)} id={this.props.data[i+1].id} label={this.props.data[i+1].display_name} defaultChecked={this.props.data[i+1].status == "true"}/></div> : <div key={i+1}></div>}
          </div>

          rows.push(row);
        }
        return (
          <div className="">
            <form onSubmit={(event) => onSubmit(event)}>
              <h3 className="heading">Custom Column List</h3>
              <hr/>
              <div className="custom-columns">
                  {rows}
              </div>
              <div className="button-line text-center">
                <RaisedButton type="submit" label="Submit" primary />
              </div>
            </form>
          </div>
        );
    }
};
CustomColumns.propTypes = {
    onSubmit: PropTypes.func,
    data: PropTypes.array,
    onChange: PropTypes.func
};

export default CustomColumns;
