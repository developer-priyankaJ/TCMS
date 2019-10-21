import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './actions';
import Handler from './handler';
import Loaders from '../Loader';
import * as LoaderAction from '../Loader/actions';
import '../../assets/css/dashboard.scss';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        "lrNo":{},
        "baleNo":{}
    };

   Handler.fetchData = Handler.fetchData.bind(this);
   Handler.fetchBalesData = Handler.fetchBalesData.bind(this);
  }

  componentDidMount() {
         Handler.fetchData();
         Handler.fetchBalesData();

  }
  componentWillUnmount(){
    console.log("unmounting...........DashBoard page")
  }

  render() {
    console.log("this.props.data >>",this.props.data)
       return (
        <div className="">
          <div>
              <div className="dashboard-div ">
                11111
              </div>
              <div className="dashboard-div">22222</div>

          </div>
          <div>
              <div className="dashboard-div">333</div>
              <div className="dashboard-div">444</div>
          </div>
          <Loaders/>
        </div>
      )
}
}

DashBoard.propTypes = {

};

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.dashboardData
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({},Actions, LoaderAction), dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashBoard);
