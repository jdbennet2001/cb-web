import React from 'react'
import './HomeView.scss'
import NavList from './NavList'

export const HomeView = () => (
  <div className='home-page'>
    <div className='nav-pane'>
      <NavList></NavList>
    </div>
    <div className='content-pane'></div>
  </div>
)

export default HomeView
