import React      from 'react';
import {connect}  from 'react-redux'

import './Folder.scss';

class Folder extends React.Component {

  state = { open: false };

  handleClick = (e) => {
    debugger;
    this.setState({ open: !this.state.open });
    this.props.loadFolder(this.props.name);
    e.stopPropagation();
  };

  get_children(folders = []){
    if ( folders.length === 0 || this.state.open == false){
      return <div></div>;
    }else{
      return folders.map(folder =>{
        return <Folder key={folder.directory} name={folder.name} folders={folder.folders}></Folder>;
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

function fetchFolder(forPerson) {
  return function(dispatch) {
    return fetch("/model")
      .then(response => {
        return response.json();
      })
      .then(model => {
        return dispatch({ type: "FOLDER", files: model.files });
      });
  };
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    loadFolder: () =>
      dispatch(fetchFolder('default'))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Folder)
