import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { setUserData, setLogoutUser } from '../../state/actions/auth'
import { setMyBlog, updateBloggs } from '../../state/actions/blogger'




import {

  LogoutOutlined,

  FileAddOutlined,
  ReadOutlined,


} from '@ant-design/icons';

import BlogCard from '../Blog/BlogCard'
import axios from 'axios'
import {
  Layout, Spin, Row, Menu, Typography
} from 'antd';
import Title from 'antd/lib/skeleton/Title';
const { Content, Sider } = Layout;

const { Text } = Typography;
const styles = {
  constentStyle: {

    height: '100vh',
    passing: '2%',
    backgroundColor: "white"
  },
  rowStyle: {
    paddingTop: 0,

  },
  content: {
    height: "100vh",
    marginTop: "40px"
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
    width: "70%",
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
      blogData: [],
      trueUser: false,
      myComments: []
    }
  }

  componentDidMount() {
    this.commentList()
    this.props.setUserData()
    this.getAuthBlog()
  }

  getAuthBlog = () => {
    if (this.props.admin && this.props.authenticated) {
      this.getMyBlogs()
    }
  }

  commentList = () => {
    if (!this.props.admin) {
      this.getCommentList()
    }
  }


  getCommentList = async () => {

    let res = await axios.get('/blog/myComments', {
      params: {
        id: this.props.userData.id
      }
    })

    if (res.data) {

      this.setState({
        myComments: res.data
      })
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
        setLogoutUser()
        window.location.reload(false);
      }).catch(err => {
        console.log(err)
      })
  }

  userView = () => {

    const data = this.props.myBlogs;
    if (!data) {
      return <Spin />
    }
    return (
      <Layout>
        <Sider style={styles.sider} trigger={null} collapsible collapsed={this.state.collapsed} breakpoint="lg" collapsedWidth="0">

          {this.props.admin ? <Menu style={styles.sider} mode="inline" >
            <Menu.Item key="1" icon={<FileAddOutlined />}>
              <Link to="/createblog">Create Blog</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<ReadOutlined />}>
              <Link to="/">All Blogs</Link>
            </Menu.Item>

            <Menu.Item key="3" icon={<LogoutOutlined />}>
              <Text onClick={this.logout}>Logout</Text>
            </Menu.Item>
          </Menu> : <Menu style={styles.sider} mode="inline" >
              <Menu.Item key="1" icon={<FileAddOutlined />}>
                <Link to="/">Main</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<ReadOutlined />}>
                <Text onClick={this.logout}>Logout</Text>
              </Menu.Item>

            </Menu>}
        </Sider>


        {this.props.admin && this.props.authenticated ? <Layout style={styles.constentStyle}>
          <Content style={styles.content}>
            <Row justify="center" >
              {this.props.myBlogs.map((x, i) => (
                <BlogCard key={x._id} obj={x} />
              ))}
            </Row>
          </Content >
        </Layout > : !this.props.admin && this.props.authenticated
            ? <Content>
              <Row justify="center" >
                {this.state.myComments.map((x, i) => (

                  <BlogCard key={x._id} obj={x} />
                ))}
              </Row>
            </Content > : this.state.myComments.length <= 1 ? <Title>Looks like you have not made any comments</Title> : <Spin />}
      </Layout >
    )
  }

  render() {
    return this.props.myBlogs ? this.userView() : <Spin />
  }

}

const mapStateToProps = state => ({
  admin: state.userData.admin,
  authenticated: state.userData.authenticated,
  userData: state.userData.userData,
  myBlogs: state.bloggerData.myBlogs,
  updateBlog: state.bloggerData.updateBlog
});
const mapDispatchToProps = { setUserData, setMyBlog, updateBloggs };
export default connect(mapStateToProps, mapDispatchToProps)(User)