import React, { PureComponent } from 'react'
import axios from 'axios';
import { Layout } from 'antd';

import { connect } from 'react-redux'
import { authenticatedLogin, getUserData } from '../../state/actions/auth'
import { publicBloggs } from '../.././state/actions/blogger'
import BlogBody from '../Blog/BlogBody';
import Nav from '../Nav/Nav'
const { Content, Footer } = Layout;
const styles = {
  rootContainer: {
    backgroundColor: "tomato",
    height: "100%",
    margin: "20px",

  },
  contentStyle: {
    height: "65%",
    padding: "2%"
  },
  footStyle: {
    textAlign: 'center', backgroundColor: 'dodgerblue'
  }
};

class Main extends PureComponent {

  componentDidMount() {

    this.publicBlogs()
    if (!this.props.authenticated) {
      this.props.authenticatedLogin()
    }
    this.props.getUserData()
  }

  async publicBlogs() {
    if (this.props.allBlogs.length < 1) {
      let res = await axios.get('blog/publicblogs');
      this.props.publicBloggs(res.data)
    }
  }

  render() {


    return <div><Nav /><Layout className="layout" style={styles.rootContainer}>

      <Content style={styles.contentStyle}>
        <BlogBody />
      </Content>


      <Footer style={styles.footStyle}>Blogger ©2020</Footer>
    </Layout ></div>

  }
}
const mapStateToProps = state => ({
  allBlogs: state.bloggerData.publicBlogs,
  myBlogs: state.bloggerData.myBlogs,

  userData: state.userData.userData,
  authenticated: state.userData.authenticated,
});
const mapDispatchToProps = { authenticatedLogin, getUserData, publicBloggs };
export default connect(mapStateToProps, mapDispatchToProps)(Main)