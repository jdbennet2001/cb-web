import React from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'

class Reader extends React.Component {


  shouldComponentUpdate () {
    return false
  }

  componentDidMount(){
    //this.fetchData();
  }



  render () {
    return (
      <div>Your Text Here..</div>
    )
  }
}

export default Reader
