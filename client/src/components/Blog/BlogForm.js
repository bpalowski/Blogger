import React, { useState } from 'react'
import Success from '../Results/Success'
import Error505 from '../Results/Error505'
import { connect } from 'react-redux'
import axios from 'axios'




import { Row, Col, Form, Input, Button } from 'antd';

const styles = {
  rowStyle: {
    backgroundColor: "white", height: "100vh",
  },
  col1Style: {
    backgroundColor: "#DCDCDC", height: "75vh", width: '50vw', margin: '50px', boxShadow: "0px 1px 5px 0px #676767"
  },
  col2Style: {
    width: '80vw', padding: 20
  },
  h1Style: {
    backgroundColor: "#282828", color: "#D3D3D3"
  },
  col3Style: {
    height: 10, width: '90%', height: "55vh", padding: "3rem 3rem 3rem 3rem", backgroundColor: "white", overflowX: "scroll"
  },
  borderLess: {
    border: 'none'
  },
  inputStyle: {
    width: '20vw', border: 'none', boxShadow: "0px 1px 5px 0px #676767"
  },
  formItemStyle: {
    paddingTop: "20px"
  },
  formInputStyle: {
    width: "35vw", border: 'none', boxShadow: "0px 1px 5px 0px #676767", paddingBottom: "100px"
  },
  formButtonStyles: {
    marginTop: 50
  }
}



const BlogForm = ({ }) => {
  const [form] = Form.useForm();
  const [successSent, updateSuccess] = useState(false)



  const onFinish = values => {
    blogSubmitForm(values)
  };




  const blogSubmitForm = async (data) => {
    const { title, bodyText } = data;
    axios.post('blog/createblog', { title, bodyText })
      .then(responseArr => {
        if (responseArr.data.success_blog === true) {
          form.resetFields()
          updateSuccess(true)
        }
        return
      }).catch(err => {
        console.log(err)
      })


    return <Error505 />


  }


  return successSent ? <Success update={updateSuccess} /> : (
    <Row justify="center" style={styles.rowStyle}>
      <Col style={styles.col1Style}>
        <Row justify="space-around">
          <Col style={styles.col2Style}>
            <h1 className="titleBlog" style={styles.h1Style}>Blog</h1>
          </Col>

          <Col style={styles.col3Style}>
            <Form
              form={form}
              style={styles.borderLess}
              size="middle"
              layout="vertical"
              onFinish={onFinish}>

              <Row justify="center" style={styles.borderLess}>
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
                        <Input style={styles.inputStyle} placeholder="Input Title" />
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



  )
}



const mapStateToProps = state => ({
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(BlogForm)