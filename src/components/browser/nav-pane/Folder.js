import React      from 'react';
import {connect}  from 'react-redux'
var appendQuery = require('append-query')

import './Folder.scss';

class Folder extends React.Component {

  state = { open: false };

  handleClick = (e) => {
    this.props.loadFolder(this.props.directory);

    this.setState({ open: !this.state.open });
    e.stopPropagation();
  };

  get_children(folders = []){
    if ( folders.length === 0 || this.state.open == false){
      return <div></div>;
    }else{
      return folders.map(folder =>{
        return <Folder key={folder.directory} loadFolder={this.props.loadFolder} directory={folder.directory} name={folder.name} folders={folder.folders}></Folder>;
      })
    }
  };


  render(){

    let children = this.get_children(this.props.folders);
    return(
    <div onClick={this.handleClick} className='folder'>{this.props.name}
      {children}
    </div>
  )
  }

}

function fetchFolder(directory) {
  const uri = appendQuery('/files', {directory});
  return function(dispatch) {
    return fetch(uri)
      .then(response => {
        return response.json();
      })
      .then(files => {
        return dispatch({ type: "FOLDER", files: files });
      });
  };
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    loadFolder: (directory) =>
      dispatch(fetchFolder(directory))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Folder)
