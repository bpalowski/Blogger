import React from 'react'
import { connect } from 'react-redux'

import { getUserData } from '../../state/actions/auth'
import { publicBloggs } from '../.././state/actions/blogger'

import { Col } from 'antd';



const Blog = ({ obj }) => {

  return <Col key={obj._id}>
    <h1>{obj.title}</h1>
    <h5>{obj.displayName}</h5>
    <p>{obj.bodyText}</p>
  </Col>
}


const mapStateToProps = state => ({
  allBlogs: state.bloggerData.allBlogs,
});
const mapDispatchToProps = { getUserData, publicBloggs };
export default connect(mapStateToProps, mapDispatchToProps)(Blog)