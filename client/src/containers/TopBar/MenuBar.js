import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { NavLink  } from 'react-router-dom';
import { Menu, MenuItem } from 'material-ui/Menu';
import DropdownMenu from 'react-dd-menu';
import 'react-dd-menu/dist/react-dd-menu.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './actions';

class MenuBar extends Component {
  constructor() {
    super();
    this.state = {
        isMenuOpen: false
    };
    this.click = this.click.bind(this);
    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
    this.setMenuItem = this.setMenuItem.bind(this);


  }
  setMenuItem( data ){
    //  this.props.setSelectedMenu({"key":data});
    sessionStorage.setItem('selectedMenu', JSON.stringify({"key":data}));
    this.forceUpdate();
  }

  toggle() {
    this.setState((prevState, props) => {
      return { isMenuOpen: !this.state.isMenuOpen }
    });
  }

  close() {
    this.setState((prevState, props) => {
      return { isMenuOpen: false }
    });
  }

  click() {
    console.log('You clicked an item');
  }

  render() {
    const menuOptions = {
      isOpen: this.state.isMenuOpen,
      close: this.close,
      toggle: <a href="javascript:void(0)" onClick={this.toggle}>Entry Master</a>,
      align: 'left'
    };
    var selectedMenu = JSON.parse(sessionStorage.getItem('selectedMenu'));
    if(!(selectedMenu && selectedMenu.key)){
      selectedMenu = {
        "key":"entryMaster"
      }
    }
    return (
            <div className="menubar">
                <div className={selectedMenu.key=="dashboard" ? "menubar__item selected":"menubar__item"}>
                    <NavLink to="/dashboard"  onClick={(event) => this.setMenuItem("dashboard")}>Dashboard</NavLink>
                </div>
                <div className={selectedMenu.key=="entryMaster" ? "menubar__item selected":"menubar__item"}>
                  <DropdownMenu {...menuOptions}>
                    <li><NavLink to="/home:entry" onClick={(event) => this.setMenuItem("entryMaster")}>Bilty Entry</NavLink></li>
                    <li key="sep1" role="separator" />
                    <li><NavLink to="/dateEntry" onClick={(event) => this.setMenuItem("entryMaster")}>Received Date </NavLink></li>
                    <li key="sep2" role="separator" />
                    <li><NavLink to="/paymentEntry" onClick={(event) => this.setMenuItem("entryMaster")}>Payment</NavLink></li>
                    </DropdownMenu>
                </div>
                <div className={selectedMenu.key=="search" ? "menubar__item selected":"menubar__item"}>
                  <NavLink to="/search"  onClick={(event) => this.setMenuItem("search")}>Advanced Search</NavLink>
                </div>
                <div className={selectedMenu.key=="payment" ? "menubar__item selected":"menubar__item"}>
                  <NavLink to="/payment"  onClick={(event) => this.setMenuItem("payment")}>Payment</NavLink>
                </div>
                <div className={selectedMenu.key=="reporting" ? "menubar__item selected":"menubar__item"}>
                  <NavLink to="/reporting"  onClick={(event) => this.setMenuItem("reporting")}>Reporting</NavLink>
                </div>
            </div>
	       )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
       "selectedMenu": state.selectedMenu
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({},Actions), dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuBar);
