import React from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'

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



  handleClick(index){
    let pages =  this.state.pages;
    let state = this.state;
    let from = state.offset;
    let to =  Math.max(state.offset - state.width, -1 *( state.pages.length -1) * state.width);
    this.slide(from, to);
  }

  slide(from, to){

    let delta = (to - from) / 100;
    let counter = 0;

    let timer = setInterval( () => {

      let state = this.state;
      state.offset += delta;
      this.setState(state);

      if ( ++ counter  == 100){
        clearInterval(timer);
      }

    }, 10)

  }

  render () {

    let pages = this.state.pages.map( (page, index) =>{
        const style = { width: this.state.width };
        return <div className='page' style={style} key={page.image}><img src={'/icons/' +page} /></div>
    })

    let filmstrip_style = {left: this.state.offset, position:"absolute"}

    return (
      <div className='viewport' onClick={() => {this.handleClick()}}>
        <div className='filmstrip' style={filmstrip_style}>
          {pages}
        </div>
      </div>
    )
  }
}

export default Reader
