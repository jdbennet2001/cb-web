import React from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import {connect}  from 'react-redux'
import Swipeable from "react-swipeable";
import _ from 'lodash';

import './Reader.scss'

const PAGE_0 =  "https://static.comicvine.com/uploads/original/0/40/3198571-6+flsann_2_33.jpg";
const PAGE_1 =  "http://www.freaksugar.com/wp-content/uploads/2017/07/FLS_27_1.jpg";
const PAGE_2 =   "http://image.11comic.com/images/proimg/160426051000449i/160426051000449i_6.jpg";


class Reader extends React.Component {



constructor(props) {
  super(props);

  debugger;

    var hash = window.location.hash.substr(1);

    var result = hash.split('&').reduce(function (result, item) {
        var parts = item.split('=');
        result[parts[0]] = parts[1];
        return result;
    }, {});

    const archive = result.archive;
    const count = parseInt(result.length);

    this.state = {
      paddingLeft: 0,
      paddingRight: 0,
      count,
      archive,
      page_number: 0,
      page: `/page?archive=${encodeURIComponent(archive)}&number=${0}`
    };

}

componentDidUpdate() {
  
  try{
    // this.swipeableEl.scrollTop = 0;
  }catch(err){}
  // this.updateWindowDimensions();
  // window.addEventListener('resize', this.updateWindowDimensions);

  // window.addEventListener("orientationchange", this.handleOrientationChange);
}

// componentWillUnmount() {
//   window.removeEventListener('resize', this.updateWindowDimensions);
//   window.removeEventListener("orientationchange", this.handleOrientationChange);
// }

swiping(e, deltaX, deltaY, absX, absY, velocity) {
  console.log("You're Swiping...", e, deltaX, deltaY, absX, absY, velocity);
}

swipingLeft(e, absX) {
  let state = Object.assign({}, this.state);
  state.paddingRight = absX;
  this.setState(state);
  console.log("You're Swiping to the Left...", e, absX);
}

swipingRight(e, absX) {
  let state = Object.assign({}, this.state);
  state.paddingLeft = absX;
  this.setState(state);
  console.log("You're Swiping to the Right...", e, absX);
}

swiped(e, deltaX, deltaY, isFlick, velocity) {

  if (deltaX > 100) {
    this.updatePage('FORWARD')
  } else if (deltaX < -100) {
    this.updatePage('BACK');
  }


  console.log("You Swiped...", e, deltaX, deltaY, isFlick, velocity);
}

swipedUp(e, deltaY, isFlick) {
  console.log("You Swiped Up...", e, deltaY, isFlick);
}

onTap(e){
  if ( e.clientX > 500 ){
    this.updatePage('FORWARD');
  }
}

handleKeyPress(e) {
  const RIGHT_ARROW = 39;
  const LEFT_ARROW = 37;

  if (e.keyCode == RIGHT_ARROW) {
    this.updatePage('FORWARD');
  } else if (e.keyCode === LEFT_ARROW) {
    this.updatePage('BACK');
  }
}


rightClick(e){
  e.preventDefault(); 
  this.updatePage('FORWARD');
  return false;
}

updatePage(direction) {

   let state = Object.assign({}, this.state, {
    paddingLeft: 0,
    paddingRight: 0
  });

  let next_archive = this.nextIssue(state.archive);
  let last_archive = this.previousIssue(state.archive);

  let last_page = (state.page_number === state.count -1);
  let first_page = (state.page_number === 0);

  if ( last_page && !next_archive && direction === 'FORWARD' ){
    return this.setState(state);
  }

  if ( first_page && !last_archive && direction === 'BACK' ){
    return this.setState(state);
  }

  if ( last_page  &&  direction == 'FORWARD'){
    state.archive = next_archive.location;
    state.page_number = 0;
  }else if ( first_page && direction === 'BACK' ){
    state.archive = last_archive.location;
    state.page_number = 0;
  }else if (direction === 'FORWARD'){
    state.page_number = Math.min(state.page_number+1, state.count-1);
  }else{
    state.page_number = Math.max(state.page_number-1, 0);
  }


  state.page = `/page?archive=${encodeURIComponent(state.archive)}&number=${state.page_number}`;
  
  this.setState(state);

  this.swipeableEl.scrollTop = 0;

}

pageRedraw(e){
  if ( !e ){
    return;
  }

  e.element.focus();
}


goBack(){

 browserHistory.push(`/`);

}

nextIssue(archive){
  //Code to move to next issue in directory
    let issue = _.findIndex(this.props.files, file=>{
      return file.location === archive;
    })

    let next = _.nth(this.props.files, ++issue);
    return next;
}

previousIssue(archive){
  //Code to move to next issue in directory
    let issue = _.findIndex(this.props.files, file=>{
      return file.location === archive;
    })

    let next = _.nth(this.props.files, --issue);
    return next;
}

  render () {

    let state = this.state;
    let divStyle = this.state;
    
    let page_number = state.page_number;
    let next_number = page_number + 1;

    let page = `/page?archive=${encodeURIComponent(state.archive)}&number=${page_number}`;
    let next_page = `/page?archive=${encodeURIComponent(state.archive)}&number=${next_number}`;

    this.canvas = <Swipeable
        className="reader"
        onSwipingLeft={this.swipingLeft.bind(this)}
        onSwipingRight={this.swipingRight.bind(this)}
        onSwiped={this.swiped.bind(this)}
        onKeyDown={event => this.handleKeyPress(event)} 
        onContextMenu={event => this.rightClick(event)}
        onClick={event =>this.onTap(event)}
        tabIndex="0"  
        innerRef={(el) => this.swipeableEl = el}
        >
        
        <img src={page} key={page} style={divStyle} className="App-logo"  />
        <img src={next_page} key={next_page} className="hidden" alt="pre-loaded-image" />
      </Swipeable>
    
    return this.canvas;

  }
}

function mapStateToProps(state) {
  return { files: state.folder  }
}

function mapDispatchToProps(dispatch) {
  return {
    open: () =>
      dispatch({type: 'OPEN_ARCHIVE'})
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Reader)
