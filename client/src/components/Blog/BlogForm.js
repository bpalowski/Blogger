import React, { useState } from 'react'
import Success from '../Results/Success'
import Error505 from '../Results/Error505'
import { connect } from 'react-redux'
import axios from 'axios'
import Nav from '../Nav/Nav'
import BlogSelect from '../Blog/BlogSelect'
import { InboxOutlined, CloseCircleOutlined } from '@ant-design/icons';

import { Row, Col, Form, Input, Button, message, Upload } from 'antd';

const { Dragger } = Upload;



const BlogForm = ({ dataset, location }) => {
  const [form] = Form.useForm();

  const [successSent, updateSuccess] = useState(false)
  const [catagory, updateCatagory] = useState('other')
  const [failSent, updateFail] = useState(false)

  const [imageUrl, updateImageURL] = useState()
  const [imageDisplay, updateImageDisplay] = useState()





  const styles = {
    rowStyle: {
      backgroundColor: "", height: "200vh", width: '100vw', marginTop: "50px"
    },
    col1Style: {
      backgroundColor: "", height: "75vh", width: '200vw', margin: '20px', boxShadow: "0px 1px 5px 0px #676767"
    },
    col2Style: {
      width: '80vw', padding: 20
    },
    h1Style: {
      backgroundColor: "", color: ""
    },
    col3Style: {
      width: '90%', height: "55vh", padding: "3rem 3rem 3rem 3rem", backgroundColor: "white", overflowX: "scroll"
    },
    borderLess: {
      border: 'none'
    },
    inputStyle: {
      width: '', border: 'none', boxShadow: "0px 1px 5px 0px #676767"
    },
    ImageCol: {
    },
    formItemStyle: {

      marginTop: "50px"
    },
    formInputStyle: {
      width: "85vw", border: 'none', boxShadow: "0px 1px 5px 0px #676767", paddingBottom: "100px"
    },
    formButtonStyles: {
      marginTop: 50
    }
  }
  const onFinish = async (data) => {

    const { title, bodyText } = data

    const info = new FormData()
    info.append('file', imageUrl);
    info.append('title', title);
    info.append('catagory', catagory)
    info.append('bodyText', bodyText)
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };


    return axios.post('blog/createblog', info, config)
      .then(responseArr => {
        if (responseArr.data.success_blog === true) {
          form.resetFields()
          updateSuccess(true)
        }
        removeImage()
        form.resetFields()
      }).catch(err => {
        form.resetFields()
        return updateFail(true)
      })
  }

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',

    onChange(info) {


      const { status } = info.file;
      if (status === 'done') {


        updateImageURL(info.file.originFileObj)
        getBase64(info.file.originFileObj, imageUrl => {

          updateImageDisplay(imageUrl)
        })
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    customRequest({ file, onSuccess }) {
      setTimeout(() => {
        onSuccess("ok");
      }, 0);
    },
  };

  const removeImage = () => {
    updateImageDisplay()
    updateImageURL()
  }

  if (failSent) {
    return <Error505 update={updateFail} />
  }
  return successSent ? <Success update={updateSuccess} /> : (
    <div>
      <Nav />
      <Row justify="center" style={styles.rowStyle}>
        <Col style={styles.col1Style}>
          <Row justify="center">


            <Col style={styles.col3Style}>
              <Form

                form={form}
                style={styles.borderLess}
                size="middle"
                layout="vertical"
                onFinish={onFinish}
              >

                <Row justify="center" style={styles.borderLess}>
                  <Col style={styles.ImageCol}>
                    <Form.Item >
                      <Input.Group >
                        {imageDisplay ?
                          <>
                            <Row>
                              <Col>
                                <CloseCircleOutlined style={{ fontSize: "25px", color: "#d11a2a" }} onClick={removeImage} />
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <img src={imageDisplay} alt="avatar" style={{ width: '80%' }} />
                              </Col>
                            </Row>
                          </>
                          : <Dragger accept="image/*" {...props} style={{ padding: "10px", width: "150px" }} >
                            <p className="ant-upload-drag-icon">
                              <InboxOutlined />
                            </p>
                          </Dragger>
                        }

                      </Input.Group>
                    </Form.Item>
                  </Col>
                </Row>

                <Row justify="space-around">
                  <Col>
                    <Form.Item required >
                      <Input.Group >
                        <Form.Item
                          name='title'
                          rules={[{ required: true, message: 'Title is required' }]}
                        >
                          <Input style={styles.inputStyle} placeholder="Input Title" />
                        </Form.Item>
                        <Form.Item
                          name='catagory'
                        >
                          <BlogSelect selected={updateCatagory} />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                </Row>

                <Row justify="center">
                  <Form.Item name='bodyText' style={styles.formItemStyle} rules={[{ required: true, message: 'Blog is required' }]}
                  >
                    <Input.TextArea placeholder="Blog" style={styles.formInputStyle} />
                  </Form.Item>
                </Row>
                <Button size="large" htmlType="submit" style={styles.formButtonStyles} type="primary">Primary Button</Button>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row >
    </div >
  )
}
const mapStateToProps = state => ({
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(BlogForm)