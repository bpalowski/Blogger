import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from "react-router-dom";

import { Card, Row, Button, Col, Typography, } from 'antd';
import { setBlog } from '../../state/actions/blogger'
import { arrayBufferToBase64 } from '../../utils/buffer'
const { Meta } = Card;
const { Title, Text } = Typography;

const BlogCard = ({ obj }) => {


  const [currentblogData, setBlogData] = useState()

  const styles = {
    cardContainer: {
      boxShadow: "1px 2px 1px 1px #ccc",
      width: "60vw",
      padding: "10px",
      marginBottom: "20px"
    },
    rowInfo: {
      margin: "1px",
    },
    cardStyle: {
      width: "40vw",
      border: "none"
    },
    spinStyle: {
    },
    avatar: {
      marginLeft: "10px"
    },

    img: {
      backgroundPosition: "center",
      height: "100px",
      width: "auto"
    },
    meta: {
      textAlign: "center",
      border: "none",
      overflow: "hidden",
      maxHeight: "60px",
    }
  }


  return currentblogData
    ?
    <Redirect
      to={{
        pathname: '/blog',
        search: `?q=${obj.title}`,
        state: { blogObj: obj }
      }}

    />
    :
    <Row justify="center" style={styles.cardContainer} key={obj._id}>
      <Col >
        <img style={styles.img} alt="card" src={`data:image/jpeg;base64,${arrayBufferToBase64(obj.image.data)}`} />
      </Col>
      <Col style={styles.col2}>
        <Row justify="space-between" >
          <Col span={8} >
            <Text>catagory / </Text><Text type="secondary">{obj.catagory}</Text>
          </Col>
          <Col offset={5}>
            <Text type="secondary">10/1/2020</Text>
          </Col>
        </Row>

        <Row justify="center">
          <Col>
            <Title level={5}>{obj.title}</Title>
          </Col>

        </Row>
        <Row justify="center">
          <Card
            style={styles.cardStyle}

          >
            <Meta style={styles.meta} description={obj.bodyText} />

            <Button style={styles.button} onClick={(e) => setBlogData(obj)} size="small" type="link">Read More ...</Button>
          </Card>
        </Row>

      </Col>

    </Row>

}
const mapStateToProps = state => ({
  publicBlogs: state.bloggerData.publicBlogs,
  currentBlog: state.bloggerData.currentBlog,
  authenticated: state.userData.authenticated,
  admin: state.userData.admin,
});
const mapDispatchToProps = { setBlog };
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BlogCard))