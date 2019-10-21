import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
    class Authentication extends Component {

        componentWillMount() {
            let userData = JSON.parse(sessionStorage.getItem('tmsData'));

            if(!userData || !userData.isLoggedIn){
              console.log("1",this.props);
                this.props.history.push('/')
            }else{
                console.log("2",this.props);
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated) {
                this.props.history.push('/')
            }
        }

        render() {
            return <ComposedComponent {...this.props} />
        }
    }
    function mapStateToProps(state) {
        return {authenticated: state.userSession.isLoggedIn };
    }

    return connect(mapStateToProps)(Authentication);
}
