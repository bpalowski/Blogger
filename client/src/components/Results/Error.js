import React from 'react'
import { Result } from 'antd';
import Nav from '../Nav/Nav'

const Error = () => {
  return (
    <div>
      <Nav />
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={[]}
      />
    </div>
  )
}

export default Error