import React, { Component } from 'react'

import { connect } from 'react-redux'
import { authenticatedLogin } from '../../state/actions/index'

import { Layout } from 'antd';

const { Content, Footer } = Layout;

class Main extends Component {

  componentDidMount() {
    if (!this.props.authenticated) {
      this.props.authenticatedLogin()
    }

  }



  render() {
    return (
      <Layout className="layout" >
        <Content style={{ width: '100vw', height: '100vh' }}>
          <div>All Public Blogs</div>
        </Content>
        <Footer style={{ textAlign: 'center', backgroundColor: 'dodgerblue' }}>Blogger ©2020</Footer>
      </Layout >
    )
  }

}



const mapStateToProps = state => ({
  authenticated: state.userData.authenticated,
});
const mapDispatchToProps = { authenticatedLogin };
export default connect(mapStateToProps, mapDispatchToProps)(Main)