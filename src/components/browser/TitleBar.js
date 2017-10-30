/* eslint-disable flowtype/require-valid-file-annotation */

import React      from 'react';
import PropTypes  from 'prop-types';
import {connect}  from 'react-redux'
import { browserHistory} from 'react-router'
import './Tile.scss';



class Tile extends React.Component {

  componentDidMount(){
  }

  handleIndex(){
    fetch('/index').then( () =>{
      console.log('Indexing complete');
    })
  }

  handleRandom(){
    alert('random');
  }

  render() {

    return (
      <div className='title-bar'>

          <img onClick={()=> this.handleIndex()} src='/icons/cache.png'></img>
          <img onClick={()=> this.handleRandom()} src='/icons/random.png'></img>
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
