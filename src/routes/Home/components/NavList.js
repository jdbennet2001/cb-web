/* eslint-disable flowtype/require-valid-file-annotation */

import React      from 'react';
import PropTypes  from 'prop-types';
import {connect}  from 'react-redux'
import './NavList.scss';

import Folder     from './Folder';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class NavList extends React.Component {


  render() {


    let folders = this.props.folders || [];
    let lists_items = folders.map(folder =>{
        return <Folder name={folder.name} folders={folder.folders} ></Folder>
    });

    debugger;
    return (
      <div>
        {lists_items}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { folders: state.catalog.folders }
}

function mapDispatchToProps(dispatch) {
  return {
    selectFolder: () =>
      dispatch({
        type: "selectFolder"
      })
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(NavList)
