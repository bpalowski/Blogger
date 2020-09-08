import React from 'react'
import Blog from './Blog'
import { Spin, Card, Row, Button, Col } from 'antd';

import { arrayBufferToBase64 } from '../../utils/buffer'
const { Meta } = Card;

const BlogCard = ({ obj, getBlogMethod }) => {
  let img = arrayBufferToBase64(obj.image.data)
  console.log(img)
  const styles = {
    rowStyle: {
      maxHeight: "80vh", overflow: "auto"
    },
    cardStyle: {
      maxHeight: "100%", width: "300px", padding: "50px", margin: "10px", height: "300px"
    },
    spinStyle: {
      margin: "100px", textAlign: "center"
    },
    button: {
      marginTop: "20px"
    },
    meta: {
      backgroundColor: ""
    }
  }

  return (
    <div style={styles.cardStyle} >
      <Card
        style={styles.card}
        key={obj._id}
        cover={<img alt="card-image" src={`data:image/jpeg;base64,${img}`} />}
      >
        <Meta
          style={styles.meta}
          title={obj.title}
          description={obj.bodyText}
        />
        <Button style={styles.button} onClick={(e) => getBlogMethod(obj)} size="large" type="primary">Primary Button</Button>
      </Card>
    </div>
  )
}

export default BlogCard