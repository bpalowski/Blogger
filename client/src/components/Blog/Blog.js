import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { setUserData } from '../../state/actions/auth'
import { publicBloggs, setBlog, updateBloggs, setPublicBlogs } from '../.././state/actions/blogger'
import { arrayBufferToBase64 } from '../../utils/buffer'
import Nav from '../Nav/Nav'
import CommentForm from '../Comment/CommentForm'
import AuthEditDelete from '../Auth/AuthEditDelete'

import me from '../../img/me.jpeg'

import CardBody from '../Comment/CardBody'
import SuccessDelete from '../Results/SuccessDelete'

import { YoutubeFilled, GithubFilled, LinkedinFilled, TwitterSquareFilled } from '@ant-design/icons';

import { Col, Spin, Row, Card, Divider, Avatar, Typography } from 'antd';
const { Text, Paragraph, Title } = Typography;

const Blog = ({ setUserData, location, userobj, authenticated, admin, currentBlog }) => {

  const [getRequest, updateRequest] = useState(false)
  const [formSent, updateFormResult] = useState(false)
  const [isDeleted, updateDelete] = useState(false)
  const { blogObj } = location.state


  useEffect(() => {

    if (!authenticated) {
      setUserData()
    }


  })
  const styles = {

    container: {
      margin: "5px",
      padding: "25px",
      border: "none",
    },
    avatar: {

    },
    name: {
      margin: "10px 0px 0px 10px",
      fontSize: "15px"
    },
    rowStyle1: {

      marginLeft: "10px",
      padding: "2%"

    },

    rowStyle2: {

      border: "none",
      marginTop: "30px",

    },
    col2: {

    },
    rowStyle3: {

      width: "100vw",
      marginTop: "40px",
      backgroundColor: "white",

      textAlign: "center"
    },
    card: {

    },
    img: {
      height: "100%",
      width: "100%"
    },
    auth: {
      marginTop: "1vh"
    },
    commentBoardContainer: {
      margin: "30px 40px 40px 40px",
      padding: "5px",
    },
    divider: {
      borderBottom: "1px solid #DCDCDC"
    },
    rowInnerCard: {

      margin: "5px 0px 0px 0px",

    },
    cards: {
      marginTop: "20px"
    },
    youtube: {
      color: "#c4302b",
      fontSize: "20px",

    },
    linkedin: {
      color: "#2867B2",
      fontSize: "20px",
      marginLeft: "5px"

    },
    github: {
      color: "#24292e",
      fontSize: "20px",
      marginLeft: "5px"

    },
    twitter: {

      color: "#1DA1F2",
      fontSize: "20px",
      marginLeft: "5px"

    }
  }

  if (isDeleted) {
    return <SuccessDelete />
  }
  return (
    <div >
      <Nav />
      {blogObj ?
        <div style={styles.container}>
          <Title>{blogObj.title}</Title>


          <div style={styles.auth}>
            {admin && authenticated ? <AuthEditDelete key={userobj} user={userobj} authenticated={authenticated} blogObj={blogObj} isdeleted={updateDelete} /> : ''}
          </div>
          <Row style={styles.rowStyle1} >

            <Col style={styles.avatar}><Avatar size={40} src={me} /></Col>
            <Col style={styles.name}><Text strong type="secondary">Brian Palowski</Text>

              <Row style={styles.rowInnerCard} >
                <Col>
                  <YoutubeFilled style={styles.youtube} />
                </Col>
                <Col>
                  <TwitterSquareFilled style={styles.twitter} />
                </Col>
                <Col>
                  <LinkedinFilled style={styles.linkedin} />
                </Col>
                <Col>
                  <GithubFilled style={styles.github} />
                </Col>
              </Row>

            </Col>


          </Row>


          {<Row style={styles.rowStyle2} justify="space-around">
            <Col style={styles.col2}>
              <Card style={styles.card}>
                <img style={styles.img} alt="card" src={`data:image/jpeg;base64,${arrayBufferToBase64(blogObj.image.data)}`} />
              </Card>
            </Col>

          </Row>}

          <Row justify="space-around">
            <Col style={styles.rowStyle3} >
              <Paragraph>{blogObj.bodyText}</Paragraph>
            </Col>

          </Row>
          <Divider style={styles.divider} />


          <div style={styles.commentBoardContainer}>

            {authenticated ? <Row style={styles.row1}>
              <Col span={24}>
                <Card style={{ padding: "2%" }}><CommentForm dataBlog={blogObj} getUpdateData={updateRequest} didSubmit={updateFormResult} /></Card>
              </Col>
            </Row> : ''}

            <div style={styles.cards}>
              <CardBody
                submitted={updateFormResult}
                eventNotify={formSent}
                blog={blogObj}
                currentBlogArray={currentBlog}
              />
            </div>

          </div>
        </div>
        : <Spin delay={9} size="large" />}
    </div >)
}


const mapStateToProps = state => ({
  publicBlogs: state.bloggerData.publicBlogs,
  userobj: state.userData.userData,
  myBlogs: state.bloggerData.myBlogs,
  admin: state.userData.admin,
  authenticated: state.userData.authenticated,
  updateBlog: state.bloggerData.updateBlog,
  currentBlog: state.bloggerData.currentBlog
});
const mapDispatchToProps = { setUserData, publicBloggs, updateBloggs, setPublicBlogs, setBlog };
export default connect(mapStateToProps, mapDispatchToProps)(Blog)