import React, { useState, useEffect } from 'react'
import BlogCard from './BlogCard'
import { connect } from 'react-redux'
import { Spin, Card, Row } from 'antd';

import { Redirect } from 'react-router';

const BlogBody = ({ publicBlogs }) => {
  const [blog, getBlog] = useState()


  const styles = {
    rowStyle: {
      maxHeight: "80vh", overflow: "auto"
    },
    cardStyle: {
      maxHeight: "100%", width: "300px", padding: "50px", margin: "10px", height: "300px"
    },
    spinStyle: {
      margin: "100px", textAlign: "center"
    }
  }

  if (blog) {
    return <Redirect to={{ pathname: `/blog/${blog.title}`, blogObj: blog }} />
  }
  return publicBlogs[0] ?
    <Row style={styles.rowStyle} justify="center">{
      publicBlogs[0].map(x => (

        <BlogCard key={x._id} obj={x} getBlogMethod={getBlog} />

      ))}
    </Row >
    : <Spin delay={9} size="large" style={styles.spinStyle} />
}

const mapStateToProps = state => ({
  publicBlogs: state.bloggerData.publicBlogs,
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(BlogBody)