import React, { useState, useEffect } from 'react'
import SuccessEdit from '../Results/SuccessEdit'
import Error505 from '../Results/Error505'
import { connect } from 'react-redux'
import axios from 'axios'
import Nav from '../Nav/Nav'

import { arrayBufferToBase64 } from '../../utils/buffer'
import { InboxOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Row, Col, Form, Input, Button, message, Select, Upload } from 'antd';

const { Option } = Select;
const { Dragger } = Upload;

const BlogEditForm = ({ location }) => {

  const [form] = Form.useForm();
  const [successSent, updateSuccess] = useState(false)
  const [failSent, updateFail] = useState(false)


  const [imageUrl, updateImageURL] = useState()
  const [editImage, updateImageDisplay] = useState()




  const [setRemoveImage, removeImageHandel] = useState(false)
  const { blog } = location

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

  useEffect(() => {
    if (!setRemoveImage) {
      let img = arrayBufferToBase64(blog.image.data)
      updateImageDisplay(img)
      form.setFieldsValue({
        title: blog.title,
        bodyText: blog.bodyText,
        catagory: blog.catagory
      })
    }
  })
  const onFinish = async (data) => {

    const { title, bodyText, catagory } = data

    const editInfo = new FormData()

    editInfo.append('file', imageUrl);
    editInfo.append('img2', blog.image);
    editInfo.append('id', blog._id);
    editInfo.append('title', title);
    editInfo.append('catagory', catagory)
    editInfo.append('bodyText', bodyText)
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    axios.post('blog/editblog', editInfo, config)
      .then(responseArr => {
        if (responseArr.data.success_blog === true) {
          form.resetFields()
          return updateSuccess(true)
        }
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

  const editProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    async onChange(info) {

      const { status } = info.file;
      if (status === 'done') {


        updateImageURL(info.file.originFileObj)
        getBase64(info.file.originFileObj, imageDisplay => {

          updateImageDisplay(imageDisplay)
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
    removeImageHandel(true)
  }


  if (failSent) {
    return <Error505 update={updateFail} />
  }
  return successSent ? <SuccessEdit /> : (
    <>
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
                        {editImage ?
                          <>
                            <Row>
                              <Col>
                                <CloseCircleOutlined style={{ fontSize: "25px", color: "#d11a2a" }} onClick={removeImage} />
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <img style={styles.img} alt="card" src={setRemoveImage ? editImage : `data:image/jpeg;base64,${editImage}`} />
                              </Col>
                            </Row>
                          </> : <Dragger accept="image/*" onPreview {...editProps} style={{ padding: "10px", width: "150px" }} >
                            <p className="ant-upload-drag-icon">
                              <InboxOutlined />
                            </p>
                          </Dragger>}


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
                          <Select
                            name="catagory"
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select a person"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            <Option value="information">Information</Option>
                            <Option value="algorithim">Algorithim</Option>
                            <Option value="technology">Technology</Option>
                            <Option value="entertainment">Entertainment</Option>
                            <Option value="other">Other</Option>
                          </Select>
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="center">
                  <Form.Item name='bodyText' style={styles.formItemStyle} rules={[{ required: true, message: 'Blog is required' }]}
                  >
                    <Input.TextArea maxLength="1000" placeholder="Blog" style={styles.formInputStyle} />
                  </Form.Item>
                </Row>
                <Button size="large" htmlType="submit" style={styles.formButtonStyles} type="primary">Primary Button</Button>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row >
    </>
  )


}
const mapStateToProps = state => ({
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(BlogEditForm)
