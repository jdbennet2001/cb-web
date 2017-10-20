/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import './NavList.scss';

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

  state = { open: true };

  handleClick = () => {
    debugger;
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes } = this.props;
    return (
      <div onClick={this.handleClick} >Hello World</div>
    );
  }
}

// NavList.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default (NavList);
