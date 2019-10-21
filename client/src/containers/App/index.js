import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TopBar from '../TopBar';

class App extends Component {
  render() {
    return (
      <div className="content-area">
          <TopBar/>
	        {this.props.children}
    	</div>)
  }
}

App.propTypes = {
    children: PropTypes.object.isRequired
}

export default App;
