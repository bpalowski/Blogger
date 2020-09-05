import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { getUserData } from '../../state/actions/auth'

import { Layout, Spin, Button, Card, Row, Col } from 'antd';
const { Content, Footer } = Layout;


const styles = {
  constentStyle: {
    width: '100vw', height: '100vh'
  },
  rowStyle: {
    paddingTop: 140
  },
  cardStyle: {
    margin: 20, padding: 50, boxShadow: "0px 1px 5px 0px #676767"
  },
  cardStyle2: {
    margin: 20, padding: 50, boxShadow: "0px 1px 5px 0px #676767"
  },
  cardStyle3: {
    margin: 20, padding: 50, boxShadow: "0px 1px 5px 0px #676767"
  },
  footer: {
    textAlign: 'center', backgroundColor: 'dodgerblue'
  }
}

class User extends PureComponent {
  componentDidMount() {
    if (this.props.userData.length === 0) {
      this.props.getUserData()
    }
  }




  userView() {

    const data = this.props.userData.length === 1;
    if (!data) {
      return <Spin />
    }
    return (
      <Layout className="layout" >
        <Content style={styles.constentStyle}>

          <Row justify="space-around" align="middle" style={styles.rowStyle}>
            <Col>
              <Card style={styles.cardStyle}>
                <Link to="/createblog">
                  <Button type="primary" >Create Blog</Button>
                </Link>
              </Card>
            </Col>

            <Col>
              <Card style={styles.cardStyle2}>
                <Button type="danger">ALL Blogs</Button>
              </Card>
            </Col>

            <Col>
              <Card style={styles.cardStyle3}>
                <Button type="primary">ALL Users</Button>
              </Card>
            </Col>
          </Row>

        </Content >
        <Footer style={styles.footer}>Blogger ©2020</Footer>
      </Layout >
    )
  }

  render() {
    return this.userView()
  }

}

const mapStateToProps = state => ({
  authenticated: state.userData.authenticated,
  userData: state.userData.userData,
});
const mapDispatchToProps = { getUserData };
export default connect(mapStateToProps, mapDispatchToProps)(User)