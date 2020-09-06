import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import axios from 'axios'

import { UserOutlined } from '@ant-design/icons';


import { Row, Col, Layout, Menu } from 'antd';
import { setLogoutUser, setAdmin } from '../../state/actions/auth'

const { Header } = Layout;
const { SubMenu } = Menu;




const Nav = ({ authenticated, setLogoutUser, setAdmin }) => {
  const styles = {
    headerStyles: {
      backgroundColor: "white"
    },
    menuStyle: {
      border: 'none', color: 'dodgerblue'
    },
    subStyle: {
      width: 125
    },
    menuItemStyle: {
      padding: 0
    }
  }
  const logout = () => {
    return axios.get('auth/logout')
      .then(res => {
        //set admin to false
        setAdmin(false)
        setLogoutUser()
      }).catch(err => {
        console.log(err)
      })
  }



  return authenticated ?
    (<Header style={styles.headerStyles}>
      <Row justify="space-around">
        <Col span={1}>
          <Link to="/">Blogger</Link>
        </Col>
        <Col span={1} offset={17} style={{ paddingTop: 10, marginRight: 50 }}>
          <Menu
            mode="inline"
            style={styles.menuStyle}
            icon={<UserOutlined />}
          >
            <SubMenu
              icon={<UserOutlined />}
              mode="inline"
              key="sub1"
              title={"Profile"
              }
              style={styles.subStyle}
            >
              <Menu.Item style={styles.menuItemStyle} key="1"><Link to="/user">Account</Link></Menu.Item>
              <Menu.Item style={styles.menuItemStyle} key="2"><Link to="/" onClick={(e) => logout()}>Logout</Link></Menu.Item>
            </SubMenu>
          </Menu >
        </Col>
      </Row>
    </Header >
    ) : (<Header style={{ backgroundColor: "white" }}>
      <Row>
        <Col span={2}><Link to="/">Blogger</Link></Col>
        <Col span={1} offset={20}><Link to="/login">Login</Link></Col>
      </Row>
    </Header>)

}


const mapStateToProps = state => ({
  authenticated: state.userData.authenticated,
});
const mapDispatchToProps = { setLogoutUser, setAdmin };
export default connect(mapStateToProps, mapDispatchToProps)(Nav)