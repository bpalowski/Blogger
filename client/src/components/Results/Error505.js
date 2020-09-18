import React from 'react'
import { Result, Button } from 'antd';
import Nav from '../Nav/Nav'

const Error505 = ({ update }) => {
  const createBlogs = () => {
    update(false)
  }
  return (
    <div>
      <Nav />
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={[
          <Button key="#" type="primary" onClick={createBlogs}>Click to Create Blog</Button>
        ]}
      />
    </div>
  )
}
export default Error505