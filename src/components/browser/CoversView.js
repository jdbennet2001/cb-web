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
      <div>
        {this.props.files.map(file =>{
          return <div>{file.name}</div>;
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
