import React from 'react'
// import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';



const Success = ({ update }) => {
  const createBlogs = () => {
    update(false)
  }

  return (
    <Result
      key="1"
      status="success"
      title="Successfully Created a Blog"
      extra={[
        <Button key="#" type="primary" onClick={createBlogs}>Click to Create Blog</Button>
      ]}
    />
  )
}

export default Success