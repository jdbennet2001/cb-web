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
    pages: [],
    offset: 0
  };

  this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
}

componentDidMount() {
  this.updateWindowDimensions();
  window.addEventListener('resize', this.updateWindowDimensions);

  window.addEventListener("orientationchange", this.updateWindowDimensions);
}

componentWillUnmount() {
  window.removeEventListener('resize', this.updateWindowDimensions);
  window.removeEventListener("orientationchange", this.updateWindowDimensions);
}

updateWindowDimensions() {
  let state = this.state;
    state = Object.assign(state, {
      width: window.outerWidth,
      height: window.innerHeight,
      pages: [ "bone.jpg", "bone_02.jpg","batman_w.jpg", "flash.jpg", "bone_04.jpg", "bone_03.jpg" ]
    });
    //alert(`${state.width} - ${state.height}`)
    this.setState(state);
}

handleClick(){
   this.reactSwipe.next();
}



  render () {


    let style = {height : this.state.height, width: this.state.width};


    let pages = this.state.pages.map( (page,index) => {
      return <div style={style} className='page' key={'parent-' +index} >
                <img src={'/icons/' +page}  key={index}/>
            </div>
    })

    return (
      <div className='reader'  onClick={() => this.handleClick()} >
       <ReactSwipe key={pages.length} ref={reactSwipe => this.reactSwipe = reactSwipe}  className="carousel" swipeOptions={{continuous: false}}>
          {pages}
      </ReactSwipe>
      </div>
    )
  }
}

export default Reader
