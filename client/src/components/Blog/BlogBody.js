import React, { useEffect } from 'react'
import Blog from './Blog'
import { connect } from 'react-redux'
import { Spin, Card, Row, Col } from 'antd';
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

const BlogBody = ({ allBlogs }) => {
  return allBlogs[0] ?
    <Row style={styles.rowStyle} justify="center">{
      allBlogs[0].map(x => (
        <Card style={styles.cardStyle}><Blog key={x._id} obj={x} /></Card>
      ))}
    </Row >
    : <Spin delay={9} size="large" style={styles.spinStyle} />
}

const mapStateToProps = state => ({
  allBlogs: state.bloggerData.allBlogs,
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(BlogBody)