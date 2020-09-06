import React from 'react'
import Blog from './Blog'
import { Spin, Card, Row, Button, Col } from 'antd';


const BlogCard = ({ obj, getBlogMethod }) => {
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
  return (
    <div style={styles.cardStyle} >
      <Card >
        <Col key={obj._id}>
          <p>Image</p>
          <h1>{obj.title}</h1>
          <h5>{obj.displayName}</h5>
          <p>discription</p>

        </Col>
        <Button onClick={(e) => getBlogMethod(obj)} size="large" type="primary">Primary Button</Button>
      </Card>
    </div>
  )
}

export default BlogCard