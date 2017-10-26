import React from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'

import './Reader.scss'

class Reader extends React.Component {

constructor(props) {
  super(props);
  this.state = {
    pages: [ "bone.jpg", "bone_02.jpg","bone_03.jpg" ]
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
    this.slide( pages, index, 'left');
  }

  slide(pages, index, direction){

    let page = pages[index];

    this.timer(100, 25, count =>{
      let location = (direction === 'left') ? count * -1 : count;
      pages[index] = Object.assign(page, {location});
      this.setState(pages);
    });

  }

  timer(count, delay, callback){
      let i = 0;

      let timer = setInterval(() =>{
        i++;
        if (i === count){
          clearInterval(timer)
        }else{
          callback(i);
        }
      }, delay);
  }

  render () {

    let pages = this.state.pages.map( (page, index) =>{
      debugger;
        const style = {
          width: this.state.width
        };

        return <div className='page' style={style} key={page.image}><img src={'/icons/' +page} /></div>
    })

    return (
      <div className='viewport'>
        <div className='filmstrip'>
          {pages}
        </div>
      </div>
    )
  }
}

export default Reader
