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

  /** 
   * 컴포넌트가 성공적으로 리액트에 로드되었을 때
   * * Constructor -> componentWillMount(deprecated) -> render -> componentDidMount
   * 컴포넌트가 렌더되었으니 할 일 있으면 하세요 라는 의미
   * */ 
  componentDidMount() {
    this.getMovie();
  }

  /**
   * 컴포넌트가 성공적으로 업데이트되었을 때
   * @param {*} prevProps 업데이트 되기 전의 props
   * @param {*} prevStates 업데이트 되기 전의 state
   * 데이터의 변경 또는 추가로 인해 컴포넌트가 업데이트되었으니 볼일 보세요
   */ 
  componentDidUpdate(prevProps, prevStates) {
    if(prevStates.pageNo !== this.state.pageNo)
      this.getMovie();
    this.renderMovie();
  }

  /**
   * 영화 검색 또는 리스트 보기
   * 이벤트 핸들러에 매개변수를 넘겨줄 때는 아래 함수처럼 처리
   * * event를 리턴하는 type을 매개변수로 가지는 searchMovie 함수
   */
  searchMovie = type => e => {
    e.preventDefault();
    this.setState({
      type: type,
      pageNo: 1
    });
    this.getMovie();
  }

  // 검색 input의 값이 변할 때 발생하는 이벤트 핸들러 - 값이 바뀔 때마다 state에 반영
  handleChange = e => this.setState({keyword: e.target.value})

  /** 
   * 영화 정보를 가져옴 
   * async는 비동기로 처리하되 getMovieData()로부터 데이터를 가져올 때 까지 대기(await)
   * 데이터를 가져온다는 건 성공적으로 완료됨이 아니라 성공이든 실패든 그 결괏값을 받는다는 의미
   * 데이터를 가져오면, 해당 데이터를 state에 반영
   */
  getMovie = async () => {
    const movies = await this.getMovieData();
    this.setState({
      keyword: '',
      movies: movies
    });
  }

  /**
   * url로부터 영화정보를 json 형식으로 GET
   * 기본 설정은 평점이 높은 순으로 정렬
   * @param url 영화정보를 가져올 API 주소
   * @param page 가져올 인덱스 (page * limit)부터
   * @param sort_by 정렬
   * @param order_by 정렬 기준
   * @param query_term 제목 검색 시 문자열
   * @param limit 한 번에 가져올 목록의 개수
   */
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
      /**
       * @param count 총 영화 데이터 개수
       * @param isFetching 데이터를 가져오는 중인지 완료 상태인지 여부
       */
      this.setState({
        count: response.data.data.movie_count, 
        isFetching: false
      });
      return response.data.data.movie_count > 0 ? response.data.data.movies : []
    })
    .catch(err => console.log(err))
  }

  /**
   * @param type 왼쪽 상단의 보기 형식
   * type에 따라 불러올 Component 종류가 달라짐
   * * KendoUI를 적용한 목록에서는 페이징 처리를 위해 count와 showNextPage함수를 props로 넘겨줌
   */
  renderMovie = () => {
    if(this.state.type === 1)
      return <Movie data={this.state.movies} />
    else if(this.state.type === 2)
      return <MovieBoard data={this.state.movies} />
    else
      return <MovieKendo data={this.state.movies} count={this.state.count} nextPage={this.showNextPage} />
  }

  // 변경된 페이지 적용을 위한 페이징 작업 - KendoUI가 적용된 컴포넌트에서 호출
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
