import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MenuBar from './MenuBar.js';
import { Apis, Keys } from '../../constants';
import * as Utils from '../../utils';
import Loaders from '../Loader';
import * as LoaderAction from '../Loader/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../../assets/css/topBar.scss';

class TopBar extends Component {
  logout(){
    sessionStorage.clear();
  }
  backupData(event){
    event.preventDefault();
    Utils.fetchService.call(this, {
        "method": "POST",
        "url": Apis.backupData,
        "callBack": (data) => {
              alert("Backup Taken Successfully",data);
        }
      });
  }
  componentWillUnmount(){
    console.log("unmounting...........top bar")
  }
  renderTopBar(){
      const userData = JSON.parse(sessionStorage.getItem('tmsData'));
      this.status = userData && userData.isLoggedIn;
      if(this.status){
          let button = <Link to="/" onClick={this.logout}>LogOut</Link>;
          let backup = <Link to="/" onClick={(event) => this.backupData(event)}>Take Backup</Link>;
          return <div className="topBar"><div className="topBar__left"></div><div className="topBar__right">{backup}{button}</div></div>
      }else{
          return <div className="topBar"></div>;
      }
  }
  renderMenuBar(){
    if(this.status){
      return <MenuBar/>
    }else{
      return ;
    }
  }
  render() {
    return (
          <div>
          <Loaders/>
            {this.renderTopBar()}
            {this.renderMenuBar()}
          </div>
	       )
  }
}

TopBar.propTypes = {

}
const mapStateToProps = (state, ownProps) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({},LoaderAction), dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBar);
