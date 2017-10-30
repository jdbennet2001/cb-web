import React from 'react'
import './HomeView.scss'
import NavList from './NavList'
import CoversView from './CoversView'
import TitleBar from './TitleBar'

export const HomeView = () => (
  <div className='browser-page'>
    <TitleBar></TitleBar>
    <div className='home-page'>
      <div className='nav-pane'>
        <NavList>
        </NavList>
      </div>
      <div className='content-pane'>
        <CoversView router={this.props}>
        </CoversView>
      </div>
    </div>
  </div>
)

export default HomeView
