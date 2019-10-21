import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from './actions';
import { CylinderSpinLoader } from 'react-css-loaders';



class Loaders extends Component {
  
  render() {
    return (
      <div className={this.props.loader.show ? "loader-active": "loader-hidden"}>
          <CylinderSpinLoader color={"#fff"}/>
      </div>
    )
  }
}

Loaders.propTypes = {
  loader: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
      loader: state.loader
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loaders);
