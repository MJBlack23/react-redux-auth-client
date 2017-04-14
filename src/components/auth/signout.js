import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render () {
    return (
      <div>Sorry to see you go...</div>
    )
  }

}; // end class Signout

export default connect(null, actions)(Signout);
