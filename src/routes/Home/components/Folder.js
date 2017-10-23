import React      from 'react';

import './Folder.scss';

class Folder extends React.Component {

  state = { open: false };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  get_children(folders = []){
    if ( folders.length === 0 || this.state.open == false){
      return <div></div>;
    }else{
      return folders.map(folder =>{
        return <Folder name={folder.name} folders={folder.folders}></Folder>;
      })
    }
  };

  // let action = {
  //   type: 'SELECT_FOLDER',
  //   text: this.props.name
  // }

  render(){

    let children = this.get_children(this.props.folders);
    debugger;
    return(
    <div onClick={this.handleClick} className='folder'>{this.props.name}
      {children}
    </div>
  )
  }

}

export default (Folder)
