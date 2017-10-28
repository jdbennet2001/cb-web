import React from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import ReactSwipe from 'react-swipe';

import './Reader.scss'

class Reader extends React.Component {

constructor(props) {
  super(props);
  this.state = {
    pages: [ "bone.jpg", "bone_02.jpg","bone_03.jpg" ],
    offset: 0
  };

  this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
}

componentDidMount() {
  this.updateWindowDimensions();
  window.addEventListener('resize', this.updateWindowDimensions);
}

componentWillUnmount() {
  window.removeEventListener('resize', this.updateWindowDimensions);
}

updateWindowDimensions() {
  let state = this.state;
      state = Object.assign(state, { width: window.innerWidth, height: window.innerHeight });
  this.setState(state);
}

handleClick(){
   this.reactSwipe.next();
}



  render () {

    // let pages = this.state.pages.map( (page, index) =>{
    //     const style = { width: this.state.width };
    //     return <div className='page' style={style} key={'bone' + index}><img src={'/icons/' +page} /></div>
    // })

    // let style = {height : this.state.height, width: this.state.width};

    let style={};

    let pages = this.state.pages.map( (page,index) => {
      return <img src={'/icons/' +page} style={style} key={index}/>
    })

    return (
      <div className='reader' onClick={() => this.handleClick()} >
       <ReactSwipe ref={reactSwipe => this.reactSwipe = reactSwipe}  className="carousel" swipeOptions={{continuous: false}}>
          {pages}
      </ReactSwipe>
      </div>
    )
  }
}

export default Reader
