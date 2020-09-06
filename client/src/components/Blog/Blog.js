import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getUserData } from '../../state/actions/auth'
import { publicBloggs } from '../.././state/actions/blogger'
import Nav from '../Nav/Nav'

import { Col, Layout, Menu, Breadcrumb, Spin, Row } from 'antd';


const { Header, Content, Footer } = Layout;

const styles = {
  container: {
    margin: "20px",
    padding: "30px"
  },
  rowStyle1: {
    marginTop: "10px",
    backgroundColor: "grey",
    height: "15vh",
  },
  rowStyle2: {
    height: "30vh",
    marginTop: "30px",
    backgroundColor: "grey"
  },
  rowStyle3: {
    height: "25vh",
    marginTop: "40px",
    backgroundColor: "grey"
  }

}

const Blog = (props) => {

  const { blogObj } = props.location
  useEffect(() => { })

  return (
    <>
      <Nav />
      {blogObj ?
        <div style={styles.container}>
          <Row style={styles.rowStyle1} justify="space-around">
            <Col>

              <h1>{blogObj.title}</h1>
              <p>{blogObj.displayName}</p>
            </Col>

          </Row>
          <Row style={styles.rowStyle2} justify="space-around">
            <Col>
              <h1>Image</h1>
            </Col>

          </Row>

          <Row style={styles.rowStyle3} justify="center">
            <Col>
              <h1>{blogObj.bodyText}</h1>
            </Col>
          </Row>
        </div>
        : <Redirect to="/" />}
    </>)

}


const mapStateToProps = state => ({
  publicBlogs: state.bloggerData.publicBlogs,
});
const mapDispatchToProps = { getUserData, publicBloggs };
export default connect(mapStateToProps, mapDispatchToProps)(Blog)