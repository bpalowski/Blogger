import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getUserData } from '../../state/actions/auth'
import { publicBloggs } from '../.././state/actions/blogger'
import { arrayBufferToBase64 } from '../../utils/buffer'
import Nav from '../Nav/Nav'

import { Col, Layout, Menu, Breadcrumb, Spin, Row, Card } from 'antd';


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
    // height: "auto",
    // width: "auto",
    marginTop: "30px",

  },
  col2: {
    // padding: "10px"
  },
  rowStyle3: {
    height: "25vh",
    marginTop: "40px",
    backgroundColor: "grey"
  },
  card: {
    // width: "55vw",
    // height: "35vw"
  },
  img: {
    maxWidth: "100%"
  }

}

const Blog = (props) => {
  const [img, updateImg] = useState()
  const { blogObj } = props.location


  useEffect(() => {
    if (blogObj) {
      updateImg(arrayBufferToBase64(blogObj.image.data))
    }


  })

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
            <Col style={styles.col2}>
              <Card style={styles.card}>
                <img style={styles.img} src={`data:image/jpeg;base64,${img}`} />
              </Card>
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