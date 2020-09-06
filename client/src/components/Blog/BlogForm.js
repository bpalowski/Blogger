import React, { useState, useEffect } from 'react'
import Success from '../Results/Success'
import Error505 from '../Results/Error505'
import { connect } from 'react-redux'
import axios from 'axios'
import Nav from '../Nav/Nav'
import BlogSelect from '../Blog/BlogSelect'
import { LoadingOutlined, PlusOutlined, CloudUploadOutlined } from '@ant-design/icons';


import { Row, Col, Form, Input, Button, message, Select, Upload } from 'antd';

const { Option } = Select;


const BlogForm = ({ dataset }) => {
  const [form] = Form.useForm();
  const [successSent, updateSuccess] = useState(false)
  const [catagory, updateCatagory] = useState()
  const [failSent, updateFail] = useState(false)
  const [setError, updateError] = useState(false)
  const [imageUrl, updateImageURL] = useState()
  const [loading, updateLoading] = useState()
  const { getFieldDecorator } = form
  useEffect(() => { })
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

  const onFinish = values => {
    console.log(values)
    blogSubmitForm(values)
  };

  // Images
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const uploadButton = () => {
    return <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  };

  const beforeUpload = (file) => {
    console.log(file)
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }


  const handleChange = async info => {
    if (info.file.status === 'uploading') {
      return await updateLoading(true)
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl =>
        updateImageURL(imageUrl),
        updateLoading(false)
      )
    }
  };
  //

  const blogSubmitForm = async (data) => {
    // const { title, bodyText, } = data;
    const imageUrlToFile = new FormData();
    const image = imageUrl ? imageUrl : ''

    imageUrlToFile.append('file', imageUrl);

    // const selected = !catagory ? "other" : catagory


    await axios.post('blog/createblog', imageUrlToFile)
      .then(responseArr => {
        if (responseArr.data.success_blog === true) {
          form.resetFields()
          updateSuccess(true)
        }
        form.resetFields()
      }).catch(err => {

        return form.resetFields(),
          updateFail(true)
      })



  }

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

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
                onFinish={onFinish}>

                <Row justify="space-around" style={styles.borderLess}>
                  <Col style={styles.ImageCol}>
                    <Form.Item>
                      <Upload
                        accept="image/*"
                        method="POST"
                        style={styles.ImageCol}
                        name="file"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        // beforeUpload={false}
                        // onChange={handleChange}
                        customRequest={dummyRequest}
                      >
                        <Button>
                          <CloudUploadOutlined />
                        </Button>
                        {/* {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton()} */}
                      </Upload >
                    </Form.Item>
                  </Col>
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
                    <Input.TextArea maxLength="1000" placeholder="Blog" style={styles.formInputStyle} />
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