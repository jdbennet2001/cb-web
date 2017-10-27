/* eslint-disable flowtype/require-valid-file-annotation */

import React      from 'react';
import PropTypes  from 'prop-types';
import {connect}  from 'react-redux'
import './CoversView.scss';

import Folder     from './Folder';

class CoversView extends React.Component {

  componentDidMount(){
  }


  render() {


    debugger;

    return (
      <div className='covers-area'>
        {this.props.files.map(file =>{
          return <div className='tile'>
            <img className='cover' src={'/cover/' +file.name}></img>
            <div className='title'>{file.name}</div>
          </div>;
        })}
      </div>
    );
  }
}




function mapStateToProps(state) {
  debugger;
  return { files: state.folder  }
}

function mapDispatchToProps(dispatch) {
  return {
    open: () =>
      dispatch({type: 'OPEN_ARCHIVE'})
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CoversView)
