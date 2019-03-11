import React, { Component } from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import MoviePoster from './MoviePoster';

class MovieKendo extends Component {
  state = {
    skip: 0,
    take: 12
  }

  pageChange = e => {
    this.setState({
      skip: e.page.skip,
      take: e.page.take
    })
    this.props.nextPage(e.page.skip / 12 + 1);
  }

  getConvertedTime = minute => parseInt(minute / 60) + '시간 ' + minute % 60 + '분';

  render() {
    return(
      <div>
        <Grid style={{height: '800px'}} data={this.props.data} pageable={true} 
          total={this.props.count} skip={this.state.skip} take={this.state.take} 
          onPageChange={this.pageChange}>

          <Column title='POSTER' width='90px' 
            cell={props => <td colSpan='1' className='kg-text-align-c'>
            <MoviePoster poster={props.dataItem.small_cover_image} cls='poster-small' /></td>}/>
          <Column field='title' title='TITLE' width='400px' />
          <Column field='rating' title='RATING' width='100px' className='kg-text-align-c' />
          <Column cell={props => <td colSpan='1' className='kg-text-align-c'>
            {this.getConvertedTime(props.dataItem.runtime)}</td>} title='RUNTIME' width='110px' 
            className='kg-text-align-c' />
          <Column field='year' title='RELEASE' className='kg-text-align-c' width='100px' />
          <Column field='genres' title='GENRE' className='kg-text-align-c' width='221px' />

        </Grid>
      </div>
    );
  }
}

export default MovieKendo;