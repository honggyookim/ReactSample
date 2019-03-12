import React, { Component } from 'react';

class MoviePoster extends Component {
  render() {
    return(
      // props로 넘어온 cls 값에 따라 class를 다르게 지정하여 포스터 이미지 크기를 조절
      <img className={this.props.cls} src={this.props.poster} alt='포스터' />
    );
  }
}

export default MoviePoster;