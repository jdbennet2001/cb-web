import React from 'react'
import { browserHistory, Router, Route } from 'react-router'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import HomeView from './browser/HomeView'
import Reader from './reader/Reader'

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
  }

  shouldComponentUpdate () {
    return false
  }

  componentDidMount(){
    //this.fetchData();
  }



  render () {
    return (
      <Provider store={this.props.store}>
        <div style={{ height: '100%' }}>
        
          <Router history={browserHistory}>
              <Route path='/' component={HomeView}></Route>
              <Route path='/reader' component={Reader}></Route>
          </Router>

        </div>
      </Provider>
    )
  }
}

export default App
