import React from 'react'
import { Typography } from 'antd';
import Nav from '../Nav/Nav';
const { Title } = Typography;
const Error = () => {
  return (
    <div>
      <Nav />
      <div style={{ height: '100vh', backgroundColor: 'white' }}>
        <Title style={{ paddingTop: '150px', color: "#cccccc" }}>Page Not Found</Title>
      </div>
    </div>
  )
}

export default Error