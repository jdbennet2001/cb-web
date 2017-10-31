/* eslint-disable flowtype/require-valid-file-annotation */

import React      from 'react';
import PropTypes  from 'prop-types';
import {connect}  from 'react-redux'
import { browserHistory} from 'react-router'
import './Tile.scss';



class Tile extends React.Component {

  componentDidMount(){
  }

  handleClick(){
    browserHistory.push(`/reader#archive=${this.props.file_location}&length=${this.props.file_length}`);
  }

  render() {

    return (
      <div className='tile' key={this.props.file_name +'_tile'}>
        <div className='imageArea' onClick={() => this.handleClick() }>
          <img className='cover' src={'/cover/' +encodeURIComponent(this.props.file_name)}></img>
        </div>
        <div className='title'>{this.props.file_name}</div>
        <div className='pageCount'>{this.props.file_length}</div>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    open: () =>
      dispatch({type: 'OPEN_ARCHIVE'})
  };
}


export default connect(mapDispatchToProps)(Tile)
