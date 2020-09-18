import React from 'react'

import { Button, Result } from 'antd';
import Nav from '../Nav/Nav'


const Success = ({ update }) => {
  const createBlogs = () => {
    update(false)
  }

  return (
    <div>
      <Nav />
      <Result
        key="1"
        status="success"
        title="Successfully Created a Blog"
        extra={[
          <Button key="#" type="primary" onClick={createBlogs}>Click to Create Blog</Button>
        ]}
      />
    </div>
  )
}

export default Success