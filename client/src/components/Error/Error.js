import React from 'react'
import Errors from '../Results/Error'
import { Typography } from 'antd';

const { Title } = Typography;
const Error = () => {
  return (
    <div>

      <div style={{ height: '100vh', backgroundColor: 'white' }}>
        <Title style={{ paddingTop: '150px', color: "#cccccc" }}>Page Not Found</Title>
        <Errors />
      </div>
    </div>
  )
}

export default Error