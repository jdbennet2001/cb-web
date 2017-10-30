import React from 'react'
import './HomeView.scss'
import NavList from './nav-pane/NavList'
import CoversView from './dashboard/CoversView'
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
