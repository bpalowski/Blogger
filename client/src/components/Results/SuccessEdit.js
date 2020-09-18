import React from 'react'

import { Result } from 'antd';
import Nav from '../Nav/Nav'


const SuccessEdit = () => {


  return (
    <div>
      <Nav />
      <Result
        key="1"
        status="success"
        title="Successfully Edited Blog"
        extra={[
        ]}
      />
    </div>
  )
}

export default SuccessEdit