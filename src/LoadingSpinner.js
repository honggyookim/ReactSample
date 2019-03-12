import React, { Component } from 'react';
import spinner from './images/spinner2.gif';

class LoadingSpinner extends Component {
  render() {
    return (
      <div className='loading-spinner' 
                            style={this.props.isFetching ? {display: 'block'} : {display: 'none'}}>
        <img src={spinner} />
      </div>
    );
  }
}

export default LoadingSpinner;