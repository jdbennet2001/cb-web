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
  let width = this.isIpad() ? window.outerWidth +16 : window.outerWidth;
  let height = window.innerHeight;
    state = Object.assign(state, {
      width,
      height,
      pages: [ "bone.jpg", "bone_02.jpg","batman_w.jpg", "flash.jpg", "bone_04.jpg", "bone_03.jpg" ]
    });
    this.setState(state);
}

isIpad(){
  return navigator.userAgent.indexOf('Chrome') == -1;
}

handleKeyPress(e){

  const RIGHT_ARROW = 39;
  const LEFT_ARROW = 37;


  if (e.keyCode == RIGHT_ARROW){
   this.reactSwipe.next();
  }else if (e.keyCode=== LEFT_ARROW){
    this.reactSwipe.prev();
  }
}



  render () {


    let style = {height : this.state.height, width: this.state.width};
    let class_names = this.isIpad() ? 'page ipad' : 'page';


    let pages = this.state.pages.map( (page,index) => {
      return <div style={style} className={class_names} key={'parent-' +index} >
                <img src={'/icons/' +page}  key={index}/>
            </div>
    })

    return (
      <div className='reader' tabIndex='0' onKeyDown={(event) => this.handleKeyPress(event)} >
       <ReactSwipe key={pages.length} ref={reactSwipe => this.reactSwipe = reactSwipe}  className="carousel" swipeOptions={{continuous: false}}>
          {pages}
      </ReactSwipe>
      </div>
    )
  }
}

export default Reader
