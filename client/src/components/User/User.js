import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { getUserData, setLogoutUser, setAdmin } from '../../state/actions/auth'
import { setMyBlog } from '../../state/actions/blogger'

import { Redirect } from 'react-router';

import {
  UploadOutlined,
  UserOutlined,
  LogoutOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FileAddOutlined,
  ReadOutlined

} from '@ant-design/icons';

import BlogCard from '../Blog/BlogCard'
import axios from 'axios'

import { Layout, Spin, Button, Card, Row, Col, Menu } from 'antd';
const { Content, Footer, Sider, Header } = Layout;
const { SubMenu } = Menu;

const styles = {
  constentStyle: {
    width: '80vw',
    height: '100vh',
    background: "#CD5C5C"
  },
  rowStyle: {
    paddingTop: 0
  },
  cardStyle: {
    margin: 0, padding: 0, boxShadow: "0px 1px 5px 0px #676767"
  },
  cardStyle2: {
    margin: 20, padding: 50, boxShadow: "0px 1px 5px 0px #676767"
  },
  cardStyle3: {
    margin: 20, padding: 50, boxShadow: "0px 1px 5px 0px #676767"
  },
  sider: {
    backgroundColor: "#F3EFE0"
  },
  footer: {
    textAlign: 'center', backgroundColor: 'dodgerblue', marginTop: "40px"
  }
}

class User extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      collapsed: false,
      myBlogArr: [],
      blogData: []
    }
  }

  componentDidMount() {

    this.getMyBlogs()
    if (this.props.userData.length === 0) {
      this.props.getUserData()
    }

  }

  getMyBlogs = async () => {
    return await axios.get('blog/myblogs')
      .then(res => {
        return this.props.setMyBlog(res.data)
      }).catch(err => {
        console.log(err)
      })
  }


  logout = () => {
    return axios.get('auth/logout')
      .then(res => {
        //set admin to false
        setAdmin(false)
        setLogoutUser()
      }).catch(err => {
        console.log(err)
      })
  }


  getBlog = (data) => {
    if (data) {
      return this.setState({ blogData: [data] })
    }
  }
  userView = () => {

    const data = this.props.userData.length === 1;
    if (!data) {
      return <Spin />
    }
    return (
      <Layout>

        <Sider style={styles.sider} trigger={null} collapsible collapsed={this.state.collapsed} breakpoint="lg" collapsedWidth="0"
        >

          <Menu style={styles.sider} mode="inline" >
            <Menu.Item key="1" icon={<FileAddOutlined />}>
              <Link to="/createblog">Create Blog</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<ReadOutlined />}>
              <Link to="/">All Blogs</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
              <Link to="/">All Users</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<LogoutOutlined />}>
              <Link to="/">Logout</Link>
            </Menu.Item>
          </Menu>
        </Sider>


        <Layout style={styles.constentStyle}>
          <Content>

            <Row justify="center" style={styles.rowStyle}>
              {this.props.myBlogs.map((x, i) => (
                <BlogCard key={x._id} obj={x} getBlogMethod={this.getBlog} />
              ))}
            </Row>

          </Content >


        </Layout >
      </Layout >

    )
  }

  render() {
    if (this.state.blogData.length > 0) {
      return <Redirect to={{ pathname: `/blog/${this.state.blogData[0].title}`, blogObj: this.state.blogData[0] }} />
    }
    return this.props.myBlogs ? this.userView() : <Spin />
  }

}

const mapStateToProps = state => ({
  authenticated: state.userData.authenticated,
  userData: state.userData.userData,
  myBlogs: state.bloggerData.myBlogs[0]
});
const mapDispatchToProps = { getUserData, setMyBlog };
export default connect(mapStateToProps, mapDispatchToProps)(User)