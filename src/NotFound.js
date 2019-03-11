import React, { Component } from 'react';

class NotFound extends Component {
  render() {
    return(
      <div className="not_found">
        <img src='http://4.bp.blogspot.com/_7RXOll2bOJs/R1SQ-jBzv4I/AAAAAAAAAE8/VeTTV4X5U-w/s320/NoDataFound.gif' 
             alt='영화 정보 없음' />
        <div>영화 정보가 없습니다.</div>
      </div>
    );
  }
}

export default NotFound;