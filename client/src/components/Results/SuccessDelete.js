import React from 'react'
import { Result } from 'antd';
import Nav from '../Nav/Nav'


const SuccessDelete = () => {


  return (
    <div>
      <Nav />
      <Result
        key="1"
        status="success"
        title="Successfully Deleted Blog"
        extra={[]}
      />
    </div>
  )
}

export default SuccessDelete