/* eslint-disable flowtype/require-valid-file-annotation */

import React      from 'react';
import PropTypes  from 'prop-types';
import {connect}  from 'react-redux'
import './CoversView.scss';


import Tile       from './Tile';

class CoversView extends React.Component {

  componentDidMount(){
  }


  render() {
    return (
      <div className='covers-area'>
        {this.props.files.map(file =>{
          return <Tile file_name={file.name} file_length={file.length} file_location={file.location}></Tile>
        })}
      </div>
    );
  }
}




function mapStateToProps(state) {
  return { files: state.folder  }
}

function mapDispatchToProps(dispatch) {
  return {
    open: () =>
      dispatch({type: 'OPEN_ARCHIVE'})
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CoversView)
