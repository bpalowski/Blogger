import React, { useState, useEffect } from 'react'
import BlogCard from './BlogCard'
import { setBlog } from '../../state/actions/blogger'
import { connect } from 'react-redux'

import { Col } from 'antd';



const BlogBody = ({ listFilter, publicBlogs }) => {


  const [newList, updateView1] = useState(false)

  useEffect(() => {
    let num = listFilter && listFilter.length;
    if (num === 0) {
      updateView1(false)
    }
    if (num > 0) {
      updateView1(true)
    }
  })

  const styles = {
    rowStyle: {
      maxHeight: "80vh",
      overflow: "auto"
    },
    spinStyle: {
      margin: "100px", textAlign: "center"
    },
    cardStyle: {
    }
  }

  return newList ? <Col style={styles.cardStyle} > {
    listFilter.map(x => (

      <BlogCard key={x._id} obj={x} />

    ))
  }</Col > : <Col style={styles.cardStyle} > {
    publicBlogs.map(x => (

      <BlogCard key={x._id} obj={x} />

    ))
  } </Col >

}

const mapStateToProps = state => ({
  publicBlogs: state.bloggerData.publicBlogs,
  currentBlog: state.bloggerData.currentBlog
});
const mapDispatchToProps = { setBlog };
export default connect(mapStateToProps, mapDispatchToProps)(BlogBody)