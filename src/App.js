import React, { Component, Fragment } from 'react';
import './App.css';
import Movie from './Movie';
import MovieBoard from './MovieBoard';
import MovieKendo from './MovieKendo';
import NotFound from './NotFound';
import LoadingSpinner from './LoadingSpinner';
import Axios from 'axios';
import '@progress/kendo-theme-default';

class App extends Component {
  state = {
    type: 1,
    pageNo: 1,
    count: 0,
    keyword: '',
    movies: [],
    isFetching: true
  }

  componentDidMount() {
    this.getMovie();
  }

  componentDidUpdate(prevProps, prevStates) {
    if(prevStates.pageNo !== this.state.pageNo)
      this.getMovie();
    this.renderMovie();
  }

  searchMovie = type => e => {
    e.preventDefault();
    this.setState({
      type: type,
      pageNo: 1
    });
    this.getMovie();
  }

  handleChange = e => this.setState({keyword: e.target.value})

  getMovie = async () => {
    const movies = await this.getMovieData();
    this.setState({
      keyword: '',
      movies: movies
    });
  }

  getMovieData = () => {
    const url = 'https://yts.am/api/v2/list_movies.json';
    return Axios.get(url, {
      params: {
        page: this.state.pageNo,
        sort_by: 'rating',
        order_by: 'desc',
        query_term: this.state.keyword,
        limit: 12
      }
    })
    .then(response =>  {
      this.setState({count: response.data.data.movie_count})
      this.setState({isFetching: false});
      return response.data.data.movie_count > 0 ? response.data.data.movies : []
    })
    .catch(err => console.log(err))
  }

  renderMovie = () => {
    if(this.state.type === 1)
      return <Movie data={this.state.movies} />
    else if(this.state.type === 2)
      return <MovieBoard data={this.state.movies} />
    else
      return <MovieKendo data={this.state.movies} count={this.state.count} nextPage={this.showNextPage} />
  }

  showNextPage = no => {
    this.setState({
      isFetching: true,
      pageNo: no
    });
  }

  render() {
    return (
    <Fragment>
      <LoadingSpinner isFetching={this.state.isFetching} />
      <div className="listAndSearch">
        <a href='#' onClick={this.searchMovie(1)}>목록 보기</a> |&nbsp; 
        <a href='#' onClick={this.searchMovie(2)}>리스트로 보기</a> |&nbsp;
        <a href='#' onClick={this.searchMovie(3)}>Kendo Grid로 보기</a>
        <div className="searchField">
          <input type='text' onChange={this.handleChange} placeholder='제목으로 검색' 
                                                                    value={this.state.keyword} />
          <button onClick={this.getMovie}>검색</button> 
        </div>
      </div>
      <div className="movieList">
        {this.state.movies.length > 0 ? this.renderMovie() : <NotFound />}
      </div>
    </Fragment>
    );
  }
}

export default App;
