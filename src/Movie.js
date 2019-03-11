import React, { Component, Fragment } from 'react';
import MoviePoster from './MoviePoster';

class Movie extends Component {
  render() {
    return(
      <Fragment>
        {this.props.data.map((movie, index) => (
          <div className='eachMovie' key={index}>
            <MoviePoster poster={movie.medium_cover_image} cls='poster-normal' />
            <div className='title'>{movie.title}</div>
            <div className='rating'>
              <span>평점</span>&nbsp;<span className='star'>★ </span><span>{movie.rating}</span>
            </div>
            <div className='runtime'>
              <span>상영시간</span>&nbsp;
              <span>{parseInt(movie.runtime / 60)}시간 {parseInt(movie.runtime % 60)}분</span>
            </div>
            <div className='release'><span>개봉</span>&nbsp;<span>{movie.year}</span></div>
          </div>
        ))}
      </Fragment>
    );
  }
}

export default Movie;;