import React, { useState } from 'react'
import Success from '../Results/Success'
import { connect } from 'react-redux'

import { blogSubmitForm } from '../../state/actions/blogger'



import { Layout, Row, Col, Form, Card, Input, InputNumber, Button, Upload, message, Result } from 'antd';

// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

// const { Content, Footer } = Layout;
// 
const BlogForm = ({ blogSubmitForm }) => {
  const [form] = Form.useForm();
  const [successSent, updateSuccess] = useState(false)
  const [errorSent, updateError] = useState(false)


  const onFinish = values => {

    blogSubmitForm(values)
    form.resetFields()
    updateSuccess(true)
  };




  return successSent ? <Success update={updateSuccess} /> : (



    <Row justify="center" style={{ backgroundColor: "white", height: "100vh", }}>
      <Col style={{ backgroundColor: "#DCDCDC", height: "75vh", width: '50vw', margin: '50px', boxShadow: "0px 1px 5px 0px #676767" }}>
        <Row justify="space-around">
          <Col style={{ width: '80vw', padding: 20 }}>
            <h1 className="titleBlog" style={{ backgroundColor: "#282828", color: "	#D3D3D3" }}>Blog</h1>
          </Col>

          <Col style={{ height: 10, width: '90%', height: "55vh", padding: "3rem 3rem 3rem 3rem", backgroundColor: "white", overflowX: "scroll" }}>
            <Form
              form={form}
              style={{ border: 'none' }}
              size="middle"
              layout="vertical"
              onFinish={onFinish}>

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
                        name='title'
                        rules={[{ required: true, message: 'Title is required' }]}
                      >
                        <Input style={{ width: '20vw', border: 'none', boxShadow: "0px 1px 5px 0px #676767" }} placeholder="Input Title" />
                      </Form.Item>

                    </Input.Group>
                  </Form.Item>

                </Col>
              </Row>

              <Row justify="center">
                <Form.Item name='bodyText' style={{ paddingTop: "20px" }} rules={[{ required: true, message: 'Blog is required' }]}
                >
                  <Input.TextArea maxLength="1000" placeholder="Blog" style={{ width: "35vw", border: 'none', boxShadow: "0px 1px 5px 0px #676767", paddingBottom: "100px" }} />
                </Form.Item>
              </Row>
              <Button size="large" htmlType="submit" style={{ marginTop: 50 }} type="primary">Primary Button</Button>
            </Form>
          </Col>


        </Row>
      </Col>
    </Row >



  )
}



const mapStateToProps = state => ({
});
const mapDispatchToProps = { blogSubmitForm };
export default connect(mapStateToProps, mapDispatchToProps)(BlogForm)