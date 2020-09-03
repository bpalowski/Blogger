import React, { Component } from 'react'
import { connect } from 'react-redux'

import { authenticatedLogin, getUserData } from '../../state/actions/auth'

import { Layout, Row, Col } from 'antd';


const { Content, Footer } = Layout;

class Blog extends Component {
  // componentDidMount() {
  //   this.props.getUserData()
  // }

  render() {
    return (
      <Layout className="layout" >
        <Content style={{ width: '100vw', height: '100vh' }}>
          <Row justify="center">
            <Col>
              <h1>Hello</h1>
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: 'center', backgroundColor: 'dodgerblue' }}>Blogger ©2020</Footer>
      </Layout >
    )
  }

}


const mapStateToProps = state => ({
  userData: state.userData.userData,
});
const mapDispatchToProps = { authenticatedLogin, getUserData };
export default connect(mapStateToProps, mapDispatchToProps)(Blog)