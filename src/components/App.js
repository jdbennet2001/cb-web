import React from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import HomeView from '../routes/Home/components/HomeView'

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
          <HomeView />
        </div>
      </Provider>
    )
  }
}

export default App
