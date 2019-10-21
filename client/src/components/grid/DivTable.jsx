import React, {Component} from "react";
import '../../assets/css/grid.scss';
import Calendar from 'react-input-calendar';
import moment from 'moment';
import * as utility from '../../utils/utility.js';
import { Menu, MenuItem } from 'material-ui/Menu';
import DropdownMenu from 'react-dd-menu';
import 'react-dd-menu/dist/react-dd-menu.css';

export default class DivTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showMenu: []
        }

        this.updateData = this.updateData.bind(this);
        this.createAttr = this.createAttr.bind(this);
        this.createEditIcon = this.createEditIcon.bind(this);
        this.editDate = this.editDate.bind(this);
        this.addRemarks = this.addRemarks.bind(this);
        this.toggle = this.toggle.bind(this);
        this.close = this.close.bind(this);
        this.performAction = this.performAction.bind(this);
        this.handleRowClass = this.handleRowClass.bind(this);
    }
    createAttr( name, value, elem ){
        var attr = document.createAttribute(name);
        attr.value= value;
        elem.setAttributeNode(attr);
    }
    addRemarks(event){
        event.target.contentEditable = true;
    }
    createEditIcon(parent,id, value, elem){
      var that = this;
      var editLink = document.createElement("a");
          editLink.className="display-inline";
          this.createAttr("tabIndex", "-1", editLink);
          this.createAttr("href", "javascript:void();", editLink);

          editLink.onclick = function(){
            if(value && value!="undefined"){
                that.createAttr("id", utility.formatDate(value), editLink);
                that.props.onEditDate(id, utility.formatDate(value), elem);
            }else{
                that.createAttr("id", "", editLink);
                that.props.onEditDate(id, "", elem);
            }
          }
      var icon = document.createElement("div");
          icon.className = "edit-icon-2";
          editLink.appendChild(icon);
          parent.appendChild(editLink);
    }

    updateData( elem, type, value ){
        var parent, val, id, textNode;
      if(type == "edit"){
            if(value && value.indexOf(" - ") > 0){
               parent = document.createElement("span");
               val = value.split(' - ')[1];
               id = elem.parentElement.id;
               this.createAttr("key", id, parent);
               textNode = document.createTextNode( value.split(' - ')[0] + " - " + utility.formatDate(val)+', ');
            }else{
              parent = document.createElement("div");
              parent.className="divTableCell";
              this.createAttr("key", elem.id, parent);
              val = value;
              id = elem.id;
            /*  if(!value || value=="undefined"){
                if(this.props.colorcode){
                  elem.parentElement.className ="divTableRow row-color-red";
                }
                textNode = document.createTextNode("");
              }else{*/
                textNode = document.createTextNode( utility.formatDate(val));
            //  }
            }
            parent.appendChild(textNode);
            this.createEditIcon(parent,  id, value, parent);
            elem.replaceWith(parent);
      }
      else if(!type && elem.target.value){
        var parent = document.createElement("div");
            parent.className="divTableCell";
            this.createAttr("key", elem.target.name, parent);
            this.createAttr("id", elem.target.name, parent);
            var textNode = document.createTextNode( utility.formatDate(elem.target.value));
            parent.appendChild(textNode);
            this.createEditIcon(parent,  elem.target.name, elem.target.value, parent);
            if(this.props.colorcode){
              elem.target.parentElement.parentElement.parentElement.className ="divTableRow row-color-green";
            }
            elem.target.parentElement.parentElement.replaceWith(parent);
            this.props.onDateChange(elem.target.name,elem.target.value)
      }
    }
    editDate( elem, value ){
        this.updateData( elem, "edit", value );
    }

    toggle(row) {
      var arr = this.state.showMenu;
      for(var i=0; i< this.props.data.length; i++){
         arr[i] = false;
         this.setState((prevState, props) => {
           return { arr }
         });
       }
      arr[row]= !arr[row];
      this.setState((prevState, props) => {
        return { arr }
      });
    }
    performAction(action,id,row){
        var arr = this.state.showMenu;
        arr[row] = false;
        this.setState((prevState, props) => {
          return { arr }
        });
        this.props.onRowAction(action,id);

    }
    close(row) {
      var arr = this.state.showMenu;
      arr[row]= false;
      this.setState((prevState, props) => {
        return { arr }
      });
    }
    returnRows(row, data){
      var rows = [], elem;
        for(var i=0; i< this.props.headers.length; i++){
           if(this.props.headers[i].hidden || (this.props.dashboard && this.props.headers[i].hideForDashBoard)){
             continue;
           }
           if(this.props.headers[i].field == "received_date" || this.props.headers[i].field == "sold_date" || this.props.headers[i].field == "payment_date"){
               if(data[this.props.headers[i].field]){
                   if(this.props.dashboard){
                     let value = data[this.props.headers[i].field];
                     if(value.indexOf(' - ') > 0){
                       let arr = (value.indexOf(',') > 0) ? value.split(", ") : [value];
                       let item = "", itemRow= [];
                       for(let j=0;j<arr.length;j++){
                         item = <span key={j*25}>{arr[j]}<a className="display-inline" tabIndex="-1" href="javascript:void();" id={arr[j]}  onClick={(event) => this.props.onEditDate(event.target.parentElement.parentElement.parentElement.id, event.target.parentElement.id, event.target.parentElement.parentElement,j)}><div className={"edit-icon-2"}></div></a>, </span>
                         itemRow.push(item);
                       }
                       if(this.props.headers[i].field=="received_date" && (data["received_date"] && data["received_date"].indexOf(' - ') > 0) ){
                          let balesNos = (data["bale_numbers"] && data["bale_numbers"].indexOf(',') > 0 ) ? data["bale_numbers"].split(",") : [data["bale_numbers"]];
                          if(balesNos.length > arr.length){
                            let link = <a key={"2102"} className="display-inline small-font" tabIndex="-1" href="javascript:void();" id={data['bale_numbers']+"#"+data['received_date']+"#"+data['lr_no']}  onClick={(event) => this.props.onAddMultipleDate(event.target.id)}>Add Date</a>
                            itemRow.push(link);
                          }
                       }
                       elem = <div className="divTableCell" id={this.props.headers[i].field + "#"+ data["id"]+"#"+data["lr_no"]} key={i+1000}>
                                {itemRow}
                              </div>
                     }else{
                       elem = <div className="divTableCell" id={this.props.headers[i].field + "#"+ data["id"]+"#"+data["lr_no"]} key={i+1000}>{data[this.props.headers[i].field]}
                                  <a className="display-inline" tabIndex="-1" href="javascript:void();" id={data[this.props.headers[i].field]}  onClick={(event) => this.props.onEditDate(event.target.parentElement.parentElement.id, event.target.parentElement.id, event.target.parentElement.parentElement)}><div className={"edit-icon-2"}></div></a>
                              </div>
                     }
                   }else{
                     elem = <div className="divTableCell" data-id={this.props.headers[i].field + data["id"]} key={i+1000}>{data[this.props.headers[i].field]}</div>
                   }

               }else{
                  if(this.props.dashboard){
                    if((this.props.headers[i].field == "received_date") && (data['bale_numbers'] && data['bale_numbers'].indexOf(','))){
                       elem = <div className="divTableCell" key={i+1000}><a className="display-inline" tabIndex="-1" href="javascript:void();" id={data['bale_numbers']+"#"+data['received_date']+"#"+data['lr_no']}  onClick={(event) => this.props.onAddMultipleDate(event.target.id)}>Add Date</a></div>
                    }else{
                      elem = <div className="divTableCell" key={i+1000}>
                                <Calendar required format='DD/MM/YYYY' closeOnSelect={true} hideTodayButton={true} computableFormat={'DD/MM/YYYY'} inputName={this.props.headers[i].field+"#"+data["id"]+"#"+data["lr_no"]}  onBlur={(event) => this.updateData(event)} />
                             </div>
                    }

                  }else{
                     elem = <div className="divTableCell" key={i+1000}></div>
                  }
              }
           }else{
              if(this.props.headers[i].field == "lr_no"){
                if(this.props.includeClickFunc){
                  elem = <div className="divTableCell bm-type_cursor" dname={data["lr_no"]+"##"+data["invoice_no"]} onClick={(event) => this.props.onClick(event.target)} key={i+1000}>{data[this.props.headers[i].field]}</div>
                }else if(this.props.includeSelection){
                  elem = <div className="divTableCell bm-type_cursor" dname={data["lr_no"]+"##"+data["invoice_no"]} key={i+1000}>{data[this.props.headers[i].field]}<span dataid={data["lr_no"]} className="close bm-type_cell"  onClick={(event)=> this.props.includeSelection(event)}></span></div>
                }else{
                  elem = <div className="divTableCell" key={i+1000}>{data[this.props.headers[i].field ]}</div>
                }
              }else if(this.props.includeClickFunc && this.props.headers[i].field == "remarks"){
                elem = <div className="divTableCell bm-type_cursor bm-job_edit" key={i+1500} onClick={(event) => this.addRemarks(event)} dname={data["id"]} onBlur={(event) => this.props.onSubmit(event.target.getAttribute("dname"),"remarks", event)}>{data[this.props.headers[i].field]}</div>
              }else if(this.props.headers[i].field == "bale_numbers" && data[this.props.headers[i].field]){
                elem = <div className="divTableCell" key={i+1000}>{data[this.props.headers[i].field].replace(',',', ')}</div>
              }else{
                elem = <div className="divTableCell" key={i+1000}>{data[this.props.headers[i].field ]}</div>
              }
           }

           rows.push(elem);

        }
        if(this.props.includeEditRow || this.props.includeDeleteRow){
          const menuOptions = {
            isOpen: this.state.showMenu[row],
            close: this.close,
            toggle: <a href="javascript:void(0)" className="action-icon" onClick={()=>this.toggle(row)}></a>,
            align: 'right'
          };
           var actionCell = <div className="divTableCell action-cell" key={i+1010}>
             <DropdownMenu {...menuOptions}>
               <li><div onClick={(event) => this.performAction("edit",data["id"],row)}>Edit</div></li>
               <li key="sep1" role="separator" />
               <li><div onClick={(event) => this.performAction("delete",data["id"],row)}>Delete</div></li>
               <li key="sep2" role="separator" />
             </DropdownMenu></div>
            rows.push(actionCell);
        }

        return rows;
    }
    handleRowClass(data){
      let cls = "divTableRow ";
      if(this.props.colorcode){
        cls = cls + this.props.colorFunc(data);
      }
      return cls;
    }
    componentWillReceiveProps(nextProps) {
      // You don't have to do this check first, but it can help prevent an unneeded render
      if (this.props.data !== nextProps.data) {
        for(var i=0; i< nextProps.data.length; i++){
           var arr = this.state.showMenu;
           arr.push(false);
           this.setState((prevState, props) => {
             return { arr }
           });
         }
      }
    }
    render() {
        const {headers, data, onChange, dashboard, onClick, includeSelection, colorcode, colorFunc, includeClickFunc, onAddMultipleDate, onDateChange, onEditDate, onSubmit,includeEditRow,includeDeleteRow,onRowAction} = this.props;
        let colHeaders = [], rows = [], nodata = [];
        if(headers){
          for(var i=0; i< headers.length; i++){
            if(headers[i].hidden || (dashboard && headers[i].hideForDashBoard)){
              continue;
            }
            let divStyle = {width:headers[i].width};
             colHeaders.push(<div className="divTableHead" style={divStyle} key={i}>{headers[i].headerName}</div>);
          }
          if(includeEditRow || includeDeleteRow){
            colHeaders.push(<div className="divTableHead action-cell" key={headers.length + 1}></div>);
          }
          for(var i=0; i< data.length; i++){
             var row = <div className={this.handleRowClass(data[i])} key={i+100}>
               {this.returnRows(i, data[i])}
              </div>
             rows.push(row);
          }
          if(data.length == 0){
            var row = <div className="no-data" key={i+100}> No Data to display</div>
            nodata.push(row);
          }
        }
        return (
          <div>
          <div className="divTable greyGridTable">
             	<div className="divTableHeading">
             		<div className="divTableRow">
             			{colHeaders}
             		</div>
             	</div>
             	<div className="divTableBody">
             		{rows}
                 </div>
             </div>
             {nodata}
          </div>
        );
    }

};
