import React, {Component} from "react";
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import '../../assets/css/grid.scss';

export default class Grid extends Component {
    constructor(props) {
        super(props);
    }
    componentWillReceiveProps(newProps){
      console.log("newProps",newProps)
    }
    render() {
        return (
          <AgGridReact
              // properties
              columnDefs={this.props.columns}
              rowData={this.props.rows}
              enableColResize
              rowSelection="single"
              rowMultiSelectWithClick={true}
              enableSorting
              enableFilter={"true"}
              suppressDragLeaveHidesColumns= {"true"}
              animateRows={"true"}
              floatingFilter={"true"}
              //suppressRowTransform={this.props.suppressRowTransform}
              suppressMenu= {"true"}
              components= {this.props.components}
              context={ this.props.context }
              rowHeight = {55}
              frameworkComponents={this.props.frameworkComponents}
              onGridReady={this.props.onGridReady}
              onColumnResized={this.props.onColumnResized}
              onSelectionChanged={this.props.onSelectionChanged}
              onRowSelected={this.props.onRowSelected}>
          </AgGridReact>
        );
    }

};
