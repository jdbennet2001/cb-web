import React from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import ReactSwipe from 'react-swipe';
import {connect}  from 'react-redux'
import _ from 'lodash';

import './Reader.scss'

class Reader extends React.Component {

constructor(props) {
  super(props);

    var hash = window.location.hash.substr(1);

    var result = hash.split('&').reduce(function (result, item) {
        var parts = item.split('=');
        result[parts[0]] = parts[1];
        return result;
    }, {});

    const archive = result.archive;
    const length = parseInt(result.length);

  this.state = {
    pages: [],
    offset: 0,
    home_icon: false,
    archive,
    length
  };

  this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
}

componentDidMount() {
  this.updateWindowDimensions();
  window.addEventListener('resize', this.updateWindowDimensions);

  window.addEventListener("orientationchange", this.handleOrientationChange);
}

componentWillUnmount() {
  window.removeEventListener('resize', this.updateWindowDimensions);
  window.removeEventListener("orientationchange", this.handleOrientationChange);
}

getPages(position = 0){

    let archive  = this.state.archive;
    let length = this.state.length;

    let pages = _.times(length, index =>{
      return `/blank-svg-page.svg`;
    })

    let start_image = Math.max( position-1, 0 );
    let end_image = Math.min(position + 2, length-1 );

    for ( var i = start_image; i <= end_image; i++ ){
      pages[i] = `/page?archive=${encodeURIComponent(archive)}&number=${i}`;
    }

    return pages;
}

updateWindowDimensions() {
  let pos = this.reactSwipe.getPos();
  let state = this.state;
  let width = this.isIpad() ? window.outerWidth +16 : window.outerWidth;
  let pages = this.getPages(pos);
  let height = window.innerHeight;
    state = Object.assign(state, {
      width,
      height,
      pages
    });
    this.setState(state);
}

isIpad(){
  return navigator.userAgent.indexOf('Chrome') == -1;
}

handleOrientationChange(e){
  //Force a page reload to get the correct aspect ratio
  browserHistory.push(`${window.location.pathname}${window.location.hash}`);
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

handleClick(e){
  let state = this.state;
  state.home_icon = !state.home_icon;
  this.setState(state);
}

goBack(){

 browserHistory.push(`/`);

}

transitionHandler(){
  let pos = this.reactSwipe.getPos();
  let state = this.state;
  let archive = state.archive;

  //Code to move to next issue in directory
  if ( pos === this.state.pages.length-1){
    let issue = _.findIndex(this.props.files, file=>{
      return file.location === archive;
    })

    let next = _.nth(this.props.files, ++issue);
    if ( next ){
      this.state.archive = next.location;
      this.state.length = next.length;
      pos = 0;
    }

  }

  let pages = this.getPages(pos);
      state = Object.assign(state, {pages} );
  this.setState(state);
}

  render () {


    let style = {height : this.state.height, width: this.state.width};
    let class_names = this.isIpad() ? 'page ipad' : 'page';

    let orientation = window.orientation || 'n/a';

    let pages = this.state.pages.map( (page,index) => {
      return <div style={style} className={class_names} key={'parent-'+index+'-'+orientation} >
                <img className='page_image' src={page}  key={index}/>
            </div>
    })

    let reader_back = <div></div>;
    if (this.state.home_icon){
      reader_back = <div onClick={() =>this.goBack()} className='reader-back'><img src='/icons/home.png'></img></div>
    }

    let swipeOptions = {
      continuous: false,
      transitionEnd: this.transitionHandler.bind(this)
    };

    let swipe_key = `${this.state.archive}_${pages.length}_${orientation}`

    return (
      <div className='reader' tabIndex='0' onClick={()=>this.handleClick()} onKeyDown={(event) => this.handleKeyPress(event)} >
       {reader_back}
       <ReactSwipe key={swipe_key} ref={reactSwipe => this.reactSwipe = reactSwipe}  className="carousel" swipeOptions={swipeOptions}>
          {pages}
      </ReactSwipe>
      </div>
    )
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
