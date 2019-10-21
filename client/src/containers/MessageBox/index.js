import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classNames';
import * as Actions from './actions';


class MessageBox extends Component {
  constructor(props) {
    super(props);
    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick(){
    this.props.messageBox.callBack && this.props.messageBox.callBack();
  }

  render() {
    return (
      <div className={classNames({"hidden": !this.props.messageBox.show})}>
        <div id="modalWindow"></div>
        <div id="messageBoxContainer" className="messageBox">
          {!this.props.messageBox.hideCloseIcon && <a className="messageBox__closeBtn" href="javascript:void(0)" onClick={this.props.hideMessageBox}>
            <span className="icon im-closeBig"></span>
            <span className="bm-messageBox_theme"></span>
            <span className="bm-messageBox_theme"></span>
          </a>}
          <div className="messageBox__title">{this.props.messageBox.heading}</div>
          <div className="messageBox__msg">{this.props.messageBox.message}</div>
          <div className="messageBox__btnContainer">
            <a className="blueButton" href="javascript:void(0)" id="btn0" onClick={this.buttonClick}>{this.props.messageBox.btnLabel || "close"}</a>
          </div>
        </div>
      </div>
    )
  }
}

MessageBox.propTypes = {
  messageBox: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
      messageBox: state.messageBox
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageBox);
