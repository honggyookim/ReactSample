import React, { Component, Fragment } from 'react';
import MoviePoster from './MoviePoster';
import { Grid, GridColumn } from '@progress/kendo-react-grid';

class MovieBoard extends Component {
  render() {
    return(
      <Fragment>
        <div className='movieBoardList'>
          <table>
            <thead>
              <tr>
                <th>아이디</th>
                <th className='board-poster'>포스터</th>
                <th className='board-title'>영화 제목</th>
                <th>평점</th>
                <th>상영시간</th>
                <th>개봉년도</th>
              </tr>
            </thead>
            <tbody>
              {this.props.data.map((movie, index) => (
                <tr key={index}>
                  <td>{movie.id}</td>
                  <td><MoviePoster poster={movie.small_cover_image} cls='poster-small' /></td>
                  <td>{movie.title}</td>
                  <td>{movie.rating}</td>
                  <td>{movie.runtime}</td>
                  <td>{movie.year}</td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}

export default MovieBoard;