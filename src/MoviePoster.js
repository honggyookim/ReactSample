import React, { Component } from 'react';

class MoviePoster extends Component {
  render() {
    return(
      <img className={this.props.cls} src={this.props.poster} alt='포스터' />
    );
  }
}

export default MoviePoster;