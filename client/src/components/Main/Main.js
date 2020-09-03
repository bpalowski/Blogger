import React, { PureComponent } from 'react'
import Blog from '../Blog/Blog'

import { connect } from 'react-redux'
import { authenticatedLogin, getUserData } from '../../state/actions/auth'


class Main extends PureComponent {
  componentDidMount() {
    if (this.props.authenticatedLogin) {
      this.props.getUserData()
    }
  }


  render() {
    return <Blog />
  }

}



const mapStateToProps = state => ({
  userData: state.userData.userData,
  authenticated: state.userData.authenticated,
});
const mapDispatchToProps = { authenticatedLogin, getUserData };
export default connect(mapStateToProps, mapDispatchToProps)(Main)