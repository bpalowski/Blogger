import React from 'react'

import { Layout, Row, Col, Form, Card, Input, InputNumber, Button, Upload, message } from 'antd';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { Content, Footer } = Layout;
// 
const BlogForm = () => {
  const [form] = Form.useForm();


  const onFinish = values => {
    console.log('Received values of form: ', values);
  };


  return (
    <Card style={{ padding: 10, boxShadow: "0px 1px 5px 0px #676767" }}>
      <Row justify="center" style={{ backgroundColor: "white", height: "100vh", }}>
        <Col style={{ backgroundColor: "#DCDCDC", height: "75vh", width: '70vw', margin: '50px', boxShadow: "0px 1px 5px 0px #676767" }}>
          <Row justify="space-around">
            <Col style={{ width: '80vw', padding: 20 }}>
              <h1 className="titleBlog" style={{ backgroundColor: "#282828", color: "	#D3D3D3" }}>Lets Blog</h1>
            </Col>

            <Col style={{ height: 10, width: '90%', height: "55vh", padding: "3rem 3rem 3rem 3rem", backgroundColor: "white", overflowX: "scroll" }}>
              <Form
                form={form}
                style={{ border: 'none' }}
                size="middle"
                layout="vertical">

                <Row justify="center" style={{ border: 'none' }}>
                  <Col>
                    {/* <Form.Item style={{}}>
                    <Upload
                      style={{}}
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      // showUploadList={false}
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    // beforeUpload={beforeUpload}
                    // onChange={this.handleChange}
                    >
                      upload
                  </Upload>

                  </Form.Item> */}
                    <Form.Item required style={{}}>
                      <Input.Group style={{}}>

                        <Form.Item
                          style={{}}
                          name={['title', 'street']}
                          rules={[{ required: true, message: 'Title is required' }]}
                        >
                          <Input style={{ width: '20vw', border: 'none', boxShadow: "0px 1px 5px 0px #676767" }} placeholder="Input Title" />
                        </Form.Item>


                      </Input.Group>
                    </Form.Item>

                  </Col>
                </Row>

                <Row>
                  <Form.Item style={{ paddingTop: "20px" }}>
                    <Input.TextArea placeholder="Blog" style={{ width: "50vw", border: 'none', boxShadow: "0px 1px 5px 0px #676767", paddingBottom: "100px" }} />
                  </Form.Item>
                </Row>
                <Button size="large" type="primary">Primary Button</Button>

              </Form>
            </Col>


          </Row>
        </Col>
      </Row >
    </Card>
  )
}


export default BlogForm