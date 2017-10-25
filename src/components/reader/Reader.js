import React from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'

import './Reader.scss'

class Reader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {pages: ['bone.jpg', 'bone_02.jpg', 'bone_03.jpg']}
  }

  shouldComponentUpdate () {
    return false
  }

  componentDidMount(){
    //this.fetchData();
  }

  handleClick(e){
    debugger;
    alert('click!');
  }

  render () {

    let pages = this.state.pages.map( (page, index) =>{
        return <div className='page' onClick={() =>this.handleClick({index})} key={page}><img src={'/icons/' +page} /></div>
    })

    return (
      <div className='viewport'>
        {pages}
      </div>
    )
  }
}

export default Reader
